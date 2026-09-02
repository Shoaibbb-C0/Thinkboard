import { createContext, useContext, useState } from "react";

const CalendarContext = createContext(null);

export const CalendarProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );
  const [viewMode, setViewMode] = useState("month"); // month or week

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  return useContext(CalendarContext);
};
