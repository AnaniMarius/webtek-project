import React, { useState } from 'react';
import "./LoginPage.css";

export function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const { token } = await response.json();
      localStorage.setItem('token', token);
      onLogin(username);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}
// This code will create a new component called LoginPage that you can import and use in other parts of your application. This component will handle the authentication process, it sends a post request to the /api/login endpoint with the payload of the username and the password, it would handle the response of the server and it will handle the error if the login failed.
// It uses the fetch API to send a login request to the server.
// It also saves the token returned by the server in the browser's local storage, so that it can be used for authenticating subsequent requests.

// It's important to note that this is just an example, this would need to be adjusted to match the specific requirements and design choices of your application, such as the actual endpoint, the payload, and the format of the response.
// Also, it's important to use a library or a framework for handling the authentication such as JWT, OAuth, etc.
// Please make sure to use HTTPS to secure the communication between the client and the server.