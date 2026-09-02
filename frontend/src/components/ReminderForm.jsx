import { useState } from "react";

const ReminderForm = ({ initialReminder, onReminderChange }) => {
  const [reminderEnabled, setReminderEnabled] = useState(
    initialReminder?.enabled || false
  );
  const [reminderDateTime, setReminderDateTime] = useState(
    initialReminder?.dateTime
      ? new Date(initialReminder.dateTime)
          .toISOString()
          .slice(0, 16)
      : ""
  );

  const handleToggle = (checked) => {
    setReminderEnabled(checked);
    onReminderChange({
      enabled: checked,
      dateTime: reminderDateTime
        ? new Date(reminderDateTime).toISOString()
        : null,
    });
  };

  const handleDateTimeChange = (e) => {
    const value = e.target.value;
    setReminderDateTime(value);
    onReminderChange({
      enabled: reminderEnabled,
      dateTime: value
        ? new Date(value).toISOString()
        : null,
    });
  };

  return (
    <div>
      {/* Toggle Reminder */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <input
          type="checkbox"
          id="reminder-toggle"
          className="w-5 h-5 text-primary bg-white border border-gray-300 rounded focus:ring-2 focus:ring-primary/20 cursor-pointer"
          checked={reminderEnabled}
          onChange={(e) => handleToggle(e.target.checked)}
        />
        <label
          htmlFor="reminder-toggle"
          className="text-sm font-medium text-gray-900 cursor-pointer flex-1"
        >
          Set a reminder
        </label>
      </div>

      {/* Date Time Input */}
      {reminderEnabled && (
        <div className="mt-4">
          <label
            className="block text-sm font-semibold text-gray-900 mb-2"
            htmlFor="reminder-datetime"
          >
            Reminder Date & Time
          </label>
          <input
            id="reminder-datetime"
            type="datetime-local"
            value={reminderDateTime}
            onChange={handleDateTimeChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            required={reminderEnabled}
          />
        </div>
      )}
    </div>
  );
};

export default ReminderForm;

