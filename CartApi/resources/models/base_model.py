"""
Abstract base model for resource models.
"""

from django.db import models

from utils.constants import APP_MANAGED_TABLES


class BaseModel(models.Model):
    """
    Class for the base model.
    """

    deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(default=None, blank=True, null=True)

    class Meta:
        """
        Meta information for the BaseModel class.
        """

        abstract = True
        ordering = ['id', 'created_at']
        managed = APP_MANAGED_TABLES
