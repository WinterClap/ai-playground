import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { Row, IconContainer } from ".";
import { theme } from "../../styles/theme";

const StyledListLinkItem = styled(motion.li)`
  cursor: pointer;
  text-decoration: none;
  width: 80px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &:not(:last-of-type) {
    margin-right: 30px;
  }
`;

interface ListLinkItemWithSubmenuProps {
  title: string;
  icon: IconProp;
  submenu: any;
}

export const ListLinkItemWithSubmenu = ({ title, icon, submenu }: ListLinkItemWithSubmenuProps) => {
  const [isSubmenuVisible, setIsSubmenuVisible] = useState<boolean>(false);
  return (
    <StyledListLinkItem
      onMouseLeave={() => setIsSubmenuVisible(false)}
      onMouseEnter={() => setIsSubmenuVisible(true)}
      whileHover={{ color: `${theme.colors.dimmedtextLight}` }}
    >
      <Row $justifyContent="space-around">
        {title}
        <IconContainer margin="0 0 3px 0">
          <FontAwesomeIcon icon={icon} color={theme.colors.textLight} />
        </IconContainer>
      </Row>
      <AnimatePresence exitBeforeEnter>{isSubmenuVisible && submenu}</AnimatePresence>
    </StyledListLinkItem>
  );
};
