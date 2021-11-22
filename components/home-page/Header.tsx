import styled from "styled-components";
import { Col } from "../common";
import { Button } from "../common/Buttons";
interface Props {
  text: string;
}

const Container = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.primary};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.h1`
  margin: 10px 20px;
  font-size: 4rem;
  text-align: center;
  font-weight: bold;
`;
export const Header = (props: Props) => {
  return (
    <Container>
      <Col flex="0 1">
        <Title> {props.text} </Title>
        <Button> Read More </Button>
      </Col>
    </Container>
  );
};
