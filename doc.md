# GET routes
* **GET** /

* **GET** /docs

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
	- `notification`: boolean
	- `location`: string
	- `link`: string
	- `datetime`: string
	- `tags`: array<string>

