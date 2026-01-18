"""
URL configuration for resources project.
"""

from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from resources.views import (
    CartGroceriesView,
    CartGroceryView,
    CartsView,
    CartView,
    GroceriesView,
    GroceryView,
)


urlpatterns = [
    path('carts', CartsView.as_view()),
    path('carts/<int:cart_id>', CartView.as_view()),
    path('groceries', GroceriesView.as_view()),
    path('groceries/<int:grocery_id>', GroceryView.as_view()),
    path('cart_groceries', CartGroceriesView.as_view()),
    path('cart_groceries/<int:cart_grocery_id>', CartGroceryView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
