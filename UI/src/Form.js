import React, { useState } from "react";

const Form = (props) => {
  const { selectedItem, relation } = props;
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [wifeName, setWifeName] = useState("");
  const [husbandName, setHusbandName] = useState("");

  console.log(selectedItem);
  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Title:", title);
    console.log("Gender:", gender);
    console.log("Image:", image);
    if (gender === "male") {
      console.log("Wife Name:", wifeName);
    }
    if (gender === "female") {
      console.log("Husband Name", husbandName);
    }
    if (relation === "child") {
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Gender:</label>
        <label>
          <input
            type="radio"
            value="male"
            checked={gender === "male"}
            onChange={handleGenderChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            value="female"
            checked={gender === "female"}
            onChange={handleGenderChange}
          />
          Female
        </label>
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      {gender === "female" && (
        <div>
          <label>Husband Name:</label>
          <input
            type="text"
            value={husbandName}
            onChange={(e) => setHusbandName(e.target.value)}
          />
        </div>
      )}
      {gender === "male" && (
        <div>
          <label>Wife Name:</label>
          <input
            type="text"
            value={wifeName}
            onChange={(e) => setWifeName(e.target.value)}
          />
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
