"""
Serializer for the Cart model.
"""

from models import Cart  # pylint: disable=import-error
from rest_framework import serializers

from .grocery import GrocerySerializer


class CartSerializer(serializers.ModelSerializer):
    """
    Class for the Cart serializer.
    """

    groceries = GrocerySerializer(read_only=True, many=True)

    class Meta:
        """
        Meta information for the CartSerializer class.
        """

        model = Cart
        fields = [
            'id',
            'name',
            'description',
            'groceries',
        ]
