import { ReactNode } from "react";
import styled from "styled-components";

interface ContainerProps {
  padding?: string;
}
const Container = styled.div<ContainerProps>`
  padding: ${(props) => props.padding || "0"};
`;
const Header = styled.header`
  font-size: 3rem;
  font-weight: bold;
`;
const Description = styled.p`
  font-size: 1rem;
  font-weight: normal;
`;

interface Props {
  title: string;
  description?: string;
  reference?: ReactNode;
  padding?: string;
}

export const SectionTitle = ({ title, description, reference, padding }: Props) => {
  return (
    <Container padding={padding}>
      <Header>{title}</Header>
      <Description>
        {description} {reference && reference}.
      </Description>
    </Container>
  );
};
