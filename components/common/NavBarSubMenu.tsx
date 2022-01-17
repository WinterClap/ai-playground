import { motion } from "framer-motion";
import styled from "styled-components";
import { Col } from ".";
import { ModelsType } from "../../constants/homePage";
import { MAX_ITEMS_PER_COLUMN } from "../../constants/navbar";
import { theme } from "../../styles/theme";
import Link from "next/link";
interface NavBarSubMenuProps {
  items: ModelsType;
}

const Container = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
  color: ${(props) => props.theme.colors.textLight};
  width: 300px;
  position: absolute;
  top: 30px;
  border-radius: 20px 20px 30px 30px;
  padding: 10px;
  cursor: default;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;

const PillOption = styled(motion.div)`
  font-size: 0.7rem;
  margin: 3px;
  width: fit-content;
  padding: 5px 15px;
  cursor: pointer;
  border-radius: 15px;
  display: flex;
  background-color: ${(props) => props.theme.colors.primary};
`;

const getDivisionsInfo = (list: ModelsType, maxItemsQtyPerColumn: number) => {
  const sections = [];
  let temp = [];
  const columnsQty = Math.ceil(list.length / maxItemsQtyPerColumn);
  for (let i = 0; i < columnsQty; i++) {
    temp = list.slice(0, maxItemsQtyPerColumn);
    if (temp.length >= maxItemsQtyPerColumn) {
      list.splice(0, maxItemsQtyPerColumn);
      sections.push(temp);
    } else {
      sections.push(temp);
    }
  }
  return {
    columnsQty,
    sections,
  };
};
export const NavBarSubMenu: React.FC<NavBarSubMenuProps> = ({ items }) => {
  const { sections } = getDivisionsInfo([...items], MAX_ITEMS_PER_COLUMN);
  console.log(sections);
  return (
    //TODO: Create List component to render these models
    <Container initial={{ scale: 0 }} animate={{ scale: 1, originX: "0", originY: "0" }} exit={{ scale: 0 }}>
      {sections.map((sectionArrangements, index) => (
        <Col $alignItems="flex-start" $justifyContent="flex-start" width="100%" key={index}>
          {sectionArrangements.map((arrangement) => (
            <Link href={arrangement.href} passHref key={`${arrangement.name}-${index}`}>
              <PillOption whileHover={{ backgroundColor: `${theme.colors.hoverPrimary}` }}>
                {arrangement.name}
              </PillOption>
            </Link>
          ))}
        </Col>
      ))}
    </Container>
  );
};
