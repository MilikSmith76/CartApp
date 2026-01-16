"""
Serializer for the CartGrocery model.
"""

from rest_framework import serializers

from resources.models import CartGrocery

from .cart import CartSerializer
from .grocery import GrocerySerializer


class CartGrocerySerializer(serializers.ModelSerializer):
    """
    Class for the CartGrocery serializer.
    """

    cart = CartSerializer(read_only=True)
    grocery = GrocerySerializer(read_only=True)

    class Meta:
        """
        Meta information for the CartGrocerySerializer class.
        """

        model = CartGrocery
        fields = [
            'id',
            'quantity',
            'purchased',
            'purchased_at',
            'cart',
            'grocery',
        ]
