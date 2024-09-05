import React, { useContext, useMemo } from "react";
import moment from "moment";
import { CalendarContext } from "../../context";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export default function WeekView({ handleEventClick }) {
  const { container, containerNav, containerOffset, showDate, showEvents } =
    useContext(CalendarContext);

  const weekColumns = useMemo(() => {
    const startOfWeek = moment(showDate).startOf("week");
    return Array.from({ length: 7 }, (_, i) =>
      startOfWeek.clone().add(i, "days")
    );
  }, [showDate]);

  const hoursRows = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) =>
      moment().startOf("day").add(i, "hours")
    );
  }, []);

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

  return (
    <div
      ref={container}
      className="isolate flex flex-auto flex-col overflow-auto bg-white"
    >
      <div
        style={{ width: "165%" }}
        className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
      >
        <div
          ref={containerNav}
          className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
        >
          <div className="grid grid-cols-7 text-sm leading-6 text-gray-500 sm:hidden">
            {weekColumns.map((day, index) => (
              <button
                key={index}
                type="button"
                className="flex flex-col items-center pb-3 pt-2"
              >
                {day.format("ddd")}
                <span className="mt-1 flex h-8 w-8 items-center justify-center font-semibold text-gray-900">
                  {day.format("D")}
                </span>
              </button>
            ))}
          </div>

          <div className="-mr-px hidden grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
            <div className="col-end-1 w-14" />
            {weekColumns.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-center py-3"
              >
                <span>
                  {day.format("ddd")}{" "}
                  <span
                    className={classNames(
                      "mt-1 flex h-8 w-8 items-center justify-center font-semibold",
                      day.isSame(moment(), "day")
                        ? "rounded-full bg-indigo-600 text-white"
                        : "text-gray-900"
                    )}
                  >
                    {day.format("D")}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-auto">
          <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            {/* Horizontal lines */}
            <div
              className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
              style={{ gridTemplateRows: "repeat(48, minmax(1.75rem, 1fr))" }}
            >
              <div ref={containerOffset} className="row-end-1 h-7"></div>
              {hoursRows.map((hour, index) => (
                <React.Fragment key={index}>
                  <div>
                    <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                      {hour.format("ha")}
                    </div>
                  </div>
                  <div />
                </React.Fragment>
              ))}
            </div>

            {/* Vertical lines */}
            <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-7">
              <div className="col-start-1 row-span-full" />
              <div className="col-start-2 row-span-full" />
              <div className="col-start-3 row-span-full" />
              <div className="col-start-4 row-span-full" />
              <div className="col-start-5 row-span-full" />
              <div className="col-start-6 row-span-full" />
              <div className="col-start-7 row-span-full" />
              <div className="col-start-8 row-span-full w-8" />
            </div>

            {/* Events */}
            <ol
              className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
              style={{
                gridTemplateRows: "1.75rem repeat(48, minmax(0, 1fr)) auto",
              }}
            >
              {showEvents.map((event, index) => {
                const startTime = moment(event.startTime);
                const endTime = moment(event.endTime);
                const dayOfWeek = startTime.day();
                const start =
                  startTime.hour() * 2 + Math.floor(startTime.minutes() / 30);
                const end =
                  endTime.hour() * 2 + Math.ceil(endTime.minutes() / 30);
                const backgroundColorClass = getRandomColorClass();

                return (
                  <li
                    key={index}
                    className={`relative mt-px flex col-start-${
                      dayOfWeek + 1
                    } ${backgroundColorClass}`}
                    style={{ gridRow: `${start + 2} / span ${end - start}` }}
                  >
                    <button
                      onClick={() => handleEventClick(event._id)}
                      className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 hover:bg-blue-100"
                    >
                      <p className="order-1 font-semibold text-blue-700">
                        {event.title}
                      </p>
                      <p className="text-blue-500 group-hover:text-blue-700">
                        <time dateTime={event.startTime}>
                          {startTime.format("h:mm A")}
                        </time>
                        {" - "}
                        <time dateTime={event.endTime}>
                          {endTime.format("h:mm A")}
                        </time>
                      </p>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
