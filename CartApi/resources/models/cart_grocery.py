"""
Model for the Cart Grocery table.
"""

from django.db import models

from .base_model import BaseModel
from .cart import Cart
from .grocery import Grocery


class CartGrocery(BaseModel):
    """
    Class for the Cart Grocery model.
    """

    quantity = models.IntegerField()
    purchased = models.BooleanField(default=False)
    purchased_at = models.DateTimeField(default=None, blank=True, null=True)

    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, db_column='cart_id')
    grocery = models.ForeignKey(
        Grocery, on_delete=models.CASCADE, db_column='grocery_id'
    )

    class Meta(BaseModel.Meta):
        """
        Meta information for the Cart Grocery class.
        """

        db_table = 'cart_grocery'
