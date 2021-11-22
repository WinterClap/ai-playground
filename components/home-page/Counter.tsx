import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { decrement, increment, setCounter } from "../store/counterSlice";
import { RootState } from "../store/store";
interface Props {}

const Container = styled.div``;

const Title = styled.h1`
  font-size: 10rem;
  font-weight: bold;
`;
export const Header = (props: Props) => {
  const value = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const inputCounterRef = useRef<HTMLInputElement>(null);

  const setCounterhandler = () => {
    const newValue = Number(inputCounterRef.current?.value) || 0;
    dispatch(setCounter(newValue));
  };

  return (
    <Container>
      <Title> Counter: {value} </Title>
      <button onClick={() => dispatch(increment())}>Increment += 1</button>
      <button onClick={() => dispatch(decrement())}>Decrement -= 1</button>
      <label htmlFor="amountInput">Amount to be set</label>
      <input id="amountInput" type="number" ref={inputCounterRef} />
      <button onClick={() => setCounterhandler()}>Increment by amount ^</button>
    </Container>
  );
};
