"""
Abstract base model for resource models.
"""

from django.db.models import BooleanField, DateTimeField, Model

from resources.managers import ActiveBaseModelManager, BaseModelManager
from utils.constants import APP_MANAGED_TABLES


class BaseModel(Model):
    """
    Class for the base model.
    """

    objects = BaseModelManager()
    active_objects = ActiveBaseModelManager()

    deleted = BooleanField(default=False)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    deleted_at = DateTimeField(default=None, blank=True, null=True)

    class Meta:
        """
        Meta information for the BaseModel class.
        """

        abstract = True
        ordering = ['id', 'created_at']
        managed = APP_MANAGED_TABLES
