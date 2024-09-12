# FormComp Component

## Overview

`FormComp` is a React component designed for user authentication. It includes a form that captures the user's email and password, validates the inputs, and sends the data to the `/api/auth` endpoint for authentication. This component integrates with Zod for form validation and provides user feedback through toast notifications.

## Features

- Form validation using Zod.
- User feedback via toast notifications.
- Loading spinner during the authentication process.

## API Endpoint

### POST `/api/auth`

This endpoint is used for user authentication. It accepts a POST request with the following request body:

#### Request Body

```json
{
  "email": "string",
  "password": "string"
}
