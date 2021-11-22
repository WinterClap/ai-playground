import styled from "styled-components";
import { IconContainer, Col } from ".";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Nav = styled.nav`
  width: 100%;
  display: flex;
  padding: 20px 40px;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0;
  font-weight: bold;
  width: 100%;
`;

interface TextProps {
  highlight?: boolean;
  size?: string;
  margin?: string;
  display?: string;
}

const Text = styled.p<TextProps>`
  font-weight: ${(props) => (props.highlight ? "bold" : "normal")};
  font-size: ${(props) => props.size || "1rem"};
  margin: ${(props) => props.margin || "0"};
  display: ${(props) => props.display || "auto"};
`;

interface ModelNavBarProps {
  title: string;
}
export const ModelNavBar = ({ title }: ModelNavBarProps) => {
  return (
    <Nav>
      <IconContainer>
        <Link href="/" passHref>
          <FontAwesomeIcon icon="arrow-left" size="2x" />
        </Link>
      </IconContainer>
      <Title>{title}</Title>
    </Nav>
  );
};

interface ModelHeaderProps {
  highlightedText: string;
  text: string;
  description?: string;
  extraText?: string;
}
export const ModelHeader: React.FC<ModelHeaderProps> = ({
  children,
  highlightedText,
  text,
  description,
  extraText,
}) => {
  return (
    <>
      <Col padding="100px 0 0 0" full justifyContent="space-between">
        <span>
          <Text display="inline" highlight size="2.4rem">
            {highlightedText}
          </Text>
          <Text display="inline" size="2.4rem">
            {" "}
            {text}
          </Text>
        </span>
        {description && (
          <Text margin="20px 0 0 0" size="0.9rem">
            {description}
          </Text>
        )}
        {extraText && (
          <Text margin="20px 0 0 0" size="0.6rem">
            {extraText}
          </Text>
        )}

        {children}
      </Col>
    </>
  );
};
