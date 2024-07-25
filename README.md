# To-Do List Application

## Overview

This project is a to-do list application built with a Node.js backend using WebSockets (Socket.io), Redis, and MongoDB, and a React.js frontend with Tailwind CSS for styling. The application allows users to add tasks via WebSockets, stores tasks in Redis, and moves tasks to MongoDB if the cache exceeds 50 items. Tasks can be retrieved through an HTTP API endpoint.

## Features

- **WebSocket Integration**: Add tasks to the list in real-time via WebSockets.
- **Redis Cache**: Store tasks in Redis with a single key. Tasks are moved to MongoDB if there are more than 50 items in the cache.
- **MongoDB Storage**: Persist tasks in MongoDB when the Redis cache exceeds 50 items.
- **HTTP API**: Retrieve all tasks using the `/api/fetchAllTasks` endpoint.
- **Responsive Frontend**: Built with React.js and styled using Tailwind CSS for responsiveness on tablet and mobile screens.

## Frontend

- **React.js**: Frontend framework for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: For making HTTP requests to the backend.
- **Socket.io-client**: To connect to the WebSocket server.

### Deployed Frontend

[Frontend Demo](https://fullstack-task-satan.vercel.app/)

## Backend

- **Node.js**: JavaScript runtime for the backend server.
- **Express**: Web framework for Node.js.
- **Socket.io**: For real-time communication via WebSockets.
- **Redis**: In-memory data structure store used for caching.
- **MongoDB**: NoSQL database used for persistent storage.

### Deployed Backend

- **Server Health Check**: `/health` - Check if the server is running.
- **Fetch All Tasks Endpoint**: `/api/fetchAllTasks` - Retrieve all tasks from Redis or MongoDB.

[Backend API](https://fullstack-task-satan.onrender.com)

## Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    PORT=<your-port || 3000>
    REDIS_PORT=<your-redis-port>
    REDIS_USERNAME=<your-redis-username>
    REDIS_PASSWORD=<your-redis-password>
    REDIS_HOST=<your-redis-host>
    MONGODB_URL=<your-mongodb-url>
    FIRST_NAME=<your-first-name>
    COLLECTION_NAME=<your-collection-name>
    ```

4. **Start the backend server:**

    ```bash
    npm start
    ```

5. **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

6. **Start the frontend development server:**

    ```bash
    npm start
    ```

## Usage

- **Add Task**: Enter a task in the input field and click "Add". The task will be sent to the backend via WebSocket and displayed in the list.
- **View Tasks**: All tasks are displayed in the list, which is updated in real-time as new tasks are added.

## Contributing

Feel free to submit issues and pull requests if you have suggestions for improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

