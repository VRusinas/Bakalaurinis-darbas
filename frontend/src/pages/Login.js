import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import "../styles/form.css";
import "../styles/global.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className="login form-container fade-in" onSubmit={handleSubmit}>
      <div className="form-box form-height-login">
      <label>Enter your email</label>
      <input
      className="form-input"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Enter your password</label>
      <input
       className="form-input"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={[password]}
      />

      <button className="form-spec-button" disabled={isLoading}>Login</button>
      {error && <div className="error error-font"> {error}</div>}
      </div>
    </form>
  );
};
export default Login;
