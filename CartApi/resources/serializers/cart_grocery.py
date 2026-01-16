"""
Serializer for the CartGrocery model.
"""

from models import CartGrocery  # pylint: disable=import-error
from rest_framework import serializers

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
