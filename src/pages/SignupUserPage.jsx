import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup({ createLocation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handlefullName = (e) => setName(e.target.value);
  const handleEmail = (e) => setType(e.target.value);
  const handlePassword = (e) => setImg(e.target.value);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const newUser = {
      fullName,
      email,
      password,
    };

    axios
      .post("https://openslot-server.adaptable.app/auth/signup", newUser)
      .then(function (response) {
        createUser(response.data);

        setfullName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="page-heading">Signup</h1>
      <div>
        <form className="add-form">
          <div className="add-row">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={fullName}
              onChange={handleName}
            />
          </div>
          <div className="add-row">
            <label>Type:</label>
            <input type="text" value={email} onChange={handleEmail} />
          </div>
          {/*<div className="add-row">
            <label>Image URL:</label>
            <input
              type="text"
              name="img"
              value={img}
              onChange={handleImgChange}
            />
          </div>*/}
          <div className="add-row">
            <label>Activities:</label>
            <textarea
              rows="4"
              cols="40"
              type="text"
              name="activities"
              value={activities}
              onChange={handleActivitiesChange}
            />
          </div>
          <div className="add-row">
            <label>Description:</label>
            <textarea
              rows="4"
              cols="40"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div className="add-row">
            <label>Budget Style:</label>
            <select value={budgetStyle} onChange={handleBudgetStyleChange}>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
            </select>
          </div>
          <div className="add-row">
            <label>Local Food:</label>
            <input
              type="text"
              name="food"
              value={food}
              onChange={handleFoodChange}
            />
          </div>
          <div className="add-row">
            <label>Coordinates:</label>
            <input
              type="text"
              name="coordinates"
              value={coordinates}
              onChange={handleCoordinatesChange}
            />
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
