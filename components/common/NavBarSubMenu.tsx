import { motion } from "framer-motion";
import styled from "styled-components";
import { ModelsType } from "../../constants/homePage";

interface NavBarSubMenuProps {
  items: ModelsType;
}

const Container = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
  color: ${(props) => props.theme.colors.textLight};
  max-width: 300px;
  height: 150px;
  position: absolute;
  top: 30px;
  border-radius: 20px 20px 30px 30px;
  padding: 10px;
  cursor: default;
  overflow: hidden;
`;
export const NavBarSubMenu: React.FC<NavBarSubMenuProps> = ({ items }) => {
  return (
    //TODO: Create List component to render these models
    <Container initial={{ scale: 0 }} animate={{ scale: 1, originX: "0", originY: "0" }} exit={{ scale: 0 }}>
      {JSON.stringify(items, null, 2)}
    </Container>
  );
};
