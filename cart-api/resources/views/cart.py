"""
Cart View.
"""

from resources.models import Cart
from resources.serializers import CartSerializer
from resources.views.base_resource_api_view import BaseResourceApiView
from utils.enums import CacheResources, EndpointParameters


class CartView(BaseResourceApiView):
    """
    View for getting individual carts, updating a cart,
    and deleting a cart.
    """

    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    cache_resource = CacheResources.CART.value
    model = Cart
    lookup_url_kwarg = EndpointParameters.CART_ID.value
