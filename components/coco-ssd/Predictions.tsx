import styled from "styled-components";
import { motion } from "framer-motion";
import { IconContainer } from "../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight, faSadTear } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../styles/theme";
import { CocoSSDPredictionsType } from "./models";

const capitalize = (str: string | undefined) => {
  return str ? str.substring(0, 1).toUpperCase() + str.substring(1) : null;
};

interface Props {
  predictions: CocoSSDPredictionsType;
}

const Container = styled(motion.div)`
  height: 100%;
  display: flex;
  width: 250px;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Title = styled(motion.h2)`
  font-size: 2rem;
  font-weight: bold;
`;
const Text = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  width: 100%;
`;

const ScoreCounterBox = styled.div`
  padding: 10px;
  height: 100px;
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;
const ScoreCounter = styled.div`
  font-size: 2.5rem;
  margin: 0;
  font-weight: bold;
`;

const OutOfOneHundred = styled.div`
  font-size: 1.3rem;
  margin: 0;
  font-weight: bold;
  color: ${(props) => props.theme.colors.dimmedtextLight};
`;

interface ItemBoxProps {}
const ItemBox = styled(motion.div)`
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0px;
  box-shadow: 0 0 20px 4px rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  background-color: #00000f;
`;

const containerVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3,
    },
  },
};

const boxVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring", damping: 20, stiffness: 460, delay: index * 0.5 },
  }),
};

const itemVariants = {
  hidden: { scale: 0 },
  visible: (index: number) => ({
    rotate: 360,
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 460, delay: index * 0.5 },
  }),
};
export const Predictions = ({ predictions }: Props) => {
  return (
    <Container variants={containerVariants} initial="hidden" animate="visible">
      {!predictions && null}
      {predictions && predictions.length === 0 ? (
        <>
          <Title initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            No predictions found for this image. Try again
          </Title>
          <IconContainer initial={{ scale: 0 }} animate={{ scale: [0, 2, 1] }} margin="20px 0 0 0">
            <FontAwesomeIcon icon={faSadTear} size="3x" color={theme.colors.terciary} />
          </IconContainer>
        </>
      ) : (
        predictions && (
          <>
            <Title initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }}>
              Predictions found:
            </Title>
            {predictions &&
              predictions.map((prediction, index) => (
                <ItemBox custom={index} variants={boxVariants} key={index}>
                  <ScoreCounterBox>
                    <ScoreCounter>{Number(prediction.score && prediction.score * 100).toPrecision(4)}</ScoreCounter>
                    <OutOfOneHundred>/100</OutOfOneHundred>
                  </ScoreCounterBox>
                  <IconContainer custom={index} variants={itemVariants} margin="0 10px">
                    <FontAwesomeIcon icon={faAngleDoubleRight} size="3x" color={theme.colors.terciary} />
                  </IconContainer>
                  <Text>{capitalize(prediction && prediction.class)}</Text>
                </ItemBox>
              ))}
          </>
        )
      )}
    </Container>
  );
};
