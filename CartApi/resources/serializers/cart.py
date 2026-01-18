"""
Serializer for the Cart model.
"""

from rest_framework.serializers import ModelSerializer

from resources.models import Cart


class CartSerializer(ModelSerializer):
    """
    Class for the Cart serializer.
    """

    class Meta:
        """
        Meta information for the CartSerializer class.
        """

        model = Cart
        fields = [
            'id',
            'name',
            'description',
        ]
