import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { increment, decrement } from '../store/features/counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="d-flex align-items-center gap-3 mb-3">
      <Button variant="primary" onClick={() => dispatch(decrement())}>-</Button>
      <span className="fs-5">Count: {count}</span>
      <Button variant="primary" onClick={() => dispatch(increment())}>+</Button>
    </div>
  );
};

export default Counter; 