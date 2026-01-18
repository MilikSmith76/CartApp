"""
Model for the Grocery table.
"""

from django.db.models import BooleanField, CharField, DecimalField

from .base_model import BaseModel


class Grocery(BaseModel):
    """
    Class for the Grocery model.
    """

    name = CharField(max_length=200, unique=True)
    description = CharField(max_length=200, default='')
    image_url = CharField(max_length=200)
    price = DecimalField(max_digits=9, decimal_places=2)
    purchased = BooleanField(default=False)

    class Meta(BaseModel.Meta):
        """
        Meta information for the Grocery class.
        """

        db_table = 'grocery'
