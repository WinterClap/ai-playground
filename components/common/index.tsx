import styled from "styled-components";
import { motion } from "framer-motion";
interface FlexInterface {
  justifyContent?: string;
  alignItems?: string;
  flex?: string;
  full?: boolean;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  flexWrap?: string;
}

export const Col = styled.div<FlexInterface>`
  display: flex;
  height: ${(props) => props.height || "auto"};
  margin: ${(props) => props.margin || "0"};
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  flex: ${(props) => props.flex || "0 1 auto"};
  width: ${(props) => (props.full ? "100%" : props.width || "auto")};
  padding: ${(props) => props.padding || "auto"};
`;

export const Row = styled.div<FlexInterface>`
  display: flex;
  height: ${(props) => props.height || "auto"};
  flex-wrap: ${(props) => props.flexWrap || "no-wrap"};
  margin: ${(props) => props.margin || "0"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  flex: ${(props) => props.flex || "0 1 auto"};
  width: ${(props) => (props.full ? "100%" : props.width || "auto")};
  padding: ${(props) => props.padding || "auto"};
`;

interface IconContainerProps {
  fontSize?: string;
  position?: string;
  display?: string;
  margin?: string;
  inset?: string;
  cursor?: string;
  flexBasis?: string;
}

export const IconContainer = styled(motion.div)<IconContainerProps>`
  font-size: ${(props) => props.fontSize || "inherit"};
  position: ${(props) => props.position || "relative"};
  display: ${(props) => props.display || "inline"};
  margin: ${(props) => props.margin || "0"};
  inset: ${(props) => props.inset || "auto"};
  cursor: ${(props) => props.cursor || "unset"};
  flex-basis: ${(props) => props.flexBasis || "unset"};
`;
