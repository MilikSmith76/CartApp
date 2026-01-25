"""
Grocery View.
"""

from resources.models import Grocery
from resources.serializers import GrocerySerializer
from resources.views.base_resource_api_view import BaseResourceApiView
from utils import CacheResources, EndpointParameters


class GroceryView(BaseResourceApiView):
    """
    View for getting individual groceries, updating a grocery item,
    and deleting a grocery item.
    """

    queryset = Grocery.objects.all()
    serializer_class = GrocerySerializer
    cache_resource = CacheResources.GROCERY.value
    model = Grocery
    lookup_url_kwarg = EndpointParameters.GROCERY_ID.value
