"""
Model for the Cart table.
"""

from django.db.models import CharField, ManyToManyField

from .base_model import BaseModel
from .grocery import Grocery


class Cart(BaseModel):
    """
    Class for the Cart model.
    """

    name = CharField(max_length=200, unique=True)
    description = CharField(max_length=200, default='')

    groceries = ManyToManyField(
        Grocery, through='CartGrocery', through_fields=('cart', 'grocery')
    )

    class Meta(BaseModel.Meta):
        """
        Meta information for the Cart class.
        """

        db_table = 'cart'
