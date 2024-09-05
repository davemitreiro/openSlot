import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CustomDatePicker = ({
  selected,
  onChange,
  showTimeSelect = true,
  dateFormat = "MMMM d, yyyy h:mm aa",
  className = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
}) => {
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterMinutes = (date) => {
    const minutes = date.getMinutes();
    return minutes === 0 || minutes === 30;
  };

  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      showTimeSelect={showTimeSelect}
      timeIntervals={30}
      filterTime={filterPassedTime}
      filterMinutes={filterMinutes}
      dateFormat={dateFormat}
      className={className}
    />
  );
};
