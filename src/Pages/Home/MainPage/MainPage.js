import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  let GroupsArr = [];
  const [assets, SetAssets] = useState();
  const [add, setAdd] = useState(false);
  const GetGroups = () => {
    fetch("http://localhost:3000/groups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        GroupsArr = JSON.parse(result);
        SetAssets(GroupsArr);
        console.log(GroupsArr);
      })
      .catch((err) => {
        alert(err);
      });
  };

  let name = null;
  function handleChangeNsme(event) {
    name = event.target.value;
  }
  const CreateGroup = (e) => {
    e.preventDefault();
    const headers = {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    fetch("http://localhost:3000/groups/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        group: {
          name: name,
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
        GetGroups();
      })
      .catch((err) => {});
  };

  const ShowGroup = (e) => {
    localStorage.setItem("groupId", e.target.id);
    navigate("/Group");
  };

  useEffect(() => {
    GetGroups();
  }, []);

  return (
    <div className="MainPage">
      <p style={{ fontSize: "80px" }} className="TitleMainPage">
        <label>Groups:</label>{" "}
        <div>
          <i
            onClick={() => setAdd(!add)}
            style={{ float: "right" }}
            class="bi bi-person-plus-fill"
          ></i>
          {/* <i onClick={() => setAdd(!add)} class="bi bi-file-earmark-person"></i> */}
        </div>
      </p>
      {add && (
        <div style={{ transition: "1s" }} className="popUp">
          <label>Add a new group:</label>
          <input type="text" onChange={handleChangeNsme} />
          <button onClick={(e) => CreateGroup(e)}>Submit</button>
        </div>
      )}

      <p className="AssetsGroups">
        {" "}
        {assets &&
          assets.map((product) => {
            return (
              <ul>
                <li id={product.uuid} onClick={(e) => ShowGroup(e)}>
                  {product.name}
                </li>
              </ul>
            );
          })}
      </p>
    </div>
  );
};

export default MainPage;
