import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DayRow from "./DayRow";

const CalendarView = ({ notes, onAddNote }) => {
  const [currentDate, setCurrentDate] = useState(
    new Date()
  );
  const [displayDays, setDisplayDays] = useState([]);

  // Generate array of dates to display (current week or 14 days)
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
      {/* Month Navigation */}
      <div className="mb-8 flex items-center justify-between rounded-xl border border-base-content/10 bg-base-100 p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-base-content">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <p className="text-sm text-secondary">
            Showing 14 days starting today
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={goToPreviousWeek}
            className="rounded-lg border border-base-content/20 p-3 transition-all hover:border-base-content/40 hover:bg-base-200 active:scale-95"
            title="Previous 2 weeks"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            onClick={goToToday}
            className="rounded-lg bg-base-content px-4 py-2 font-medium text-base-100 transition-all hover:shadow-md active:scale-95"
          >
            Today
          </button>

          <button
            onClick={goToNextWeek}
            className="rounded-lg border border-base-content/20 p-3 transition-all hover:border-base-content/40 hover:bg-base-200 active:scale-95"
            title="Next 2 weeks"
          >
            <ChevronRight className="size-5" />
          </button>
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
