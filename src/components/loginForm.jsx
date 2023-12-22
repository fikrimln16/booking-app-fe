import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [nimError, setNimError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setNimError(false);
    setPasswordError(false);
  
    if (!nim.trim()) {
      setNimError(true);
      return;
    }
  
    if (!password.trim()) {
      setPasswordError(true);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nim, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.userType === "user") {
          localStorage.setItem("userType", data.userType);
  
          navigate(`/request-room`);
          setResponseMessage(data.message);
        } else {
          navigate(`/admin-request-room`);
        }
      } else {
        console.error("Error during login");
        alert("Password salah!")
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-danger text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-100 mb-5">
                    Please enter your nim and password!
                  </p>

                  <div className="mb-4">
                    <label
                      className="form-label text-white"
                      htmlFor="typeNimX"
                    >
                      NIM/NIP
                    </label>
                    <div className="form-outline form-white">
                      <input
                        type="text"
                        id="typeNimX"
                        className={`form-control form-control-lg ${
                          nimError ? "is-invalid" : ""
                        }`}
                        placeholder="Enter your NIM/NIP"
                        value={nim}
                        onChange={(e) => {
                          setNim(e.target.value);
                          setNimError(false); 
                        }}
                        required
                      />
                      {nimError && (
                        <div className="invalid-feedback">
                          NIM/NIP is required.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <label
                      className="form-label text-white"
                      htmlFor="typePasswordX"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="typePasswordX"
                      className={`form-control form-control-lg ${
                        passwordError ? "is-invalid" : ""
                      }`}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError(false); 
                      }}
                      required
                    />
                    {passwordError && (
                      <div className="invalid-feedback">
                        Password is required.
                      </div>
                    )}
                  </div>

                  <button
                    className="btn btn-dark btn-lg px-5"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
