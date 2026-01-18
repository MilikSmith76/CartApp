"""
Grocery View.
"""

import datetime

from django.http import Http404
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

    def get_grocery(self, grocery_id: int) -> Grocery:
        """
        A helper method for getting a Grocery record by id.

        :param grocery_id: The id of the Grocery record to retrieve.
        :type grocery_id: int

        :return: The retrieved Grocery record.
        :rtype: Grocery
        """
        try:
            return Grocery.objects.get(pk=grocery_id)  # pylint: disable=no-member
        except Grocery.DoesNotExist:  # pylint: disable=no-member
            raise Http404  # pylint: disable=raise-missing-from

    def delete(self, _request: Request, grocery_id: int) -> Response:
        """
        Deletes a Grocery record.

        :param grocery_id: The id of the Grocery record to delete.
        :type grocery_id: int

        :return: A response indicating that deleting the record was successful.
        :rtype: Response
        """
        grocery = self.get_grocery(grocery_id)

        grocery.deleted = True
        grocery.deleted_at = datetime.date.today()
        grocery.save()

        success_message = {'success': True}
        return Response(success_message, status=status.HTTP_200_OK)
