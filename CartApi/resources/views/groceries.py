"""
Groceries View.
"""

from rest_framework import filters
from rest_framework.generics import ListCreateAPIView

from resources.models import Grocery
from resources.serializers import GrocerySerializer


class GroceriesView(ListCreateAPIView):
    """
    View for retrieving a list of groceries, or creating a new one.
    """

    queryset = Grocery.objects.filter(deleted=False)  # pylint: disable=no-member
    serializer_class = GrocerySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
