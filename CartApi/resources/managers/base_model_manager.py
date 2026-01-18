"""
Base Model Manager for resources models.
"""

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Manager, Model
from django.http import Http404


class BaseModelManager(Manager):
    """
    The base Model Manager for the resources app.
    """

    def get_record(self, id_value: int) -> Model:
        """
        Gets the Model record with the given id value.

        :param id_value: The id whose record should be retrieved.
        :type id_value: int

        :return: The retrieved Model record.
        :rtype: Model

        :raises Http404: If id record does not exist.
        """

        try:
            return self.get(pk=id_value)
        except ObjectDoesNotExist:
            raise Http404  # pylint: disable=raise-missing-from
