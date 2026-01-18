"""
Cart Groceries View.
"""

from rest_framework import status
from rest_framework.generics import ListCreateAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from resources.models import CartGrocery
from resources.serializers import CartGrocerySerializer


class CartGroceriesView(ListCreateAPIView):
    """
    View for retrieving a list of cart groceries, creating a new one,
    and bulk upserting cart groceries.
    """

    serializer_class = CartGrocerySerializer

    def get_queryset(self):
        """
        The query set for retrieving lists of cart groceries.
        """
        queryset = CartGrocery.active_objects.filter(purchased=False)
        cart_id = self.request.query_params.get('cart_id')

        if cart_id is not None:
            queryset = queryset.filter(cart_id=cart_id)

        return queryset

    def put(self, request: Request) -> Response:
        """
        Bulk upserts Cart Grocery records.

        :param request:
            The incoming request for this endpoint.
            Should contain a body with an "items" attribute.
            The "items" attribute should be an array of Cart Grocery items.
        :type request: Request

        :return: The array of upserted Cart Grocery records.
        :rtype: Response
        """
        items = request.data.get('items', None)

        if not items:
            error = {
                'message': 'The request is missing an "items" attribute in the body.'
            }

            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        bulk_validation = CartGrocerySerializer(data=items, many=True)

        if not bulk_validation.is_valid():
            return Response(bulk_validation.errors, status=status.HTTP_400_BAD_REQUEST)

        response_items = []

        for item in items:
            cart_grocery_id = item.get('id', None)

            serializer = None

            if cart_grocery_id is None:
                serializer = CartGrocerySerializer(data=item)

            if cart_grocery_id is not None:
                cart_grocery = CartGrocery.objects.get_record(cart_grocery_id)
                serializer = CartGrocerySerializer(cart_grocery, data=item)

            serializer.is_valid()
            serializer.save()
            response_items.append(serializer.data)

        response = {'items': response_items}
        return Response(response, status=status.HTTP_200_OK)
