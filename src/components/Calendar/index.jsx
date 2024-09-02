import { CalendarProvider } from "./context";
import { Header, Body } from "./components";

export default function Calendar() {
  return (
    <CalendarProvider>
      <div className="flex h-full flex-col pt-32">
        <Header />
        <Body />
      </div>
    </CalendarProvider>
  );
}
