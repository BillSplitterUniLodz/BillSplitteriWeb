import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";

function App() {
  const navigate = useNavigate();
  let username = null;
  function handleChangeUsername(event) {
    username = event.target.value;
  }
  let email = null;
  function handleChangeEmail(event) {
    email = event.target.value;
  }
  let password = null;
  function handleChangePassword(event) {
    password = event.target.value;
  }
  const SignUp = (e) => {
    console.log(password);
    e.preventDefault();
    console.log(username);
    const headers = {
      "Content-type": "application/json",
    };
    fetch("http://localhost:3000/sign_up", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        user: {
          username: username,
          email: email,
          password: password,
        },
      }),
    })
      .then((response) => {
        if (response.status != 200) {
          throw new Error("Wrong user or password");
        }
        return response.text();
      })
      .then((result) => {
        localStorage.setItem("token",JSON.parse(result).jwt_token);
        localStorage.setItem("user",JSON.parse(result).user_uuid);
        
      })
      .catch((err) => {});
  };

  return (
    <MDBContainer fluid className="p-4">
      <MDBRow>
        <MDBCol md="12">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5">
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="form1"
                type="username"
                onChange={handleChangeUsername}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form1"
                type="email"
                onChange={handleChangeEmail}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form1"
                type="password"
                onChange={handleChangePassword}
              />

              <MDBBtn
                onClick={(e) => SignUp(e)}
                className="w-100 mb-4"
                size="md"
              >
                Sign up
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
