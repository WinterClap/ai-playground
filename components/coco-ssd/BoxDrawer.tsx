import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CocoSSDPredictionsType } from "./models";
import { setIndexHovered } from "../store/boxDrawerSlice";
interface Props {
  predictions: CocoSSDPredictionsType;
}

interface BoxProps {
  $inset: string;
  $width: string;
  $height: string;
  $zIndexIncrement: number;
}
const Box = styled.span<BoxProps>`
  position: absolute;
  border: 2px solid red;
  z-index: ${(props) => 20 - props.$zIndexIncrement};
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  inset: ${(props) => props.$inset};
  cursor: pointer;
  transition: all 100ms ease-in-out;
  &:hover {
    border-radius: 20px;
  }
`;

export const BoxDrawer = ({ predictions }: Props) => {
  const dispatch = useDispatch();
  const handleOnMouseEnter = (index: number) => {
    dispatch(setIndexHovered(index));
  };

  const handleOnMouseLeave = () => {
    dispatch(setIndexHovered(null));
  };
  return (
    <>
      {predictions &&
        predictions?.map((prediction, index) => (
          <Box
            $inset={`${prediction.bbox![1]}px auto auto ${prediction.bbox![0]}px`}
            $width={`${prediction.bbox![2]}px`}
            $height={`${prediction.bbox![3]}px`}
            $zIndexIncrement={index}
            key={index.toString() + prediction.class}
            onMouseEnter={() => handleOnMouseEnter(index)}
            onMouseLeave={() => handleOnMouseLeave()}
          />
        ))}
    </>
  );
};
