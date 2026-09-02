import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DayRow from "./DayRow";

const CalendarView = ({ notes, onAddNote }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayDays, setDisplayDays] = useState([]);

  useEffect(() => {
    const days = [];
    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);

    // Show 14 days starting from today
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      days.push(date);
    }

    setDisplayDays(days);
  }, [currentDate]);

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 14);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 14);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div>
      {/* Navigation Header */}
      <div className="mb-8 border border-gray-200 rounded-lg p-6 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing 14 days from today
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousWeek}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
              title="Previous 2 weeks"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goToToday}
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Today
            </button>

            <button
              onClick={goToNextWeek}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
              title="Next 2 weeks"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Days Grid */}
      <div className="space-y-4">
        {displayDays.map((date) => (
          <DayRow
            key={date.toISOString()}
            date={date}
            notes={notes}
            onAddNote={onAddNote}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarView;

