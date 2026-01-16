"""
Model for the Grocery table.
"""

from django.db import models

from .base_model import BaseModel


class Grocery(BaseModel):
    """
    Class for the Grocery model.
    """

    name = models.CharField(max_length=200, unique=True)
    description = models.CharField(max_length=200, default='')
    image_url = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=2, decimal_places=2)
    purchased = models.BooleanField(default=False)

    class Meta(BaseModel.Meta):
        """
        Meta information for the Grocery class.
        """

        db_table = 'grocery'
