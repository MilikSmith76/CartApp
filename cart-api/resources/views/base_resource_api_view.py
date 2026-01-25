"""
Base view for resource endpoints. This view offers retieve, update,
and delete endpoint implementations.
"""

from datetime import date
from typing import Any

from django.core.cache import cache
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from resources.models.base_model import BaseModel
from utils import MIN_ERROR_STATUS_CODE


class BaseResourceApiView(RetrieveUpdateAPIView):
    """
    Base view for retrieving an individual resource record,
    updating a resource record, and deleting a resource record.
    """

    cache_resource: str = None
    model: BaseModel = None
    lookup_field = 'id'
    lookup_url_kwarg: str = None

    def _get_cach_key(self, resource_id: int) -> str:
        """
        A general purpose helper function for the class.
        Generates the key used for caching results.

        :param resource_id: The id of the resource record to delete.
        :type resource_id: int

        :return: The cache key.
        :rtype: str
        """

        return f'{self.cache_resource}/{resource_id}'

    def retrieve(self, request, *args: tuple, **kwargs: dict[str, Any]) -> Response:
        cache_key = self._get_cach_key(kwargs[self.lookup_url_kwarg])

        cache_hit = cache.get(cache_key)

        if cache_hit:
            return Response(cache_hit, status=HTTP_200_OK)

        response = super().retrieve(request, *args, **kwargs)

        if response.status_code < MIN_ERROR_STATUS_CODE:
            cache.set(cache_key, response.data)

        return response

    def update(
        self, request: Request, *args: tuple, **kwargs: dict[str, Any]
    ) -> Response:
        response = super().update(request, *args, **kwargs)

        if response.status_code < MIN_ERROR_STATUS_CODE:
            cache_key = self._get_cach_key(kwargs[self.lookup_url_kwarg])

            cache.clear()

            cache.set(cache_key, response.data)

        return response

    def delete(self, _request: Request, resource_id: int) -> Response:
        """
        Deletes a resource record.

        :param resource_id: The id of the resource record to delete.
        :type resource_id: int

        :return: A response indicating that deleting the record was successful.
        :rtype: Response
        """

        resource = self.model.active_objects.get_record(resource_id)

        resource.deleted = True
        resource.deleted_at = date.today()

        if hasattr(resource, 'name'):
            resource.name = f'{resource.name} (Deleted At {resource.deleted_at})'

        resource.save()

        cache.clear()

        success_message = {'success': True}

        return Response(success_message, status=HTTP_200_OK)
