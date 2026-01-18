"""
Cart Grocery View.
"""

import datetime

from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from resources.models import CartGrocery
from resources.serializers import CartGrocerySerializer


class CartGroceryView(RetrieveUpdateAPIView):
    """
    View for getting individual cart groceries, updating a cart grocery,
    and deleting a cart grocery.
    """

    queryset = CartGrocery.objects.all()  # pylint: disable=no-member
    serializer_class = CartGrocerySerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'cart_grocery_id'

    def delete(self, _request: Request, cart_grocery_id: int) -> Response:
        """
        Deletes a Cart Grocery record.

        :param cart_grocery_id: The id of the Cart Grocery record to delete.
        :type cart_grocery_id: int

        :return: A response indicating that deleting the record was successful.
        :rtype: Response
        """

        cart = CartGrocery.active_objects.get_record(cart_grocery_id)

        cart.deleted = True
        cart.deleted_at = datetime.date.today()
        cart.save()

        success_message = {'success': True}
        return Response(success_message, status=status.HTTP_200_OK)
