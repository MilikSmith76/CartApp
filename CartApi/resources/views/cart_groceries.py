"""
Cart Groceries View.
"""

from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from resources.models import CartGrocery
from resources.serializers import CartGrocerySerializer


class CartGroceriesView(ListAPIView):
    """
    View for retrieving a list of cart groceries, creating a new one,
    and bulk upserting cart groceries.
    """

    serializer_class = CartGrocerySerializer

    def get_queryset(self):
        """
        The query set for retrieving lists of cart groceries.
        """
        queryset = CartGrocery.objects.filter(deleted=False, purchased=False)  # pylint: disable=no-member
        cart_id = self.request.query_params.get('cart_id')

        if cart_id is not None:
            queryset = queryset.filter(cart_id=cart_id)

        return queryset

    def post(self, request: Request) -> Response:
        """
        Creates a new Cart Grocery record.

        :param request:
            The incoming request for this endpoint.
            Should contain a body representing a Cart Grocery item.
        :type request: Request

        :return: The created Cart Grocery record.
        :rtype: Response
        """
        serializer = CartGrocerySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        bulk_serializer = CartGrocerySerializer(data=request.data['items'], many=True)

        if not bulk_serializer.is_valid():
            return Response(bulk_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        response_items = []

        for item in request.data['items']:
            cart_grocery_id = item.get('id', None)

            serializer = None

            if cart_grocery_id is None:
                serializer = CartGrocerySerializer(data=item)
            else:
                cart_grocery = CartGrocery.objects.get(pk=cart_grocery_id)  # pylint: disable=no-member
                serializer = CartGrocerySerializer(cart_grocery, data=item)

            serializer.is_valid()
            serializer.save()
            response_items.append(serializer.data)

        response = {'items': response_items}
        return Response(response, status=status.HTTP_200_OK)
