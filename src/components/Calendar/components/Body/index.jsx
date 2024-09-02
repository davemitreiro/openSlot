import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import WeekView from "./WeekView";
import { CalendarContext } from "../../context";

export default function Body() {
  const { view } = useContext(CalendarContext);
  const navigate = useNavigate();

  const handleEventClick = (id) => {
    navigate(`/details/${id}`);
  };

  if (view === "week") {
    return <WeekView handleEventClick={handleEventClick} />;
  }
}
