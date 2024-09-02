import React, { useState, useEffect } from "react";
import moment from "moment";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";

import { useNavigate } from "react-router-dom";

// Initial empty state for the days array
const initialDays = [];

// Function to generate random colors
const getRandomColor = () => {
  const colors = [
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function Calendar() {
  const [days, setDays] = useState(initialDays);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [currentDay, setCurrentDay] = useState(moment());
  const [viewMode, setViewMode] = useState("week");

  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    if (eventId) {
      navigate(`/details/${eventId}`);
    } else {
      console.error("Event ID is missing.");
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `https://openslot-server.adaptable.app/appointments/`
        );
        const appointments = await response.json();

        // Process appointments and update state
        const formattedDays =
          viewMode === "week"
            ? formatWeeklyAppointments(appointments)
            : formatAppointments(appointments);
        setDays(formattedDays);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [currentMonth, currentDay, viewMode]);

  // Function to format appointments data for month view
  const formatAppointments = (appointments) => {
    const startDate = currentMonth.clone().startOf("month");
    const endDate = currentMonth.clone().endOf("month");
    const startOfWeek = startDate.clone().startOf("week");
    const endOfWeek = endDate.clone().endOf("week");

    const daysArray = [];
    let currentDate = startOfWeek.clone();

    while (currentDate.isBefore(endOfWeek, "day")) {
      const isCurrentMonth = currentDate.isSame(startDate, "month");
      daysArray.push({
        date: currentDate.format("YYYY-MM-DD"),
        isCurrentMonth: isCurrentMonth,
        isToday: currentDate.isSame(moment(), "day"),
        events: appointments
          .filter((appointment) =>
            moment(appointment.startTime).isSame(currentDate, "day")
          )
          .map((appointment) => ({
            ...appointment,
            startTime: moment(appointment.startTime).format("h:mm A"),
            endTime: moment(appointment.endTime).format("h:mm A"),
            color: getRandomColor(), // Add random color
          })),
      });
      currentDate.add(1, "day");
    }

    return daysArray;
  };

  // Function to format appointments data for week view
  const formatWeeklyAppointments = (appointments) => {
    const startOfWeek = currentDay.clone().startOf("week");
    const endOfWeek = currentDay.clone().endOf("week");

    const daysArray = [];
    let currentDate = startOfWeek.clone();

    while (currentDate.isBefore(endOfWeek, "day")) {
      daysArray.push({
        date: currentDate.format("YYYY-MM-DD"),
        isToday: currentDate.isSame(moment(), "day"),
        events: appointments
          .filter((appointment) =>
            moment(appointment.startTime).isSame(currentDate, "day")
          )
          .map((appointment) => ({
            ...appointment,
            // startTime: moment(appointment.startTime).format("h:mm A"),
            // endTime: moment(appointment.endTime).format("h:mm A"),
            color: getRandomColor(), // Add random color
          })),
      });
      currentDate.add(1, "day");
    }

    return daysArray;
  };

  const handlePrevious = () => {
    if (viewMode === "month") {
      setCurrentMonth(currentMonth.clone().subtract(1, "month"));
    } else if (viewMode === "day") {
      setCurrentDay(currentDay.clone().subtract(1, "day"));
    } else if (viewMode === "week") {
      setCurrentDay(currentDay.clone().subtract(1, "week"));
    }
  };

  const handleNext = () => {
    if (viewMode === "month") {
      setCurrentMonth(currentMonth.clone().add(1, "month"));
    } else if (viewMode === "day") {
      setCurrentDay(currentDay.clone().add(1, "day"));
    } else if (viewMode === "week") {
      setCurrentDay(currentDay.clone().add(1, "week"));
    }
  };

  const handleDayClick = (date) => {
    setCurrentDay(moment(date));
    setViewMode("day");
  };

  const handleWeekChange = (direction) => {
    setCurrentDay(currentDay.clone().add(direction, "week"));
  };

  const dayHeaders = ["S", "M", "T", "W", "T", "F", "S"];

  // Find the events for the selected day
  const getEventsForDay = (date) => {
    const dayData = days.find((day) => moment(day.date).isSame(date, "day"));
    return dayData ? dayData.events : [];
  };

  // Define the time slots for daily and weekly view
  const timeSlots = Array.from({ length: 24 }, (_, i) =>
    moment().startOf("day").add(i, "hour").format("h:mm A")
  );

  const weeklyTimeSlots = Array.from({ length: 24 }, (_, i) =>
    moment().startOf("day").add(i, "hour").format("h:mm A")
  );

  // Format the full date for display
  const formatDateForDisplay = (date) => {
    return moment(date).format("dddd, MMMM D YYYY");
  };

  // Format the week range for display
  const formatWeekRange = (start, end) => {
    return `${start.format("MMMM D")} - ${end.format("D")}`;
  };

  return (
    <div
      style={{ marginTop: "100px" }}
      className="lg:flex lg:h-full lg:flex-col"
    >
      <header className="flex items-center border-b border-gray-200 px-6 py-4 lg:flex-none">
        <div className="flex items-center flex-1">
          {/* Unified Date and Arrow Buttons Container */}
          <div className="flex items-center border border-gray-300 rounded-md bg-white min-w-[250px]">
            <button
              type="button"
              onClick={handlePrevious}
              className="flex h-9 w-9 items-center justify-center rounded-l-md bg-white text-gray-400 hover:bg-gray-50 border-r border-gray-300"
              style={{ borderRightWidth: 0 }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex-1 text-center py-2 px-4 font-semibold text-gray-900">
              {viewMode === "month" ? (
                <time dateTime={currentMonth.format("YYYY-MM")}>
                  {currentMonth.format("MMMM YYYY")}
                </time>
              ) : viewMode === "day" ? (
                <time dateTime={currentDay.format("YYYY-MM-DD")}>
                  {currentDay.format("MMMM D, YYYY")}
                </time>
              ) : (
                <time dateTime={currentDay.format("YYYY-MM-DD")}>
                  {formatWeekRange(
                    currentDay.clone().startOf("week"),
                    currentDay.clone().endOf("week")
                  )}
                </time>
              )}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="flex h-9 w-9 items-center justify-center rounded-r-md bg-white text-gray-400 hover:bg-gray-50 border-l border-gray-300"
              style={{ borderLeftWidth: 0 }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Dropdown Menu */}
          <Menu as="div" className="relative ml-4">
            <MenuButton
              type="button"
              className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {viewMode === "month"
                ? "Month view"
                : viewMode === "day"
                ? "Day view"
                : "Week view"}
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-3 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="p-1">
                <MenuItem>
                  <a
                    href="#"
                    onClick={() => setViewMode("day")}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Day view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    onClick={() => setViewMode("week")}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Week view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    onClick={() => setViewMode("month")}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Month view
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>

      {/* Main Calendar View */}
      {viewMode === "month" && (
        <div className="flex-1 overflow-auto pb-24 p-6">
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {dayHeaders.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-2 font-semibold text-gray-900 bg-gray-300"
              >
                {day}
              </div>
            ))}
            {days.map((day, index) => (
              <div
                key={index}
                className={`relative p-2 h-24 cursor-pointer ${
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50"
                } ${
                  day.isToday ? "border border-indigo-600" : ""
                } hover:bg-gray-100 border border-gray-200`}
                onClick={() => handleDayClick(day.date)}
              >
                <time
                  dateTime={day.date}
                  className="block text-sm font-semibold text-gray-900"
                >
                  {moment(day.date).format("D")}
                </time>
                {day.events.length > 0 && (
                  <ul className="mt-2">
                    {day.events.map((event, eventIndex) => {
                      if (eventIndex >= 2) return;
                      return (
                        <li
                          key={eventIndex}
                          className={`text-xs p-1 rounded-md mb-1 ${event.color} border border-gray-400`}
                        >
                          <div className="font-semibold">{event.title}</div>
                          <div className="text-xs">
                            {event.startTime} - {event.endTime}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
            {days.length < 42 && (
              <div
                className="col-span-7 bg-gray-50 p-2"
                style={{ visibility: "hidden" }}
              />
            )}
          </div>
        </div>
      )}

      {viewMode === "week" && (
        <div className="flex-1 overflow-auto pb-24 p-6">
          <div className="grid grid-cols-[auto_repeat(7,_1fr)] grid-rows-[auto_repeat(24,_1fr)] border border-gray-300">
            {/* Blank top-left cell */}
            <div className="border-r border-b border-gray-300"></div>

            {/* Day headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day, index) => (
                <div
                  key={index}
                  className={`border-b border-gray-300 p-2 text-center font-semibold bg-gray-50 ${
                    index === 0 ? "col-start-2" : ""
                  }`}
                >
                  {day}
                </div>
              )
            )}

            {/* Time slots */}
            {weeklyTimeSlots.map((slot, slotIndex) => (
              <React.Fragment key={slotIndex}>
                <div
                  className="border-r border-gray-300 p-2 text-gray-600 bg-gray-100"
                  style={{ gridRow: `${slotIndex + 2} / span 1` }}
                >
                  {slot}
                </div>

                {days.map((day, dayIndex) => {
                  // Find events for the current day and time slot
                  const events = getEventsForDay(day.date).filter((event) => {
                    console.log(event);
                    const eventStart = moment(event.startTime);
                    const eventEnd = moment(event.endTime);
                    const slotsToTake = moment
                      .duration(eventEnd.diff(eventStart))
                      .asHours();
                    console.log(slotsToTake);

                    return eventStart.format("h:mm A") === slot;
                  });

                  return (
                    <div
                      key={dayIndex}
                      className="border-r border-gray-300 p-1 overflow-hidden bg-white"
                      style={{ gridRow: `${slotIndex + 2} / span 1` }}
                    >
                      {events.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`h-full text-xs p-1 rounded-md mb-1 ${event.color} border border-gray-400 cursor-pointer`}
                          onClick={() => handleEventClick(event._id)}
                        >
                          <div className="font-semibold">{event.title}</div>
                          <div className="text-xs">
                            {event.startTime} - {event.endTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {viewMode === "day" && (
        <div className="flex h-full">
          <div className="flex-1 overflow-auto pb-24 p-6">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {formatDateForDisplay(currentDay)}
              </h2>

              <div className="flex flex-col border-l border-gray-300">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b border-gray-200 py-1 px-2 text-sm text-gray-700"
                  >
                    <span className="w-24 text-gray-600">{slot}</span>
                    <div className="flex-1">
                      {getEventsForDay(currentDay)
                        .filter((event) => {
                          const eventStart = moment(event.startTime, "h:mm A");
                          const eventEnd = moment(event.endTime, "h:mm A");
                          return (
                            eventStart.format("h:mm A") === slot ||
                            (eventStart.isBefore(
                              moment(slot, "h:mm A").endOf("hour")
                            ) &&
                              eventEnd.isAfter(
                                moment(slot, "h:mm A").startOf("hour")
                              ))
                          );
                        })
                        .map((event, eventIndex) => {
                          return (
                            <div
                              key={eventIndex}
                              className={`text-xs p-1 rounded-md mb-1 ${event.color} border border-gray-400 cursor-pointer`}
                              onClick={() => handleEventClick(event._id)}
                            >
                              <div className="font-semibold">{event.title}</div>
                              <div className="text-xs">
                                {event.startTime} - {event.endTime}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
