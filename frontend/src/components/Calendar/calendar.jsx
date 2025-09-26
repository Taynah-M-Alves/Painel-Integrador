import { useState } from "react";
import './styles.css'
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export function MyDatePicker() {
  const [selected, setSelected] = useState();

  return (
    <DayPicker
      animate
      mode="single"
      captionLayout="dropdown-months"
      numberOfMonths={2}
      navLayout="around"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected 
        ? `Voce escolheu : ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
}