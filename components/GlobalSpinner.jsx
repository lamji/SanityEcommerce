import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

const GlobalSpinner = () => {
  const { isVisible, message } = useSelector((state) => state.spinner);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <Spinner animation="border" role="status" variant="light" size="lg">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <div className="text-white mt-3" style={{ fontSize: '1.1rem' }}>
        {message}
      </div>
    </div>
  );
};

export default GlobalSpinner; 