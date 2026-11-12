import { useState } from "react";
import StatusMessage from "../StatusMessage/StatusMessage";
import "./LoginForm.css";

export default function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handle(e) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await onSubmit(username.trim(), password);
    } catch (err) {
      setError(err.status === 401 ? "Wrong username or password." : err.message);
      setBusy(false);
    }
  }

  return (
    <form className="login-form" onSubmit={handle}>
      <h1>Helper login</h1>
      <p className="login-form__hint">Helpers add and update bus routes. Ask an admin if you need an account.</p>
      <div className="field">
        <label htmlFor="username">Username</label>
        <input id="username" type="text" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <StatusMessage kind="error">{error}</StatusMessage>}
      <button className="btn btn--primary login-form__submit" disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>
    </form>
  );
}
