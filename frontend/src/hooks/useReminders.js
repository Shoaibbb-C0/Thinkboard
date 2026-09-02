import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export const useReminders = (notes) => {
  const remindersRef = useRef({});

  useEffect(() => {
    if (!notes || notes.length === 0) return;

    const checkReminders = () => {
      const now = new Date();

      notes.forEach((note) => {
        if (
          note.reminder?.enabled &&
          note.reminder?.dateTime
        ) {
          const reminderTime = new Date(
            note.reminder.dateTime
          );

          // Check if reminder time has passed and hasn't been notified yet
          if (
            reminderTime <= now &&
            !remindersRef.current[note._id]
          ) {
            // Mark as notified
            remindersRef.current[note._id] = true;

            // Show notification
            toast.success(
              `Reminder: ${note.title}`,
              {
                duration: 5000,
                icon: "🔔",
              }
            );

            // Also try browser notification if available
            if (
              "Notification" in window &&
              Notification.permission === "granted"
            ) {
              new Notification("Note Reminder", {
                body: `Time for: ${note.title}`,
                icon: "🔔",
              });
            }
          }
        }
      });
    };

    // Check reminders immediately
    checkReminders();

    // Check every 10 seconds
    const interval = setInterval(checkReminders, 10000);

    return () => clearInterval(interval);
  }, [notes]);

  // Request notification permission on first load
  useEffect(() => {
    if (
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
  }, []);
};
