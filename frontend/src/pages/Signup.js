import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import "../styles/form.css";
import "../styles/global.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, name, surname);
  };

  return (
    <form className="signup form-container fade-in" onSubmit={handleSubmit}>
      <div className="form-box form-height-signin">
        <label>Enter your email</label>
        <input
          className="form-input"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Eneter your password</label>
        <input
          className="form-input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={[password]}
        />
        <label>Enter your name</label>
        <input
          className="form-input"
          type="name"
          onChange={(e) => setName(e.target.value)}
          value={[name]}
        />
        <label>Enter your surname</label>
        <input
          className="form-input"
          type="surname"
          onChange={(e) => setSurname(e.target.value)}
          value={[surname]}
        />

        <button className="form-spec-button" disabled={isLoading}>
          Sign up
        </button>
        {error && (
          <div className="error error-font">
            {error === "Password not strong enough"
              ? "Password must contain 1 symbol, 1 capital letter, be at least 10 characters long"
              : error}
          </div>
        )}
      </div>
    </form>
  );
};

export default Signup;
