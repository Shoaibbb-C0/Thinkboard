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
    <div className="form-control mb-6">
      <label className="label cursor-pointer">
        <span className="label-text">Set Reminder</span>
        <input
          type="checkbox"
          className="checkbox"
          checked={reminderEnabled}
          onChange={(e) => handleToggle(e.target.checked)}
        />
      </label>

      {reminderEnabled && (
        <input
          type="datetime-local"
          value={reminderDateTime}
          onChange={handleDateTimeChange}
          className="input input-bordered mt-2 w-full"
          required={reminderEnabled}
        />
      )}
    </div>
  );
};

export default ReminderForm;
