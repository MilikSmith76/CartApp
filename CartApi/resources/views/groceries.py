"""
Groceries View.
"""

from rest_framework import filters, status
from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response

from resources.models import Grocery
from resources.serializers import GrocerySerializer


class GroceriesView(ListAPIView):
    """
    View for retrieving a list of groceries, or creating a new one.
    """

    queryset = Grocery.objects.filter(deleted=False)  # pylint: disable=no-member
    serializer_class = GrocerySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

    def post(self, request: Request) -> Response:
        """
        Creates a new Grocery record.

        :param request:
            The incoming request for this endpoint.
            Should contain a body representing a Grocery record.
        :type request: Request

        :return: The created Grocery record.
        :rtype: Response
        """
        serializer = GrocerySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
