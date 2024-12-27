# API Documentation

This README provides information on how to use the **Register**, **Login**, and **Subscription** endpoints for the application. Each endpoint is described in detail, including the HTTP method, request URL, headers, and expected request/response format.

---

## **1. Register Endpoint**

### **Description**

This endpoint allows a new user to register by providing a username and password.

### **HTTP Request**

- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/register`

### **Headers**

- `Content-Type`: `application/json`

### **Request Body**

```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

### **Response**

- **Status**: `201 Created`
- **Body**:

```
User registered
```

### **Error Responses**

- **Status**: `500 Internal Server Error`
  - Occurs if there is an issue saving the user to the database.

---

## **2. Login Endpoint**

### **Description**

This endpoint allows an existing user to log in by providing valid credentials. Upon successful login, it returns a JWT token.

### **HTTP Request**

- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/login`

### **Headers**

- `Content-Type`: `application/json`

### **Request Body**

```json
{
  "username": "testuser",
  "password": "testpassword"
}
```

### **Response**

- **Status**: `200 OK`
- **Body**:

```json
{
  "token": "your_jwt_token_here"
}
```

### **Error Responses**

- **Status**: `401 Unauthorized`
  - Occurs if the username or password is incorrect.
- **Status**: `500 Internal Server Error`
  - Occurs if there is an issue with the login process.

### **Notes**

- Save the returned JWT token to use it for protected endpoints.

---

## **3. Subscription Endpoint**

### **Description**

This endpoint allows a user to subscribe to a channel by specifying the user and channel IDs.

### **HTTP Request**

- **Method**: `POST`
- **URL**: `http://localhost:3000/api/subscriptions`

### **Headers**

- `Content-Type`: `application/json`
- `Authorization`: `Bearer <your_jwt_token>`

### **Request Body**

```json
{
  "userId": "64e5f4a4e10f0f0e4c7b39f4",
  "channelId": "64e5f4b1e10f0f0e4c7b39f5"
}
```

### **Response**

- **Status**: `201 Created`
- **Body**:

```
Subscribed successfully
```

### **Error Responses**

- **Status**: `400 Bad Request`
  - Occurs if the user is already subscribed to the channel.
- **Status**: `500 Internal Server Error`
  - Occurs if there is an issue saving the subscription to the database.

### **Notes**

- Replace `userId` and `channelId` with actual IDs from the database.

---

## **General Notes**

1. Ensure the backend server is running on `http://localhost:3000`.
2. Use a tool like Postman to test these endpoints.
3. For protected endpoints (e.g., Subscription), include the `Authorization` header with a valid JWT token.
