import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddForm from "./AddForm";

const Form = (props) => {
  //Props
  const { selectedItem, handleClick, handleSubmit, fetchData } = props;

  //State Variables
  const [name, setName] = useState(selectedItem.name ? selectedItem.name : "");
  const [title, setTitle] = useState(selectedItem.title ? selectedItem.title : "");
  const [gender, setGender] = useState(selectedItem.gender ? selectedItem.gender : "");
  const [image, setImage] = useState(selectedItem.img ? selectedItem.img : "");
  const [formSwap, setFormSwap] = useState(false);
  const [addElement, setAddElement] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    selectedItem.spouse && selectedItem.spouse.length >= 1 ? "Child" : "Spouse",
  ); //Selection Option For Child or Spouse

  // const id = selectedItem.id;

  useEffect(() => {
    setName(selectedItem.name);
    setGender(selectedItem.gender);
    selectedItem.title ? setTitle(selectedItem.title) : setTitle("");
    selectedItem.image && setImage(selectedItem.image);
    selectedItem.img && setImage(selectedItem.img);
  }, [selectedItem]);

  //Event Handlers

  const handleAdd = () => {
    setAddElement(true);
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm("Are you sure you want to delete this item?");

    if (shouldDelete) {
      axios
        .put(`http://localhost:3005/delete/${selectedItem.id}`)
        .then((response) => {
          console.log("User updated successfully:", response.data);
          fetchData();
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  return (
    <div className="w-full h-[100vh] overflow-y-auto bg-[#f8fafc] rounded-[20px] shadow-xl">
      <div className="relative">
        <div
          className={`relative min-h-[200px] flex flex-col items-center text-white rounded-[20px_20px_40px_40px] ${gender === "female" ? "bg-[linear-gradient(135deg,_#ec4899,_#f472b6,_#f9a8d4)]" : "bg-[#039BE5]"}`}
        >
          <div className="text-center">
            <h1 className="mt-5 text-3xl font-bold">{name}</h1>
            <div className="absolute top-5 right-5 cursor-pointer">
              <CloseIcon fontSize="large" onClick={handleClick} />
            </div>
            <div>
              <h2>{title}</h2>
            </div>
          </div>
          <img
            className="w-[140px] h-[140px] object-cover rounded-full border-[6px] border-white absolute bottom-[-40px] shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
            src={`./Resources/${image}.png`}
            alt={image}
          />
        </div>
        <div className="flex justify-center mt-[90px]">
          {formSwap ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 justify-center items-center">
                <button className="edit-button" onClick={handleDelete}>
                  <DeleteIcon fontSize="large" />
                </button>
                <button className="edit-button" onClick={handleAdd}>
                  <AddIcon fontSize="large" />
                </button>
              </div>
              {addElement && (
                <div className="flex justify-center gap-4">
                  {selectedItem.spouse &&
                    selectedItem.spouse.length >= 1 &&
                    selectedItem.spouse.every((ele) => {
                      let disp;
                      if (ele?.display) {
                        disp = ele.display;
                      }
                      return disp;
                    }) && (
                      <label className="flex gap-2 text-lg font-semibold">
                        <input
                          type="radio"
                          value="Child"
                          checked={selectedOption === "Child"}
                          onChange={(e) => setSelectedOption(e.target.value)}
                          className="scale-125"
                        />
                        Child
                      </label>
                    )}
                  <label className="flex gap-2 text-lg font-semibold">
                    <input
                      type="radio"
                      value="Spouse"
                      checked={selectedOption === "Spouse"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="scale-125"
                    />
                    Spouse
                  </label>
                </div>
              )}
            </div>
          ) : (
            <button className="edit-button" onClick={() => setFormSwap(!formSwap)}>
              <ModeEditIcon fontSize="large" />
            </button>
          )}
        </div>
      </div>
      <AddForm
        selectedItem={selectedItem}
        handleSubmit={handleSubmit}
        formSwap={formSwap}
        setFormSwap={setFormSwap}
        addElement={addElement}
        selectedOption={selectedOption}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Form;
