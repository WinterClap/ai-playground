import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import ai_playground_icon from "../../public/IconAI-Playground.svg";
import { motion } from "framer-motion";
import { navBarItems } from "../../constants/navbar";
import { theme } from "../../styles/theme";
import { ListLinkItemWithSubmenu } from "./ListLinkItemWithSubmenu";
import { NavBarSubMenu } from "./NavBarSubMenu";
import { models } from "../../constants/homePage";
interface ModelLayoutProps {}

const NavBar = styled.nav`
  padding: 10px 20px;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const BrandIcon = styled(motion.div)`
  height: 50px;
  width: 180px;
  cursor: pointer;
  position: relative;
`;
const StyledImage = styled(Image)`
  filter: invert(97%) sepia(2%) saturate(2%) hue-rotate(344deg) brightness(120%) contrast(100%);
`;
const LinksList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  position: relative;
`;

const ListLinkItem = styled(motion.li)`
  cursor: pointer;
  text-decoration: none;
  width: 80px;
  display: flex;
  flex-direction: column;
  &:not(:last-of-type) {
    margin-right: 30px;
  }
`;

const StyledAnchor = styled.a`
  margin-right: 20px;
`;
export const ModelLayout: React.FC<ModelLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar>
        <BrandIcon
          whileHover={{
            filter: "invert(24%) sepia(88%) saturate(2087%) hue-rotate(197deg) brightness(102%) contrast(103%)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <StyledImage src={ai_playground_icon} alt="icon_here" layout="fill" />
        </BrandIcon>
        <LinksList>
          {navBarItems.map((item, index) =>
            item.hasSubmenu ? (
              <Link passHref href={item.href} key={index}>
                <StyledAnchor>
                  <ListLinkItemWithSubmenu
                    submenu={<NavBarSubMenu items={models} />}
                    title={item.title}
                    icon={item.icon}
                  />
                </StyledAnchor>
              </Link>
            ) : (
              <Link passHref href={item.href} key={index}>
                <ListLinkItem whileHover={{ color: `${theme.colors.dimmedtextLight}` }}>{item.title}</ListLinkItem>
              </Link>
            )
          )}
        </LinksList>
      </NavBar>
      {children}
    </>
  );
};
