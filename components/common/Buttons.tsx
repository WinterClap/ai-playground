import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Row } from ".";

interface StyledButtonProps {
  padding?: string;
  margin?: string;
  text?: string;
  rounded?: "rounded-2xl" | "rounded-xl";
  border?: string;
  $bgColor?: string;
  $isDisabled?: boolean;
  fontWeight?: string;
  fontSize?: string;
  $boxShadow?: string;
  color?: string;
}

const StyledButton = styled(motion.button)<StyledButtonProps>`
  cursor: ${(props) => (props.$isDisabled ? "not-allowed" : "pointer")};
  border-radius: ${(props) =>
    props.rounded && props.rounded === "rounded-2xl" ? "40px" : props.rounded === "rounded-xl" ? "20px" : "0px"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  border: ${(props) => props.border || "none"};
  background-color: ${(props) => props.$bgColor || "transparent"};
  color: ${(props) => props.color || props.theme.colors.textLight};
  font-weight: ${(props) => props.fontWeight || "normal"};
  font-size: ${(props) => props.fontSize || "auto"};
  box-shadow: ${(props) => props.$boxShadow || "none"};
`;

interface ButtonProps extends StyledButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  withLoader?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, disabled, withLoader, ...rest }) => {
  return (
    <StyledButton
      $isDisabled={disabled}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.1 }}
      {...rest}
    >
      <AnimatePresence exitBeforeEnter>
        {withLoader && disabled ? (
          <Row $justifyContent="space-between" key="123123" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            {children}
            {withLoader}
          </Row>
        ) : (
          <>{children}</>
        )}
      </AnimatePresence>
    </StyledButton>
  );
};
