"""
This module stores constant values that will be used through out the application.
"""

from os import getenv


TRUE_STRING: str = 'true'

APP_DEBUG: bool = getenv('DJANGO_DEBUG', TRUE_STRING).lower() == TRUE_STRING

APP_MANAGED_TABLES: bool = (
    getenv('DJANGO_MANAGED_TABLES', TRUE_STRING).lower() == TRUE_STRING
)

DEFAULT_CACHE_LIFE_TIME_SECONDS: int = 300

DEFAULT_PAGE_SIZE: int = 10

DEFAULT_TIMEOUT: int = 60

DJANGO_ALLOWED_HOST: str = getenv('DJANGO_ALLOWED_HOST', '*')

MIN_ERROR_STATUS_CODE = 400
