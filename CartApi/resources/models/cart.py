"""
Model for the Cart table.
"""

from django.db import models

from .base_model import BaseModel
from .grocery import Grocery


class Cart(BaseModel):
    """
    Class for the Cart model.
    """

    name = models.CharField(max_length=200, unique=True)
    description = models.CharField(max_length=200, default='')

    grocery = models.ManyToManyField(
        Grocery, through='CartGrocery', through_fields=('cart', 'grocery')
    )

    class Meta(BaseModel.Meta):
        """
        Meta information for the Cart class.
        """

        db_table = 'cart'
