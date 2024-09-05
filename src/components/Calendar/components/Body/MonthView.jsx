import React, { useContext } from "react";
import { CalendarContext } from "../../context";
import moment from "moment";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const getRandomColorClass = () => {
  const colors = [
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function MonthView({ handleEventClick }) {
  const { showDate, showEvents, container } = useContext(CalendarContext);

  const currentMonth = moment(showDate);
  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = moment(currentMonth).startOf("month");
  const lastDayOfMonth = moment(currentMonth).endOf("month");

  const days = [];
  let day = firstDayOfMonth.clone().startOf("week");
  while (day.isBefore(lastDayOfMonth.endOf("week"))) {
    days.push({
      date: day.clone(),
      isCurrentMonth: day.month() === currentMonth.month(),
      isToday: day.isSame(moment(), "day"),
      events: showEvents.filter((event) =>
        moment(event.startTime).isSame(day, "day")
      ),
    });
    day.add(1, "day");
  }

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div
      ref={container}
      className="flex-1 flex flex-col overflow-auto bg-white"
    >
      <div className="flex-1">
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
            {weekDays.map((day) => (
              <div key={day} className="bg-white py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {days.map((day) => (
                <div
                  key={day.date.format("YYYY-MM-DD")}
                  className={classNames(
                    day.isCurrentMonth
                      ? "bg-white"
                      : "bg-gray-50 text-gray-500",
                    "relative px-3 py-2"
                  )}
                >
                  <time
                    dateTime={day.date.format("YYYY-MM-DD")}
                    className={classNames(
                      day.isToday
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                        : undefined
                    )}
                  >
                    {day.date.format("D")}
                  </time>
                  {day.events.length > 0 && (
                    <ol className="mt-2">
                      {day.events.slice(0, 2).map((event) => {
                        const backgroundColorClass = getRandomColorClass();
                        return (
                          <li key={event._id} className={backgroundColorClass}>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleEventClick(event._id);
                              }}
                              className="group flex"
                            >
                              <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                {event.title}
                              </p>
                              <time
                                dateTime={event.startTime}
                                className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                              >
                                {moment(event.startTime).format("h:mm A")}
                              </time>
                            </a>
                          </li>
                        );
                      })}
                      {day.events.length > 2 && (
                        <li className="text-gray-500">
                          + {day.events.length - 2} more
                        </li>
                      )}
                    </ol>
                  )}
                </div>
              ))}
            </div>
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {days.map((day) => (
                <button
                  key={day.date.format("YYYY-MM-DD")}
                  type="button"
                  className={classNames(
                    day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                    (day.isSelected || day.isToday) && "font-semibold",
                    day.isSelected && "text-white",
                    !day.isSelected && day.isToday && "text-indigo-600",
                    !day.isSelected &&
                      day.isCurrentMonth &&
                      !day.isToday &&
                      "text-gray-900",
                    !day.isSelected &&
                      !day.isCurrentMonth &&
                      !day.isToday &&
                      "text-gray-500",
                    "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10"
                  )}
                >
                  <time
                    dateTime={day.date.format("YYYY-MM-DD")}
                    className={classNames(
                      day.isSelected &&
                        "flex h-6 w-6 items-center justify-center rounded-full",
                      day.isSelected && day.isToday && "bg-indigo-600",
                      day.isSelected && !day.isToday && "bg-gray-900",
                      "ml-auto"
                    )}
                  >
                    {day.date.format("D")}
                  </time>
                  <span className="sr-only">{day.events.length} events</span>
                  {day.events.length > 0 && (
                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                      {day.events.map((event) => (
                        <span
                          key={event._id}
                          className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                        />
                      ))}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
