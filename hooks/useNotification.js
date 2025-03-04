import { useDispatch } from 'react-redux';
import { addNotification } from '../store/features/notificationSlice';

export const useNotification = () => {
  const dispatch = useDispatch();

  const showNotification = ({
    message,
    type = 'danger',
    title,
    duration = 5000,
    autoHide = true,
  }) => {
    dispatch(
      addNotification({
        message,
        type,
        title,
        duration,
        autoHide,
      })
    );
  };

  const showError = (message, title = 'Error') => {
    showNotification({ message, type: 'danger', title });
  };

  const showSuccess = (message, title = 'Success') => {
    showNotification({ message, type: 'success', title });
  };

  const showWarning = (message, title = 'Warning') => {
    showNotification({ message, type: 'warning', title });
  };

  const showInfo = (message, title = 'Info') => {
    showNotification({ message, type: 'info', title });
  };

  return {
    showNotification,
    showError,
    showSuccess,
    showWarning,
    showInfo,
  };
}; 