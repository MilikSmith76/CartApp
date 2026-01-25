"""
Groceries View.
"""

from resources.models import Grocery
from resources.serializers import GrocerySerializer
from resources.views.base_resources_api_view import BaseResourcesApiView
from utils import CacheResources


class GroceriesView(BaseResourcesApiView):
    """
    View for retrieving a list of groceries, or creating a new one.
    """

    queryset = Grocery.active_objects.all()
    serializer_class = GrocerySerializer
    cache_resource = CacheResources.GROCERY.value
