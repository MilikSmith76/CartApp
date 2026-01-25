"""
Base view for resources endpoints.
This view offers List and create endpoint implementations.
"""

from typing import Any

from django.core.cache import cache
from rest_framework import filters
from rest_framework.generics import ListCreateAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK

from utils.constants import DEFAULT_PAGE_SIZE, MIN_ERROR_STATUS_CODE
from utils.enums import EndpointParameters
from utils.functions import get_int_value


class BaseResourcesApiView(ListCreateAPIView):
    """
    Base view for retrieving records of a resource, or creating a resource record.
    """

    DEFAULT_OFFSET = 0

    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    cache_resource: str = None

    def _get_params_string(self, request: Request) -> str:
        """
        Helper method to list(). Generates the query string
        portion of the cache key.

        :param request: The request that the endpoint receives.
        :type request: Request

        :return: The query string portion of the cache key.
        :rtype: str
        """

        params = []

        search = request.query_params.get(EndpointParameters.SEARCH.value, '')

        if search:
            params.append(f'{EndpointParameters.SEARCH.value}={search}')

        offset = get_int_value(
            request.query_params.get(EndpointParameters.OFFSET.value, ''),
            self.DEFAULT_OFFSET,
        )

        if offset is not None:
            params.append(f'{EndpointParameters.OFFSET.value}={offset}')

        limit = get_int_value(
            request.query_params.get(EndpointParameters.LIMIT.value, ''),
            DEFAULT_PAGE_SIZE,
        )

        if limit:
            params.append(f'{EndpointParameters.LIMIT.value}={limit}')

        cart_id = get_int_value(
            request.query_params.get(EndpointParameters.CART_ID.value)
        )

        if cart_id:
            params.append(f'{EndpointParameters.CART_ID.value}={cart_id}')

        return '&'.join(params)

    def list(
        self, request: Request, *args: tuple, **kwargs: dict[str, Any]
    ) -> Response:
        cache_key = f'{self.cache_resource}?{self._get_params_string(request)}'

        cache_hit = cache.get(cache_key)

        if cache_hit:
            return Response(cache_hit, status=HTTP_200_OK)

        response = super().list(request, *args, **kwargs)

        if response.status_code < MIN_ERROR_STATUS_CODE:
            cache.set(cache_key, response.data)

        return response

    def create(
        self, request: Request, *args: tuple, **kwargs: dict[str, Any]
    ) -> Response:
        response = super().create(request, *args, **kwargs)

        if response.status_code < MIN_ERROR_STATUS_CODE:
            cache_key = f'{self.cache_resource}/{response.data.get("id")}'

            cache.clear()

            cache.set(cache_key, response.data)

        return response
