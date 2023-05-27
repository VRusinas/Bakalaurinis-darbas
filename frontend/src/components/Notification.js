import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import Modal from './Modal';
import moment from 'moment';
import '../styles/notification.css';

function Notification() {
  const { user } = useAuthContext();
  const [registrations, setRegistrations] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    async function fetchRegistrations() {
      if (user && user.token) {
        const res = await axios.get('http://localhost:5000/api/registrations/myRegistrations', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setRegistrations(res.data.activityRegistration);
      }
    }

    fetchRegistrations();
  }, [user]);

  const today = moment().format('YYYY-MM-DD');
  const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');

  useEffect(() => {
    const notifications = registrations?.filter((registration) => {
      const startDate = moment(registration.startDate).format('YYYY-MM-DD');
      return startDate === today || startDate === tomorrow;
    });
    setHasNotifications(notifications && notifications.length > 0);
  }, [registrations, today, tomorrow]);

  const notifications = registrations
    ?.filter((registration) => {
      const startDate = moment(registration.startDate).format('YYYY-MM-DD');
      return startDate === today || startDate === tomorrow;
    })
    .map((registration) => {
      const startDate = moment(registration.startDate).format('YYYY-MM-DD HH:mm');
      const specialistName = registration.specialistName;
      const activityType = registration.activityType;
      const title = registration.title;
      const isStartDateToday = moment(registration.startDate).isSame(moment(), 'day');
      const message = `Your registration for "${title}" is starting ${
        isStartDateToday ? 'today' : 'tomorrow'
      } (${startDate})!`;

      return (
        <div className="notification" key={registration._id}>
          <p>{message}</p>
        </div>
      );
    });

  return (
    <>
      <button
        className={hasNotifications ? 'notification-button has-notifications' : 'notification-button'}
        onClick={() => setShowModal(true)}
      >
        notifications
        {hasNotifications && <span className="notification-count"></span>}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {notifications.length > 0 ? (
            notifications
          ) : (
            <p>No notifications to display.</p>
          )}
        </Modal>
      )}
    </>
  );
}

export default Notification;
