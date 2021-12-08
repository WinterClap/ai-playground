import styled from "styled-components";
import { motion } from "framer-motion";
import { Col, IconContainer, Row } from "../common";
import { SectionTitle } from "./SectionTitle";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModelsType } from "../../constants/homePage";
import { theme } from "../../styles/theme";

const Container = styled.section`
  min-height: 100vh;
  background-color: #000012;
`;

interface Props {
  models: ModelsType;
}

const CardContainer = styled(motion.div)`
  width: 300px;
  cursor: pointer;
  margin: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 32px 1px rgba(255, 255, 255, 0.05);
  background-color: #00000f /*${(props) => props.theme.colors.primary}*/;
`;
const ImageBox = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentBox = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
`;
const TextTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
`;
const TextDescription = styled.p`
  color: ${(props) => props.theme.colors.dimmedtextLight};
`;
interface ReferenceProps {
  href: string;
  name: string;
}
const ReferenceSpan = styled.span`
  color: ${(props) => props.theme.colors.terciary};
  font-weight: 600;
`;
const ReferenceLink = ({ href, name }: ReferenceProps) => {
  return (
    <ReferenceSpan>
      <Link href={href}>{name}</Link>
    </ReferenceSpan>
  );
};
export const ModelSection = ({ models }: Props) => {
  return (
    <Container id="models">
      <SectionTitle
        title={"Models"}
        description={"Simple model playground showcase based on pre-trained Tensorflow.js models. More information on "}
        reference={<ReferenceLink href={"https://www.tensorflow.org/js/models"} name="Tensorflow.js models" />}
        padding={"120px 0 40px 40px"}
      />
      <Row flexWrap="wrap" full justifyContent="space-around">
        {models.length !== 0 &&
          models.map((model, index) => (
            <Link href={model.href} passHref key={model.name + index}>
              <CardContainer
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 50px 1px rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ImageBox>
                  <Col width={"100px"} flexWrap="wrap">
                    <Row>
                      {model.icons.slice(0, 3).map((icon, i) => (
                        <IconContainer key={i}>
                          <FontAwesomeIcon icon={icon} size={"4x"} color={theme.colors.terciary} />
                        </IconContainer>
                      ))}
                    </Row>
                    <Row>
                      {model.icons.slice(3).map((icon, i) => (
                        <IconContainer key={i}>
                          <FontAwesomeIcon icon={icon} size={"4x"} color={theme.colors.terciary} />
                        </IconContainer>
                      ))}
                    </Row>
                  </Col>
                </ImageBox>
                <ContentBox>
                  <TextTitle>{model.name}</TextTitle>
                  <TextDescription>{model.description}</TextDescription>
                </ContentBox>
              </CardContainer>
            </Link>
          ))}
      </Row>
    </Container>
  );
};
