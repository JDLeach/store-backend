# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: 'products' [GET]
- Show: 'products/:id' [GET]  
- Create: [token required]: 'products' [POST] (is this supposed to be an endpoint for adding products to an order or just creating a product? unclear.)
- [OPTIONAL] Top 5 most popular products 'products/popular' [GET]
- [OPTIONAL] Products by category (args: product category) 'products/category/:args' [GET] 

#### Users
- Index [token required] 'users' [GET]
- Show [token required] 'users/:id' [GET]
- Create [token required] 'users' [POST]

#### Orders
- Show Current Orders by user (args: user id)[token required] 'orders/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] 'orders/completed/:id' [GET] 
- Add: add a product to an order[token required] 'orders/:id/products' [POST]
- Create [token required] 'orders' [POST]
- showProduct - Show products from an order 'orders/:id/products' [GET]

## Data Shapes
#### Product
Table: Products
-  id: number
- name: varchar
- price: number
- [OPTIONAL] category: varchar

#### User
Table: 
- id: varchar
- username: varchar(100)
- firstName: varchar(100)
- lastName: varchar(100)
- password_digest: varchar

#### Orders
- id: varchar
- id of each product in the order: references order_products table
- quantity of each product in the order: integer
- user_id: varchar
- status of order (active or complete): varchar

