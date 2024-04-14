import React, { useState } from "react";
import "./Signup.css";
import { addUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [signup, setSignup] = useState(false);
  const [count, setCount] = useState(1);
  const [err, setErr] = useState(null);
  const [emailerr, setEmailerr] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "ysn@gmail.com",
    password: "123",
    address: "acc",
    phone: "93939",
  });
  const handleclick = () => {
    if (count == 1) {
      setCount(2);
    } else {
      setCount(1);
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handlesignup = async () => {
    try {
      const req = await fetch("http://localhost:3001/customers", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res = await req.json();

      if (req.status == 400) {
        setEmailerr(res.msg);
        console.log(res);
        setCount(1);
      } else if (req.status == 200) {
        dispatch(addUser(res.user));
        navigate("/");
      } else if (req.status == 500) {
        setEmailerr("all fields are required");
        setCount(1);
        console.log(res.err);
      }
    } catch (e) {
      setErr(e);
      console.log(e);
    }
  };
  const handleLogin = async () => {
    const { email, password } = user;
    console.log(email, password);
    try {
      const req = await fetch("http://localhost:3001/customers/verify", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      handledispatch(req);
    } catch (e) {
      console.log(e);
    }
  };
  const handledispatch = async (req) => {
    const res = await req.json();
    console.log(res);
    setErr(res);
    dispatch(addUser(res.user));
    navigate("/");
  };
  console.log(err);
  return (
    <div className="signup">
      <div className="signup-login-container">
        {!signup ? (
          <div className="signup-container">
            Sign up
            {count === 1 && (
              <div className="signup-1">
                <div className="signup-inpt">
                  <h4 className="label">Name</h4>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => handlechange(e)}
                  />
                </div>
                <div className="signup-inpt">
                  <h4 className="label">Email</h4>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={(e) => handlechange(e)}
                  />
                  {emailerr && <p className="email-err">{emailerr}</p>}
                </div>

                <div className="signup-inpt">
                  <h4 className="label">Password</h4>
                  <input
                    type="text"
                    name="password"
                    value={user.password}
                    onChange={(e) => handlechange(e)}
                  />
                </div>
              </div>
            )}
            {count === 2 && (
              <div className="signup-1">
                <div className="signup-inpt">
                  <h4 className="label">Address</h4>
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={(e) => handlechange(e)}
                  />
                </div>
                <div className="signup-inpt">
                  <h4 className="label">Phone</h4>
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={(e) => handlechange(e)}
                  />
                </div>
              </div>
            )}
            <button className="signup-btn" onClick={handleclick}>{`${
              count === 1 ? "Next" : "Back"
            }`}</button>
            {count === 2 && (
              <button onClick={handlesignup} className="submit">
                Sign up
              </button>
            )}
            <p className="turn-to-login">
              Already have an account{" "}
              <span className="login-span" onClick={() => setSignup(!signup)}>
                {" "}
                login
              </span>{" "}
            </p>
          </div>
        ) : (
          <div className="login-container">
            <h3>Login</h3>
            <div className="signup-inpt">
              <h4 className="label">Email</h4>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={(e) => handlechange(e)}
              />
            </div>{" "}
            <div className="signup-inpt">
              <h4 className="label">Password</h4>
              <input
                type="text"
                name="password"
                value={user.password}
                onChange={(e) => handlechange(e)}
              />
            </div>
            {err != null && <p className="err">{err?.msg}</p>}
            <button onClick={handleLogin} className="login-btn">
              {" "}
              Login
            </button>
            <p className="turn-to-login">
              Don't have an account{" "}
              <span className="login-span" onClick={() => setSignup(!signup)}>
                sign up
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
