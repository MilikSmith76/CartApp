"""
Carts View.
"""

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from resources.models import Cart
from resources.serializers import CartSerializer


class CartsView(APIView):
    """
    View for retrieving a list of carts, or creating a new one.
    """

    def get(self, _request: Request):
        """
        Retrieves a list of Cart records.

        :return: A list of Cart records.
        :rtype: Response
        """
        groceries = Cart.objects.all()  # pylint: disable=no-member
        serializer = CartSerializer(groceries, many=True)
        return Response(serializer.data)

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
