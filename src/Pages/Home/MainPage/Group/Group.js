import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Group.css";

const Group = () => {
  const navigate = useNavigate();
  let GroupsArr = [];
  let GroupsArrExp = [];
  const [assetsUser, SetAssetsUser] = useState();
  const [assetsExpenses, SetAssetsExpenses] = useState();
  const [addExp, setAddExp] = useState();

  let nameExp = null;
  function handleChangeName(event) {
    nameExp = event.target.value;
  }
  let AmountExp = null;
  function handleChangeAmount(event) {
    AmountExp = event.target.value;
  }
  const GetGroup = () => {
    fetch(
      `http://localhost:3000/groups/${localStorage.getItem(
        "groupId"
      )}/expenses/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        GroupsArr = JSON.parse(result);
        SetAssetsUser(GroupsArr.group);
        SetAssetsExpenses(GroupsArr.expenses);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AddExpenses = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:3000/groups/${localStorage.getItem(
        "groupId"
      )}/expenses/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          expense: {
            name: nameExp,
            amount: "-" + AmountExp,
          },
        }),
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        GetGroup();
      })
      .catch((err) => {});
  };
  const [InviteLink, setInviteLink] = useState();
  const Invite = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:3000/groups/${localStorage.getItem(
        "groupId"
      )}/generate_invite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((result) => {
        setInviteLink(JSON.parse(result).token);
        console.log(result.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const OpenWindows = () => {
    navigate("/Expenses");
  };

  useEffect(() => {
    console.log(assetsExpenses);
    GetGroup();
  }, []);

  return (
    <div className="Group">
      {assetsUser &&
        assetsUser.map((product) => {
          return (
            <ul>
              <li>{product.name}</li>
            </ul>
          );
        })}
      <div className="AddExp">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={() => setAddExp(!addExp)}>Add Transaction</button>
          <button onClick={() => OpenWindows()}>Calculator</button>
          <button onClick={(e) => Invite(e)}>Invite</button>
        </div>

        {addExp && (
          <div className="popUp">
            <label>Transaction name</label>
            <input type="text" onChange={handleChangeName} />
            <label>Enter amount in cents:</label>
            <input type="text" onChange={handleChangeAmount} />
            <button onClick={(e) => AddExpenses(e)}>Submit</button>
          </div>
        )}
      </div>
      {InviteLink && InviteLink}
      {assetsExpenses &&
        assetsExpenses.map((product) => {
          return (
            <div>
              <div className="Group_expenses">
                <p>{product.name}</p>
                <p>{product.amount_display}</p>
              </div>
              <hr />
            </div>
          );
        })}
    </div>
  );
};

export default Group;
