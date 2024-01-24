import React, { useEffect, useState } from "react";
import "./Expenses.css";

const Expenses = () => {
  let GroupsArr = [];
  const [stat, setStat] = useState();
  const GetGroup = () => {
    fetch(
      `http://localhost:3000/groups/${localStorage.getItem(
        "groupId"
      )}/expenses/stats`,
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
        setStat(GroupsArr.balance);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetGroup();
  }, []);

  return (
    <div className="Expenses">
      <h1>Who owes to whom:</h1>
      {stat &&
        stat.map((product) => {
          return (
            <div>
              <p>
                {product.payers[0].username} owes to {product.username}
              </p>
              <p>Amount: {product.payers[0].amount}</p>
              <hr />
            </div>
          );
        })}
    </div>
  );
};

export default Expenses;
