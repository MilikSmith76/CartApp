"""
Cart Grocery View.
"""

import datetime

from django.http import Http404
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from resources.models import CartGrocery
from resources.serializers import CartGrocerySerializer


class CartGroceryView(APIView):
    """
    View for getting individual cart groceries, updating a cart grocery,
    and deleting a cart grocery.
    """

    def get_cart_grocery(self, cart_grocery_id: int) -> CartGrocery:
        """
        A helper method for getting a Cart Grocery record by id.

        :param cart_grocery_id: The id of the Cart Grocery record to retrieve.
        :type cart_grocery_id: int

        :return: The retrieved Cart Grocery record.
        :rtype: CartGrocery

        :raises Http404: If id record does not exist.
        """
        try:
            return CartGrocery.objects.get(pk=cart_grocery_id)  # pylint: disable=no-member
        except CartGrocery.DoesNotExist:  # pylint: disable=no-member
            raise Http404  # pylint: disable=raise-missing-from

    def get(self, _request: Request, cart_grocery_id: int) -> Response:
        """
        Retrieves an individual Cart Grocery record.

        :param cart_grocery_id: The id of the Cart Grocery record to retrieve.
        :type cart_grocery_id: int

        :return: The retrieved Cart Grocery record.
        :rtype: Response
        """
        cart = self.get_cart_grocery(cart_grocery_id)
        serializer = CartGrocerySerializer(cart)
        return Response(serializer.data)

    def put(self, request: Request, cart_grocery_id: int) -> Response:
        """
        Updates a Cart Grocery record.

        :param request:
            The incoming request for this endpoint.
            Should contain a body representing a Cart Grocery record.
        :type request: Request
        :param cart_grocery_id: The id of the Cart Grocery record to update.
        :type cart_grocery_id: int

        :return: The updated Cart Grocery record.
        :rtype: Response
        """
        cart = self.get_cart_grocery(cart_grocery_id)
        serializer = CartGrocerySerializer(cart, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, _request: Request, cart_grocery_id: int) -> Response:
        """
        Deletes a Cart Grocery record.

        :param cart_grocery_id: The id of the Cart Grocery record to delete.
        :type cart_grocery_id: int

        :return: A response indicating that deleting the record was successful.
        :rtype: Response
        """
        cart = self.get_cart_grocery(cart_grocery_id)

        cart.deleted = True
        cart.deleted_at = datetime.date.today()
        cart.save()

        success_message = {'success': True}
        return Response(success_message, status=status.HTTP_200_OK)
