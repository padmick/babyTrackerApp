import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface NotificationPreferences {
  feedingReminders: boolean;
  sleepReminders: boolean;
  journalReminders: boolean;
}

export function useNotifications() {
  const [preferences, setPreferences] = useLocalStorage<NotificationPreferences>('notificationPreferences', {
    feedingReminders: true,
    sleepReminders: true,
    journalReminders: true,
  });

  useEffect(() => {
    if (!('Notification' in window)) {
      return;
    }

    const requestPermission = async () => {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setPreferences({
          feedingReminders: false,
          sleepReminders: false,
          journalReminders: false,
        });
      }
    };

    requestPermission();
  }, []);

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    new Notification(title, options);
  };

  return {
    preferences,
    setPreferences,
    sendNotification,
  };
}