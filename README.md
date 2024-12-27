1. Register Endpoint

Description

This endpoint allows a new user to register by providing a username and password.

HTTP Request

Method: POST

URL: http://localhost:3000/api/auth/register

Headers

Content-Type: application/json

Request Body

{
"username": "testuser",
"password": "testpassword"
}

Response

Status: 201 Created

Body:

User registered

Error Responses

Status: 500 Internal Server Error

Occurs if there is an issue saving the user to the database.

2. Login Endpoint

Description

This endpoint allows an existing user to log in by providing valid credentials. Upon successful login, it returns a JWT token.

HTTP Request

Method: POST

URL: http://localhost:3000/api/auth/login

Headers

Content-Type: application/json

Request Body

{
"username": "testuser",
"password": "testpassword"
}

Response

Status: 200 OK

Body:

{
"token": "your_jwt_token_here"
}

Error Responses

Status: 401 Unauthorized

Occurs if the username or password is incorrect.

Status: 500 Internal Server Error

Occurs if there is an issue with the login process.

Notes

Save the returned JWT token to use it for protected endpoints.

3. Subscription Endpoint

Description

This endpoint allows a user to subscribe to a channel by specifying the user and channel IDs.

HTTP Request

Method: POST

URL: http://localhost:3000/api/subscriptions

Headers

Content-Type: application/json

Authorization: Bearer <your_jwt_token>

Request Body

{
"userId": "64e5f4a4e10f0f0e4c7b39f4",
"channelId": "64e5f4b1e10f0f0e4c7b39f5"
}

Response

Status: 201 Created

Body:

Subscribed successfully

Error Responses

Status: 400 Bad Request

Occurs if the user is already subscribed to the channel.

Status: 500 Internal Server Error

Occurs if there is an issue saving the subscription to the database.

Notes

Replace userId and channelId with actual IDs from the database.
