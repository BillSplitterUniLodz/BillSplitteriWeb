import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";

function App() {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    console.log("Test");
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  useEffect(() => {
    console.log("Set");
  }, [setJustifyActive]);
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        {justifyActive === "tab1" ? (
          <Login setJustifyActive={setJustifyActive} />
        ) : (
          <SignUp />
        )}
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default App;
