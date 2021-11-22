import styled from "styled-components";
import { motion } from "framer-motion";

interface ButtonProps {
  padding?: string;
  margin?: string;
  text?: string;
  rounded?: "rounded-2xl" | "rounded-xl";
  border?: string;
  bgColor?: string;
  isDisabled?: boolean;
  fontWeight?: string;
  fontSize?: string;
  boxShadow?: string;
}

const StyledButton = styled(motion.button)<ButtonProps>`
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  border-radius: ${(props) =>
    props.rounded && props.rounded === "rounded-2xl" ? "40px" : props.rounded === "rounded-xl" ? "20px" : "0px"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  border: ${(props) => props.border || "none"};
  background-color: ${(props) => props.bgColor || "transparent"};
  color: ${(props) => props.theme.colors.textLight};
  font-weight: ${(props) => props.fontWeight || "normal"};
  font-size: ${(props) => props.fontSize || "auto"};
  box-shadow: ${(props) => props.boxShadow || "none"};
`;

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  withLoader?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, disabled, withLoader, ...rest }) => {
  return (
    <StyledButton
      isDisabled={disabled}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.1 }}
      {...rest}
    >
      {withLoader && disabled && "LOADER"}
      {children}
    </StyledButton>
  );
};
