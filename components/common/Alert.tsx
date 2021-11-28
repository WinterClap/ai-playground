import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Col, Row } from ".";
import { alerts } from "../../constants/alerts";

interface AlertContainerProps {
  height?: string;
  $maxWidth?: string;
  $minWidth?: string;
  width?: string;
  $containerColor: string;
}
const AlertContainer = styled(motion.div)<AlertContainerProps>`
  border-radius: 50px;
  padding: 10px;
  min-width: ${(props) => props.$minWidth || "auto"};
  max-width: ${(props) => props.$maxWidth || "none"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  background-color: ${(props) => props.$containerColor};
`;
interface AlertHeaderProps {
  fontSize?: string;
}
const AlertHeader = styled.h1<AlertHeaderProps>`
  font-size: ${(props) => props.fontSize || "1.5rem"};
  margin-top: 10px;
  font-weight: bold;
  margin: 0;
`;
interface AlertDescriptionProps {
  fontSize?: string;
}
const AlertDescription = styled.p<AlertDescriptionProps>`
  margin-top: 10px;
  font-size: ${(props) => props.fontSize || "0.9rem"};
  margin: 0;
  padding-right: 10px;
`;
interface IconSpanContainerProps {
  spanColor: string;
}
const Span = styled.div<IconSpanContainerProps>`
  border-radius: 50%;
  margin-right: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.spanColor};
  position: relative;
`;
interface AlertComponentProps {
  type?: "success" | "warning" | "error" | "informative";
  title?: string;
  description?: string;
  titleFontSize?: string;
  descFontSize?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
}
const IconBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
export const Alert: React.FC<AlertComponentProps> = ({
  type = "warning",
  title,
  description,
  titleFontSize,
  descFontSize,
  width,
  height,
  minWidth,
  maxWidth,
}) => {
  const { primaryColor, secondaryColor, icon, defaultDescription, defaultTitle } = alerts[type];

  return (
    <AlertContainer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      height={height}
      width={width}
      $minWidth={minWidth}
      $maxWidth={maxWidth}
      $containerColor={primaryColor}
    >
      <Row justifyContent="flex-start">
        <Col width="60px">
          <Span spanColor={secondaryColor}>
            <IconBox>
              <FontAwesomeIcon icon={icon} display="block" size="2x" />
            </IconBox>
          </Span>
        </Col>

        <Col alignItems="flex-start">
          <AlertHeader fontSize={titleFontSize}>{title || defaultTitle}</AlertHeader>
          <AlertDescription fontSize={descFontSize}>{description || defaultDescription}</AlertDescription>
        </Col>
      </Row>
    </AlertContainer>
  );
};
