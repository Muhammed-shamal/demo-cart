import React, { useContext, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseContext } from "../store/AuthContext";
export default function Login() {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMail, setError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const { firebase } = useContext(FirebaseContext);
  const navigation = useNavigate();

  const handleSignUp = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation("/");
      });
  };

  const handleLogin = () => {
    if (!email && !password) {
      //document.getElementById("emailError").hidden = false;
      //document.getElementById("passwordError").hidden = false;
      setError(true);
      setErrorPassword(true);
    } else if (!email) {
      setError(true);
      setErrorPassword(false);
      //document.getElementById("emailError").hidden = false;
    } else if (!password) {
      setErrorPassword(true);
      setError(false);
      // document.getElementById("passwordError").hidden = false;
    } else {
      setErrorPassword(false);
      setError(false);
      handleSignUp();
    }
  };
  return (
    <div>
      <div className=" login-wrapper-background">
        <div className="d-flex justify-content-center align-items-center ">
          <div className="loginBody">
            {/* <Form.Control placeholder="Email or phone number" type="email" className='w-50'/>
        <Form.Control placeholder="Email or phone number" type="password" className='w-50' /> */}
            <div className="mt-2 mb-4 ">
              <h3>LogIn</h3>
            </div>

            <Row>
              <Col>
                {" "}
                <Form
                  className="mt-3 mb-4"
                  style={{ background: "hsla(0, 0%, 100%, 0.55);" }}
                >
                  <Form.Group>
                    <Form.Control
                      className="border-bottom w-100"
                      placeholder="Email or phone number"
                      type="email"
                      onChange={(event) => setMail(event.target.value)}
                    />
                    <span
                      id="emailError"
                      className="text-danger mt-2 mb-2"
                      hidden={errorMail ? false : true}
                    >
                      Please enter a valid email address
                    </span>
                  </Form.Group>

                  <Form.Group className="mt-4 mb-3">
                    <Form.Control
                      className="border-bottom w-100"
                      placeholder="Password"
                      type="password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <span
                      id="passwordError"
                      className="text-danger mt-2 mb-2"
                      hidden={errorPassword ? false : true}
                    >
                      Your password must contain between 4 and 60 characters.
                    </span>
                  </Form.Group>

                  <Button
                    onClick={handleLogin}
                    className="mt-4 btn btn-danger w-100"
                  >
                    Sign In
                  </Button>

                  <div className="d-flex justify-content-between mt-2 mb-4">
                    <div>
                      <input type="checkbox" />
                      <span className="ms-2">Remember</span>
                    </div>
                    <span>Need help? </span>
                  </div>

                  <Form.Text className="mt-4">
                    Don't have an account ?
                    <Link to={"/signUp"}> Sign up now</Link>
                  </Form.Text>

                  <div className="mt-2">
                    <small>
                      This page is protected by Google reCAPTCHA to <br />{" "}
                      ensure you're not a bot.{" "}
                    </small>
                  </div>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
