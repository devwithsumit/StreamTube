# API Documentation

This document provides a comprehensive overview of the RESTful API endpoints available for authentication and video management in the StreamTube application.

---

## Table of Contents

1. [Base URL](#base-url)
2. [Authentication](#2-authentication)
    - [Registration (Sign Up)](#21-registration-sign-up)
    - [Login (Sign In)](#22-login-sign-in)
    - [Logout (Sign Out)](#23-logout-sign-out)
3. [Videos](#3-videos)
    - [Upload Video](#31-upload-video)
    - [Get All Videos (Paginated)](#32-get-all-videos-paginated)
    - [Get Video by ID](#33-get-video-by-id)
    - [Get User Videos](#34-get-user-videos)
4. [Comments](#4-comments)
    - [Add Comment to a Video](#41-add-comment-to-a-video)
    - [Get All Comments for a Video](#42-get-all-comments-for-a-video)
    - [Delete a Comment](#43-delete-a-comment)

---

## Base URL

- **Development:** `http://localhost:3000`
- **Production:** `<your-vercel-deployed-domain>`

All endpoints below are relative to the base URL.

---

## 2. Authentication

### 2.1. Registration (Sign Up)

- **Endpoint:** `POST /api/auth/signup`
- **Description:** Register a new user account.
- **Request Body:**

  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
  
- **Validation:**
  - `firstName`: min 3 characters
  - `lastName`: required
  - `username`: required, min 3 characters
  - `email`: valid email
  - `password`: min 6 characters
- **Response:**
  - `201 Created` on success
  - JSON with user info and JWT token

  ```json
  {
    "message": "User created successfully",
    "token": "<jwt_token>",
    "user": {
      "id": "<user_id>",
      "firstName": "John",
      "lastName": "Doe",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
  ```

- **Errors:**
  - `400 Bad Request` (validation errors, user exists)
  - `500 Internal Server Error`

---

### 2.2. Login (Sign In)

- **Endpoint:** `POST /api/auth/signin`
- **Description:** Authenticate a user and receive a JWT token.
- **Request Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```

- **Validation:**
  - `email`: valid email
  - `password`: min 6 characters
- **Response:**
  - `200 OK` on success
  - JSON with user info and JWT token

  ```json
  {
    "message": "Signin successful",
    "token": "<jwt_token>",
    "user": {
      "id": "<user_id>",
      "username": "johndoe",
      "email": "john@example.com"
    }
  }
  ```

- **Errors:**
  - `400 Bad Request` (invalid credentials)
  - `404 Not Found` (user not found)
  - `500 Internal Server Error`

---

### 2.3. Logout (Sign Out)

- **Endpoint:** `GET /api/auth/signout`
- **Description:** Log out the authenticated user (requires authentication).
- **Headers:**
  - `Authorization: Bearer <jwt_token>` (or cookie if using httpOnly cookies)
- **Response:**
  - `200 OK` on success
  - JSON message

  ```json
  {
    "message": "Signout successful"
  }
  ```

- **Errors:**
  - `401 Unauthorized` (missing/invalid token)
  - `403 Forbidden` (invalid token)

---

### Authentication Notes

- All authentication endpoints are prefixed with `/api/auth`.
- JWT tokens are returned on successful registration and login.
- Protect private routes using the provided token in the `Authorization` header or as a cookie.

## 3. Videos

### 3.1. Upload Video

- **Endpoint:** `POST /api/videos/upload`
- **Description:** Upload a new video (protected route, requires authentication).
- **Headers:**
  - `Authorization: Bearer <jwt_token>` (or cookie if using httpOnly cookies)
- **Request Body:**

  ```json
  {
    "title": "My Video Title",
    "description": "Video description...",
    "videoUrl": "https://example.com/video.mp4",
    "thumbnailUrl": "https://example.com/thumbnail.jpg",
    "tags": ["tag1", "tag2"],
    "videoType": "All"
  }
  ```

- **Response:**
  - `201 Created` on success
  - JSON with video info

  ```json
  {
    "message": "Video uploaded successfully",
    "video": {
      "_id": "<video_id>",
      "title": "My Video Title",
      "description": "Video description...",
      "videoUrl": "https://example.com/video.mp4",
      "thumbnailUrl": "https://example.com/thumbnail.jpg",
      "tags": ["tag1", "tag2"],
      "videoType": "All",
      "user": "<user_id>",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```

- **Errors:**
  - `401 Unauthorized` (missing/invalid token)
  - `500 Internal Server Error`

---

### 3.2. Get All Videos (Paginated)

- **Endpoint:** `GET /api/videos`
- **Description:** Fetch a paginated list of all videos.
- **Query Parameters:**
  - `page` (optional, default: 1) — Page number
  - `limit` (optional, default: 12) — Number of videos per page
- **Response:**
  - `200 OK` on success
  - JSON with videos and pagination info

  ```json
  {
    "videos": [
      { /* video object */ },
      ...
    ],
    "page": 1,
    "totalPages": 10,
    "totalVideos": 120
  }
  ```

- **Errors:**
  - `500 Internal Server Error`

---

### 3.3. Get Video by ID

- **Endpoint:** `GET /api/videos/:id`
- **Description:** Fetch a single video by its ID.
- **Response:**
  - `200 OK` on success
  - JSON with video object
  - `404 Not Found` if video does not exist
- **Errors:**
  - `500 Internal Server Error`

---

### 3.4. Get User Videos

- **Endpoint:** `GET /api/videos/user/:userId`
- **Description:** Fetch all videos uploaded by a specific user.
- **Response:**
  - `200 OK` on success
  - JSON array of video objects
- **Errors:**
  - `500 Internal Server Error`

---

## Notes for Video Api

- All video endpoints are prefixed with `/api/videos`.
- Use pagination for efficient video fetching.
- Protected routes require a valid JWT token.
- See authentication section for login and token usage.

## 4. Comments

### 4.1. Add Comment to a Video

- **Endpoint:** `POST /api/comments/:videoId`
- **Description:** Add a comment to a specific video (protected route, requires authentication).
- **Headers:**
  - `Authorization: Bearer <jwt_token>` (or cookie if using httpOnly cookies)
- **Request Body:**

  ```json
  {
    "text": "This is a comment."
  }
  ```

- **Response:**
  - `201 Created` on success
  - JSON with the created comment (user field populated with `username`, `avatar`, `channelName`, `firstName`, `lastName`)

  ```json
  {
    "message": "Comment added",
    "comment": {
      "_id": "<comment_id>",
      "text": "This is a comment.",
      "video": "<video_id>",
      "user": {
        "_id": "<user_id>",
        "username": "johndoe",
        "avatar": "...",
        "channelName": "John's Channel",
        "firstName": "John",
        "lastName": "Doe"
      },
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```

- **Errors:**
  - `401 Unauthorized` (missing/invalid token)
  - `500 Internal Server Error`

---

### 4.2. Get All Comments for a Video

- **Endpoint:** `GET /api/comments/all/:videoId`
- **Description:** Fetch all comments for a specific video.
- **Response:**
  - `200 OK` on success
  - JSON array of comment objects (user field populated with `username`, `avatar`, `firstName`, `lastName`)

  ```json
  [
    {
      "_id": "<comment_id>",
      "text": "This is a comment.",
      "video": "<video_id>",
      "user": {
        "_id": "<user_id>",
        "username": "johndoe",
        "avatar": "...",
        "firstName": "John",
        "lastName": "Doe"
      },
      "createdAt": "...",
      "updatedAt": "..."
    },
    // ...more comments
  ]
  ```

- **Errors:**
  - `500 Internal Server Error`

---

### 4.3. Delete a Comment

- **Endpoint:** `DELETE /api/comments/:commentId`
- **Description:** Delete a comment by its ID (protected route, only the comment owner can delete).
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Response:**
  - `200 OK` on success
  - JSON message

  ```json
  {
    "message": "Comment deleted"
  }
  ```

- **Errors:**
  - `401 Unauthorized` (missing/invalid token)
  - `403 Forbidden` (not the comment owner)
  - `404 Not Found` (comment not found)
  - `500 Internal Server Error`

---

### Comments API Notes

- All comment endpoints are prefixed with `/api/comments`.
- Adding and deleting comments require authentication.
- The user field in responses is populated with only necessary properties for privacy and efficiency.