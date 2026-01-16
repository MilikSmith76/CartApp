"""
Serializer for the Grocery model.
"""

from rest_framework import serializers

from resources.models import Grocery


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
