import { useState } from "react";
import Select from "react-select";

function SelectInput({ label, placeholder = "", options, selectedOption, handleSelected, isMulti = false }) {


  return (

    <div className="form-group">
      <label>{label}</label>
      <Select
        isMulti={isMulti}
        placeholder={placeholder}
        value={selectedOption}
        onChange={handleSelected}
        options={options}
      />
    </div>

  );
};

export default SelectInput;