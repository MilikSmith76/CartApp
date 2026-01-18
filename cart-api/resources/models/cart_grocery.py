"""
Model for the Cart Grocery table.
"""

from django.db.models import (
    CASCADE,
    BooleanField,
    DateTimeField,
    ForeignKey,
    IntegerField,
)

from .base_model import BaseModel
from .cart import Cart
from .grocery import Grocery


class CartGrocery(BaseModel):
    """
    Class for the Cart Grocery model.
    """

    quantity = IntegerField()
    purchased = BooleanField(default=False)
    purchased_at = DateTimeField(default=None, blank=True, null=True)

    cart = ForeignKey(Cart, on_delete=CASCADE, db_column='cart_id')
    grocery = ForeignKey(Grocery, on_delete=CASCADE, db_column='grocery_id')

    class Meta(BaseModel.Meta):
        """
        Meta information for the Cart Grocery class.
        """

        db_table = 'cart_grocery'
