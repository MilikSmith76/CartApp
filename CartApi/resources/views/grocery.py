"""
Grocery View.
"""

from datetime import date

from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from resources.models import Grocery
from resources.serializers import GrocerySerializer


class GroceryView(RetrieveUpdateAPIView):
    """
    View for getting individual groceries, updating a grocery item,
    and deleting a grocery item.
    """

    queryset = Grocery.objects.all()  # pylint: disable=no-member
    serializer_class = GrocerySerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'grocery_id'

    def delete(self, _request: Request, grocery_id: int) -> Response:
        """
        Deletes a Grocery record.

        :param grocery_id: The id of the Grocery record to delete.
        :type grocery_id: int

        :return: A response indicating that deleting the record was successful.
        :rtype: Response
        """

        grocery = Grocery.active_objects.get_record(grocery_id)

        grocery.deleted = True
        grocery.deleted_at = date.today()
        grocery.save()

        success_message = {'success': True}
        return Response(success_message, status=status.HTTP_200_OK)
