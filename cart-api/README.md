# Cart API

This Django application is a Restful API that manages resources for a Cart application. The resources that this application manages are stored within a SQL database.

## URL

When this application is live it can be seen [here](http://localhost:8000/).

### Supported endpoints:

* [/api/carts](http://localhost:8000/api/carts)

* [/api/groceries](http://localhost:8000/api/groceries)

* [/api/cart_groceries](http://localhost:8000/api/cart_groceries)

## How to run

* Run `pip install -r requirements.txt` to install the required dependencies.

* Run `python manage.py makemigrations resources` to make the migrations.

* Run `python manage.py migrate resources` to apply the migrations.

* Run `python manage.py runserver` to start running the application.

** (Note): ** For a more production like run, use `gunicorn --bind 0.0.0.0:8000 api.wsgi:application` to launch the app.

** (Note): ** This application was tested using Python version `3.13.5`.

## Environment Variables

* `DJANGO_DEBUG`: Determines if the application should be running with debug features enabled. Defaults to `true`.

* `DJANGO_MANAGED_TABLES`: Determines if the application will manage migrations for the model tables. Defaults to `true`.

* `DJANGO_ALLOWED_HOST`: The url host that is able to make requests to this application. Defaults to allowing all hosts (`'*'`).

## How to lint and format

This application supports linting and code formating by using Ruff.

### How to lint

* Run `ruff check`.

### How to automatically fix lint errors

* Run `ruff check --fix`.

### How to format code

* Run `ruff format`.
