"""
Serializer for the CartGrocery model.
"""

from rest_framework import serializers

from resources.models import Cart, CartGrocery, Grocery

from .cart import CartSerializer
from .grocery import GrocerySerializer


class CartGrocerySerializer(serializers.ModelSerializer):
    """
    Class for the CartGrocery serializer.
    """

    id = serializers.IntegerField(read_only=False, required=False)

    cart = CartSerializer(read_only=True)

    cart_id = serializers.PrimaryKeyRelatedField(
        queryset=Cart.objects.filter(deleted=False),  # pylint: disable=no-member
        source='cart',
        write_only=True,
    )

    grocery = GrocerySerializer(read_only=True)

    grocery_id = serializers.PrimaryKeyRelatedField(
        queryset=Grocery.objects.filter(deleted=False),  # pylint: disable=no-member
        source='grocery',
        write_only=True,
    )

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
            'cart_id',
            'grocery_id',
        ]

    def validate_id(self, value: int) -> int:
        """
        Validation method for the id value.

        :param value: The id value to be validated.
        :type value: int

        :return: the id if it is valid.
        :rtype: int

        :raises ValidationError: If present id does not exist.
        """
        if not id:
            return

        try:
            CartGrocery.objects.get(pk=value)  # pylint: disable=no-member
            return value
        except CartGrocery.DoesNotExist:  # pylint: disable=no-member
            raise serializers.ValidationError(  # pylint: disable=raise-missing-from
                f'Invalid pk "{value}" - object does not exist.'
            )
