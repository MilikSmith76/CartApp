"""
Carts View.
"""

from rest_framework import filters
from rest_framework.generics import ListCreateAPIView

from resources.models import Cart
from resources.serializers import CartSerializer


class CartsView(ListCreateAPIView):
    """
    View for retrieving a list of carts, or creating a new one.
    """

    queryset = Cart.objects.filter(deleted=False)  # pylint: disable=no-member
    serializer_class = CartSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
