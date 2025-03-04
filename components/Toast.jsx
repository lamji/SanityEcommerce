import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast as BootstrapToast } from 'react-bootstrap';
import { removeNotification } from '../store/features/notificationSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.autoHide) {
        const timer = setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, notification.duration || 5000);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, dispatch]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {notifications.map((notification) => (
        <BootstrapToast
          key={notification.id}
          onClose={() => dispatch(removeNotification(notification.id))}
          show={true}
          delay={3000}
          autohide={notification.autoHide !== false}
          bg={notification.type || 'danger'}
          className="text-white"
        >
          <BootstrapToast.Header closeButton closeVariant="white">
            <strong className="me-auto text-white">
              {notification.title || (notification.type === 'success' ? 'Success' : 'Error')}
            </strong>
          </BootstrapToast.Header>
          <BootstrapToast.Body className="text-white">
            {notification.message}
          </BootstrapToast.Body>
        </BootstrapToast>
      ))}
    </div>
  );
};

export default Toast; 