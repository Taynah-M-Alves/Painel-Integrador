import { useState } from "react";

function TextInput({ label, type = "text", placeholder = "", name , value, handleValue}) {

  // const handleChange = (e) => {
  //   setValue(e.target.value)

  // }
  return (

    <div>
      <div className="form-group">
        <label>{label} </label>
        <input type={type}
          className="form-control form-control-lg"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleValue}
        />
      </div>
    </div>

  );
};

export default TextInput;