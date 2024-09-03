import { vi } from "date-fns/locale";
import moment from "moment";
import { createContext, useState, useRef, useEffect, useContext } from "react";

import { AuthContext } from "../../../../context/auth.context";

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const { API_URL } = useContext(AuthContext);

  const { user } = useContext(AuthContext);

  const { role, setRole } = useContext(AuthContext);
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const today = new Date();

  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState("week");
  const [showDate, setShowDate] = useState(new Date()); // initialize current with today
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState([]);

  // Set the current date to today
  const handleToday = () => {
    setShowDate(new Date());
  };

  console.log("user", user);

  // Set the current date to the previous view, considering the selected view
  const handlePrevious = () => {
    if (view === "week") {
      const previousWeek = moment(showDate).subtract(1, "week").toDate();
      setShowDate(previousWeek);
    }
  };

  // Set the current date to the next view, considering the selected view
  const handleNext = () => {
    if (view === "week") {
      const nextWeek = moment(showDate).add(1, "week").toDate();
      setShowDate(nextWeek);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `${API_URL}/appointments/${role}/${user.id}/all`
        );
        const appointments = await response.json();

        // set events
        setEvents(appointments);
        // set show events, considering the current date and the selected view
        const showEvents = appointments.filter((event) => {
          return (
            moment(event.startTime).isSameOrAfter(
              moment(showDate).startOf(view)
            ) &&
            moment(event.endTime).isSameOrBefore(moment(showDate).endOf(view))
          );
        });
        setShowEvents(showEvents);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [showDate]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <CalendarContext.Provider
      value={{
        isLoading,
        container,
        containerNav,
        containerOffset,
        today,
        showDate,
        handleToday,
        handlePrevious,
        handleNext,
        view,
        setView,
        showEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};
