# Todo List Application

This is a simple Todo List application where users can:

- Add, delete, and mark todos as complete.
- The application supports two roles:
  - **Admin**: Can view and manage all todos.
  - **Normal User**: Can only view and manage their own todos.

This repository contains two main folders: `client` and `server`.

## Folder Structure

- **client**: Built using Next.js for the frontend.
- **server**: Built using Nest.js for the backend.

## Getting Started

After cloning the repository, follow these steps to set up the project:

### Install Dependencies

1. Navigate to the `server` folder and install dependencies:

```bash
cd server
npm install
```

2. Navigate to the `client` folder and install dependencies:

```bash
cd client
npm install
```

### Running the Application

- **Client**: Run the Next.js application by navigating to the `client` folder and executing:

```bash
npm run dev
```

- **Server**: Run the Nest.js application by navigating to the `server` folder and executing:

```bash
npm run start
```

## Notes

Ensure you have Node.js installed on your system before proceeding.
Don't forget to provide env variable for seeding admin user and other stuff like Database and Jwt

### Environment Variables

The `server` directory includes a sample `.sample.env` file to help you understand the required environment variables. Before running the server, create a `.private.env` file in the `server` directory and populate it with the necessary values. These variables typically include:

- **Database Configuration**: Connection string or credentials for your database.
- **JWT Secret**: A secret key for signing JSON Web Tokens.
- **Admin Credentials**: Default admin email and password for seeding.

Refer to the `.sample.env` file for guidance on the format and required fields.
