"""
Base Model Manager for active Model records.
"""

from .base_model_manager import BaseModelManager


class ActiveBaseModelManager(BaseModelManager):
    """
    The base Model Manager for active records.
    """

    def get_queryset(self):
        """
        The query set for retrieving active Model records.
        """

        return super().get_queryset().filter(deleted=False)
