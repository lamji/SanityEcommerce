import { useDispatch } from 'react-redux';
import { showSpinner, hideSpinner } from '../store/features/spinnerSlice';

export const useSpinner = () => {
  const dispatch = useDispatch();

  const withSpinner = async (operation, message = 'Loading...') => {
    try {
      dispatch(showSpinner(message));
      const result = await operation();
      return result;
    } finally {
      dispatch(hideSpinner());
    }
  };

  return { withSpinner };
}; 