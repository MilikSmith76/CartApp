"""
Cart View.
"""

import datetime

from django.http import Http404
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from resources.models import Cart
from resources.serializers import CartSerializer


class CartView(APIView):
    """
    View for getting individual carts, updating a cart,
    and deleting a cart.
    """

    def get_cart(self, cart_id: int) -> Cart:
        """
        A helper method for getting a Cart record by id.

        :param id: The id of the Cart record to retrieve.
        :type id: int

        :return: The retrieved Cart record.
        :rtype: Cart
        """
        try:
            return Cart.objects.get(pk=cart_id)  # pylint: disable=no-member
        except Cart.DoesNotExist:  # pylint: disable=no-member
            raise Http404  # pylint: disable=raise-missing-from

    def get(self, _request: Request, cart_id: int) -> Response:
        """
        Retrieves an individual Cart record.

        :param cart_id: The id of the Cart record to retrieve.
        :type cart_id: int

        :return: The retrieved Cart record.
        :rtype: Response
        """
        cart = self.get_cart(cart_id)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def put(self, request: Request, cart_id: int) -> Response:
        """
        Updates a Cart record.

        :param request:
            The incoming request for this endpoint.
            Should contain a body representing a Cart record.
        :type request: Request
        :param cart_id: The id of the Cart record to update.
        :type cart_id: int

        :return: The updated Cart record.
        :rtype: Response
        """
        cart = self.get_cart(cart_id)
        serializer = CartSerializer(cart, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, _request: Request, cart_id: int) -> Response:
        """
        Deletes a Cart record.

        :param cart_id: The id of the Cart record to delete.
        :type cart_id: int

        :return: A response indicating that deleting the record was successful.
        :rtype: Response
        """
        cart = self.get_cart(cart_id)

        cart.deleted = True
        cart.deleted_at = datetime.date.today()
        cart.save()

        success_message = {'success': True}
        return Response(success_message, status=status.HTTP_200_OK)
