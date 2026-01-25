"""
Carts View.
"""

from resources.models import Cart
from resources.serializers import CartSerializer
from resources.views.base_resources_api_view import BaseResourcesApiView
from utils.enums import CacheResources


class CartsView(BaseResourcesApiView):
    """
    View for retrieving a list of carts, or creating a new one.
    """

    queryset = Cart.active_objects.all()
    serializer_class = CartSerializer
    cache_resource = CacheResources.CART.value
