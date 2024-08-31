import React, { useState, useEffect } from "react";
import moment from "moment";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";

// Initial empty state for the days array
const initialDays = [];

export default function Calendar() {
  const [days, setDays] = useState(initialDays);
  const [currentMonth, setCurrentMonth] = useState(moment());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `https://openslot-server.adaptable.app/appointments/`
        );

        const appointments = await response.json();

        // Process appointments and update state
        const formattedDays = formatAppointments(appointments);
        setDays(formattedDays);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [currentMonth]);

  // Function to format appointments data
  const formatAppointments = (appointments) => {
    const startDate = currentMonth.clone().startOf("month");
    const endDate = currentMonth.clone().endOf("month");
    const startOfWeek = startDate.clone().startOf("week");
    const endOfWeek = endDate.clone().endOf("week");

    const daysArray = [];
    let currentDate = startOfWeek.clone();

    while (currentDate.isBefore(endOfWeek, "day")) {
      const dateString = currentDate.format("YYYY-MM-DD");
      daysArray.push({
        date: dateString,
        isCurrentMonth: currentDate.isSame(startDate, "month"),
        isToday: currentDate.isSame(moment(), "day"),
        events: appointments
          .filter((appointment) =>
            moment(appointment.startTime).isSame(currentDate, "day")
          )
          .map((appointment) => ({
            ...appointment,
            startTime: moment(appointment.startTime).format("h:mm A"),
            endTime: moment(appointment.endTime).format("h:mm A"),
          })),
      });
      currentDate.add(1, "day");
    }

    return daysArray;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  const dayHeaders = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div
      style={{ marginTop: "100px" }}
      className="lg:flex lg:h-full lg:flex-col "
    >
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold leading-6 text-gray-900">
          <time dateTime={currentMonth.format("YYYY-MM")}>
            {currentMonth.format("MMMM YYYY")}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <Menu as="div" className="relative">
              <MenuButton
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Month view
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Day view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Week view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Month view
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    >
                      Year view
                    </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <button
              type="button"
              className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add event
            </button>
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Open menu</span>
              <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
            </MenuButton>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Create event
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Go to today
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Day view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Week view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Month view
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Year view
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>

      <main className="flex-1 overflow-hidden bg-white">
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* Day headers */}
          {dayHeaders.map((day, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-2 font-semibold text-gray-900 bg-gray-300"
            >
              {day}
            </div>
          ))}
          {/* Calendar days */}
          {days.map((day, index) => (
            <div
              key={index}
              className={`relative p-2 h-24 ${
                day.isCurrentMonth ? "bg-white" : "bg-gray-50"
              } ${day.isToday ? "border border-indigo-600" : ""}`}
            >
              <time
                dateTime={day.date}
                className="block text-sm font-semibold text-gray-900"
              >
                {moment(day.date).format("D")}
              </time>
              {day.events.length > 0 && (
                <ul className="mt-2">
                  {day.events.map((event, eventIndex) => (
                    <li key={eventIndex} className="text-xs text-gray-600">
                      <div className="font-semibold">{event.title}</div>
                      <div className="text-xs text-gray-500">
                        {event.startTime} - {event.endTime}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {/* Add empty cells to fill the grid */}
          {days.length < 42 && (
            <div
              className="col-span-7 bg-gray-50 p-2"
              style={{ visibility: "hidden" }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
