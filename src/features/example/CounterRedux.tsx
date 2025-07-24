import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { add, addInAmount, remove } from "../../redux/counterSlice";

function CounterRedux() {
  const count = useAppSelector((state) => state.counter.value);
  const [amount, setAmount] = useState(0);

  const dispatch = useAppDispatch();

  function handleIncrement() {
    dispatch(add());
  }

  function handleDecrement() {
    dispatch(remove());
  }

  function handleAmountInc() {
    dispatch(addInAmount(amount));
  }

  return (
    <div className="container">
      <button onClick={handleIncrement}>add</button>
      <p>count:{count} </p>
      <button onClick={handleDecrement}>remove</button>
      <br />
      <input
        type="number"
        value={amount}
        placeholder="amount"
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <br />
      <button onClick={handleAmountInc}>Add amount</button>
    </div>
  );
}

export default CounterRedux;
