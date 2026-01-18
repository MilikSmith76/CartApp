"""
Cart View.
"""

import datetime

from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from resources.models import Cart
from resources.serializers import CartSerializer


class CartView(RetrieveUpdateAPIView):
    """
    View for getting individual carts, updating a cart,
    and deleting a cart.
    """

    queryset = Cart.objects.all()  # pylint: disable=no-member
    serializer_class = CartSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'cart_id'

    def delete(self, _request: Request, cart_id: int) -> Response:
        """
        Deletes a Cart record.

        :param cart_id: The id of the Cart record to delete.
        :type cart_id: int

        :return: A response indicating that deleting the record was successful.
        :rtype: Response
        """
        cart = Cart.active_objects.get_record(cart_id)

        cart.deleted = True
        cart.deleted_at = datetime.date.today()
        cart.save()

        success_message = {'success': True}
        return Response(success_message, status=status.HTTP_200_OK)
