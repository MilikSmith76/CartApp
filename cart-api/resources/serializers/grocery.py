"""
Serializer for the Grocery model.
"""

from rest_framework.serializers import ModelSerializer

from resources.models import Grocery


class GrocerySerializer(ModelSerializer):
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
