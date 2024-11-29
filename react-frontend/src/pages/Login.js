import React, {useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
 const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

    useEffect(() => {
        setToken(null);
       localStorage.setItem("jwtToken",null);
    }, [navigate]);
   /* useEffect(() => {

        if(token!=='null')
        {
            navigate("/Home");
        }


    }, [navigate]);  // The empty array ensures it runs only once
*/

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/login", {
        username,
        password,
      });
       setToken(response.data.token);
       localStorage.setItem("jwtToken", response.data.token);
       setMessage("Login successful!");
       navigate("/Home");


    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed!");
    }
  };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter your email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="text-center mt-3">
                    <p>
                        Don't have an account? <a href="/signup" className="text-decoration-none">Sign Up</a>
                    </p>
                </div>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default LoginPage;