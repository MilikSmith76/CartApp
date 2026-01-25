"""
This module stores general purpose functions that can be reused.
"""


def get_int_value(value: str, default_value: int | None = None) -> int | None:
    """
    Get the int representation of a string value.
    If the value is not an integer, returns None or the provided default value.

    :param value: The string value to transform into an integer.
    :type value: str

    :param value: The string value to transform into an integer.
    :type value: int | None

    :return:
        The integer repersentation of the provided value,
        the provided default value, or None.
    :rtype: int | None
    """

    if not value:
        return default_value

    try:
        return int(value)
    except ValueError:
        return default_value
