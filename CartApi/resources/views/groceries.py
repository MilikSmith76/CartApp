"""
Groceries View.
"""

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from resources.models import Grocery
from resources.serializers import GrocerySerializer


class GroceriesView(APIView):
    """
    View for retrieving a list of groceries, or creating a new one.
    """

    def get(self, _request: Request) -> Response:
        """
        Retrieves a list of Grocery records.

        :return: A list of Grocery records.
        :rtype: Response
        """
        groceries = Grocery.objects.all()  # pylint: disable=no-member
        serializer = GrocerySerializer(groceries, many=True)
        return Response(serializer.data)

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
