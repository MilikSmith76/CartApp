"""
Cart Grocery View.
"""

from resources.models import CartGrocery
from resources.serializers import CartGrocerySerializer
from resources.views.base_resource_api_view import BaseResourceApiView
from utils.enums import CacheResources, EndpointParameters


class CartGroceryView(BaseResourceApiView):
    """
    View for getting individual cart groceries, updating a cart grocery,
    and deleting a cart grocery.
    """

    queryset = CartGrocery.objects.all()
    serializer_class = CartGrocerySerializer
    cache_resource = CacheResources.CART_GROCERY.value
    model = CartGrocery
    lookup_url_kwarg = EndpointParameters.CART_GROCERY_ID.value
