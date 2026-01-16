"""
Serializer for the Grocery model.
"""

from models import Grocery  # pylint: disable=import-error
from rest_framework import serializers


class GrocerySerializer(serializers.ModelSerializer):
    """
    Class for the Grocery serializer.
    """

    class Meta:
        """
        Meta information for the GrocerySerializer class.
        """

        model = Grocery
        fields = [
            'id',
            'name',
            'description',
            'image_url',
            'price',
            'purchased',
        ]
