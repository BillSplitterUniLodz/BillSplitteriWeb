import React, { useffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function App({ setJustifyActive }) {
  const navigate = useNavigate();
  //   const setJustifyActiveLogin = (set) => {
  //     setJustifyActive(set);
  //   };

  let username = null;
  function handleChangeUsername(event) {
    username = event.target.value;
  }
  let password = null;
  function handleChangePassword(event) {
    password = event.target.value;
  }
  const SignIn = (e) => {
    e.preventDefault();
    console.log(username);
    const headers = {
      "Content-type": "application/json",
    };
    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    })
      .then((response) => {
        if (response.status != 200) {
          throw new Error("Wrong user or password");
        } else {
        }
        return response.text();
      })
      .then((result) => {
        localStorage.setItem("token", JSON.parse(result).jwt_token);
        localStorage.setItem("user", JSON.parse(result).user_uuid);
        navigate("/MainPage");
      })
      .catch((err) => {});
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in:</p>
          </div>

          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="formControlLg EmailLogIn"
            type="email"
            size="lg"
            onChange={handleChangeUsername}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg PasswordLogIn"
            type="password"
            size="lg"
            onChange={handleChangePassword}
          />

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
          </div>

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn onClick={(e) => SignIn(e)} className="w-100 mb-4" size="md">
              Login
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
