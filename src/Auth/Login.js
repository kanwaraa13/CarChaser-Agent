import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
export const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNameError, setuserNameError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogIn = async (event) => {
    event.preventDefault();
    if (userName.trim() === "") {
      setuserNameError("User Name cannot be empty.");
    } else {
      setuserNameError("");
    }

    if (userPassword.trim() === "") {
      setpasswordError("Please fill up the password.");
    } else {
      setpasswordError("");
    }

    try {
      const response = await api.post("/auth/agent/login", {
        email: userName,
        password: userPassword,
      });
      // Retrieve the agent ID from the response
      const agentId = response.data.AgentID;
      // Store the agent ID in session storage
      sessionStorage.setItem("agentId", agentId);

      // Navigate to the AgentCarInspection page
      navigate("/agent-car-inspection");
    } catch (error) {
      console.error("Error occurred during login:", error);
      // Check if the error is due to incorrect credentials
      if (error.response && error.response.status === 422) {
        setErrors({ login: "Wrong credentials. Please try again." });
      } else {
        // For other errors, you can display a generic error message
        setErrors({ generic: "An error occurred. Please try again later." });
      }
    }
  };

  return (
    <section class="admin-login">
      <div class="container">
        <div class="adminform-inner">
          <div class="login-logo">
            <a href="#">
              <img src="../images/logo.png" alt="logo-img" />
            </a>
          </div>
          <div class="login-form mt-5">
            <h3> Agent Login</h3>
            <p>Welcome to Car Chaser</p>
            <form onSubmit={handleLogIn}>
              <div class="form-group mt-5">
                <input
                  type="text"
                  className="form-control"
                  id="admin-username"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                {userNameError && (
                  <div className="text-danger">{userNameError}</div>
                )}
              </div>
              <div class="form-group mt-2">
                <input
                  type="password"
                  className="form-control"
                  id="admin-password"
                  placeholder="Password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                {passwordError && (
                  <div className="text-danger">{passwordError}</div>
                )}
              </div>
              {errors.login && (
                <div className="text-danger my-3 bold">{errors.login}</div>
              )}
              {errors.generic && (
                <div className="text-danger">{errors.generic}</div>
              )}
              <button type="submit" className="btn btn-primary w-100 py-3">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
