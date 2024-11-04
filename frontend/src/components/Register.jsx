import { Cancel, Room } from "@mui/icons-material";
import axios from "axios";
import { useRef, useState } from "react";
import "./register.css";

export default function Register({ setShowRegister }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleInputChange = () => {
    if (error) {
      setError(false); // Clear the error when user interacts with the inputs
    }
    if (success) {
      setSuccess(false); // Clear success message on new input
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room className="logoIcon" />
        <span>MapIt</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          ref={usernameRef}
          onChange={handleInputChange} // Clear error on input change
          autoFocus
        />
        
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          ref={emailRef}
          onChange={handleInputChange} // Clear error on input change
        />
        
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          minLength="6"
          placeholder="Enter your password"
          ref={passwordRef}
          onChange={handleInputChange} // Clear error on input change
        />
        
        <button className="registerBtn" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
        
        {success && (
          <span className="success">Successfully registered. You can login now!</span>
        )}
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="registerCancel" onClick={() => setShowRegister(false)} />
    </div>
  );
}
