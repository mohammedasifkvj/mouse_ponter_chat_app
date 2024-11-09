# Real-Time Cursor and User Broadcasting with Socket.IO

This project demonstrates a real-time application using Node.js, Express, and Socket.IO, allowing multiple users to view each other's cursor movements and see broadcasted text inputs across all active sessions. This setup is ideal for applications like collaborative tools or interactive dashboards.

## Features

- **Real-Time Cursor Sharing**: Displays each user's cursor position in real-time to all other users.
- **User Text Broadcast**: Broadcasts text entered by a user to all other users, excluding the sender.
- **Dynamic User Interface**: Generates a unique colored cursor for each user, allowing for easy identification.

## Prerequisites

- Node.js installed
- Basic understanding of JavaScript, Node.js, and Socket.IO

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mohammedasifkvj/mouse_ponter_chat_app.git
cd mouse_ponter_chat_app
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies using:

```bash
npm install
```

### 3. Run the Server

To start the server, run:

```bash
node app.js
```

The server will start on `http://127.0.0.1:5001` by default, or on a port specified by the `PORT` environment variable.

### 4. Access the Application

Open a browser and go to [http://127.0.0.1:5001](http://127.0.0.1:5001). Open this URL in multiple tabs or different browsers to test the real-time functionality.

## Code Structure

### `app.js`

- Sets up an Express server with Socket.IO for handling real-time events.
- Listens for connections and broadcasts:
  - **new-user**: Broadcasts new users' usernames and IDs.
  - **mousemove**: Broadcasts real-time cursor positions to all users except the sender.

### `index.html`

- Basic HTML interface with an input field and "Add User" button.
- Client-side JavaScript for:
  - Emitting **new-user** events with the entered username.
  - Emitting **mousemove** events with cursor coordinates.
  - Listening for **new-user** and **mousemove** events to dynamically update the UI.

### `public` Folder

- This is where you can add any additional client-side files (e.g., `styles.css`, images) if you want to expand the app further.

## How It Works

1. **User Connection**: Each new user connection emits a `new-user` event with their name. The server then broadcasts this to all other users, dynamically adding a new entry in the "container" div.
  
2. **Cursor Position Sharing**: Each time a user moves their mouse, the coordinates are emitted as a `mousemove` event, which the server broadcasts to all other users. Each user sees all connected users’ cursors move in real-time.

## Sample Code Snippets

### Emitting Cursor Movements

```javascript
document.addEventListener("mousemove", (event) => {
    socket.emit("mousemove", { x: event.clientX, y: event.clientY });
});
```

### Receiving and Displaying Cursors

```javascript
socket.on("mousemove", (data) => {
    if (!userList[data.id]) {
        // Create a new cursor div for each user
    }
    userList[data.id].style.left = data.coordinates.x + "px";
    userList[data.id].style.top = data.coordinates.y + "px";
});
```