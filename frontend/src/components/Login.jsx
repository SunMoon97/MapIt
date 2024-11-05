import { Cancel, Room } from "@mui/icons-material";
import axios from "axios";
import { useRef, useState } from "react";
import "./login.css";

export default function Login({ setShowLogin, setCurrentUsername, myStorage }) {
  const [error, setError] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false); // State for loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const api_url = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${api_url}/api/users/login`, user);
      setCurrentUsername(res.data.username);
      myStorage.setItem('user', res.data.username);
      setShowLogin(false);
      setError(false); // Clear any previous errors
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
  };

  return (
    <div className="loginContainer">
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
        
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          minLength="6"
          placeholder="Enter your password"
          ref={passwordRef}
          onChange={handleInputChange} // Clear error on input change
        />
        
        <button className="loginBtn" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        
        {error && <span className="failure">Incorrect username or password!</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
