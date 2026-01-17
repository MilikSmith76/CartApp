"""
Carts View.
"""

from rest_framework import filters, status
from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from resources.models import Cart
from resources.serializers import CartSerializer


class CartsView(ListAPIView):
    """
    View for retrieving a list of carts, or creating a new one.
    """

    queryset = Cart.objects.filter(deleted=False)  # pylint: disable=no-member
    serializer_class = CartSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def post(self, request: Request):
        """
        Creates a new Cart record.

        :param request:
            The incoming request for this endpoint.
            Should contain a body representing a Cart item.
        :type request: Request

        :return: The created Cart record.
        :rtype: Response
        """
        serializer = CartSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
