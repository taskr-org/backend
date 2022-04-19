# GET routes
* **GET** /

* **GET** /docs

* **GET** /task/getall

* **GET** /task/get/:id

# POST routes
* **POST** /user/register
	- `fullname`: fullname (string) 
	- `username`: username (string) 
	- `email`: email (string) 
	- `password`: password (string) 

* **POST** /user/login
	- `username`: username (string) 
	- `password`: password (string) 

* **POST** /user/gauth
	- `token`: token (string) 

* **POST** /task/new
	- `title`: title (string) 
	- `description`: description (string) 
	- `reminder`: boolean
	- `link`: string
	- `priority`: string
	- `datetime`: string
	- `tag`: string

# DELETE routes
* **DELETE** /task/delete
	- `id`: string

