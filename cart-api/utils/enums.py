"""
This module stores general purpose classes that can be reused.
"""

from enum import StrEnum, auto


class EndpointParameters(StrEnum):
    """
    Enum class for used positional and query params.
    """

    CART_ID = auto()
    GROCERY_ID = auto()
    CART_GROCERY_ID = auto()
    LIMIT = auto()
    OFFSET = auto()
    SEARCH = auto()


class CacheResources(StrEnum):
    """
    Enum class for cache resource names.
    """

    CART = auto()
    CART_GROCERY = auto()
    GROCERY = auto()
