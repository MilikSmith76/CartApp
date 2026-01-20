# Cart Application

This Repo represents an application for Managing Carts between one group of users. Users of this application can add and remove Grocery items from Carts. Users Can also retrieve, create, update, and delete Groceries and Carts.

## Structure:

This application is split between a Restful backend API and a Responsive frontend UI.

* [Frontend UI](cart-ui/README.md)

* [Backend API](cart-api/README.md)

## Docker Environment:

While both the frontend and backend applications can be run locally (as explained in there READMEs), it's propably easier to use the docker compose environment.

### How To Run (Docker Compose)

* Run `docker compose up -d` to start the containers.

* Run `docker compose down` to stop the containers.

## Resource Models

This application utilizes 3 models for its concept.

### Models

* `Cart`: This model represents a shopping cart.
    * `name`: Name of the cart.
    * `description`: Description for the cart.
* `Grocery`: This model represents a grocery item.
    * `name`: Name of the grocery.
    * `description`: Description for the grocery.
    * `image_url`: The URL link for the image of the grocery item. For development I would suggest using URLs from `https://picsum.photos/[image size]`.
    * `price`: The price for the grocery item.
    * `purchased`: Whether or not the grocery item has been purchased or not.
* `CartGrocery`: This model represents the relationship between a Cart and a Grocery. Basically means that the associated Cart has the associated Grocery inside it.
    * `quantity`: The amount of a grocery item inside the cart.
    * `purchased`: Whether or not these grocery items inside the cart have been purchased yet. 

### Base Model Attributes

In addition to the above attributes, all models share these attributes.

* `deleted`: If the model record has been deleted.
* `deleted_at`: The date and time that the model record was deleted.
* `created_at`: The date and time that the model record was created.
* `updated_at`: The date and time that the model record was last updated.
