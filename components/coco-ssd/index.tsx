import styled from "styled-components";
import { ModelHeader } from "../common/models";
import Image from "next/image";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";

import { useCallback, useEffect, useState } from "react";
import { Button } from "../common/Buttons";
import { theme } from "../../styles/theme";
import { Col } from "../common";
import { Predictions } from "./Predictions";
import { BouncingLoader, CircleLoader } from "../common/Loaders";
import { motion } from "framer-motion";
import { Alert } from "../common/Alert";
import { models, modelsName } from "../../constants/homePage";
import { Uploader } from "../common/Uploader";
const circleLoaderSize = 120;

const cocoSsd = require("@tensorflow-models/coco-ssd");

const Container = styled.section`
  background-color: ${(props) => props.theme.colors.primary};
  min-height: 100vh;
`;

const FrameBox = styled.div`
  width: 100%;
  min-height: 500px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const Frame = styled.div`
  border-radius: 20px;
  flex-grow: 1;
  box-shadow: 0px 0px 32px 1px rgba(255, 255, 255, 0.15);
  padding: 10px;
  width: 95%;
  margin: auto;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const ImageBox = styled(motion.div)`
  width: 300px;
  height: 300px;
  box-shadow: 0px 0px 32px 1px rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  position: relative;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
`;
export const SSDFrame = () => {
  const [predictions, setPredictions] = useState<object[] | [] | undefined>(undefined);
  const [loadingNewExampleImage, setLoadingNewExampleImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>("https://source.unsplash.com/random");

  const loadExampleImageHandler = useCallback(async () => {
    setError(false);
    setLoadingNewExampleImage(true);
    setPredictions(undefined);
    setImageSrc(undefined);
    let response;
    try {
      response = await fetch("https://source.unsplash.com/random");
      setImageSrc(response.url);
      console.log(response.url);
    } catch (err) {
      console.error(err);
      setError(true);
      setLoadingNewExampleImage(false);
    }
  }, []);

  useEffect(() => {
    const getPredictions = async () => {
      if (!loadingNewExampleImage && imageSrc) {
        setLoading(true);
        const img = document.getElementById("image");
        // Load the model.
        const model = await cocoSsd.load();
        // Classify the image.
        const possiblePredictions = await model.detect(img);
        console.log("Possible predictions: ", possiblePredictions);
        setPredictions(possiblePredictions);
        setLoading(false);
      } else {
        console.log("model not loaded");
      }
    };
    getPredictions();
  }, [loadingNewExampleImage, imageSrc]);

  const { SSD_OBJECT_DETECTION } = modelsName;
  const [modelInfo] = models.filter((item) => item.name === SSD_OBJECT_DETECTION);
  const defaultText = "made simple";
  return (
    <Container>
      {modelInfo && (
        <ModelHeader highlightedText={modelInfo.name} text={defaultText} description={modelInfo.description} />
      )}
      <FrameBox>
        <Frame>
          <Col width="150px" height="150px" justifyContent="space-around">
            {!loading && !loadingNewExampleImage ? (
              <>
                <Button
                  withLoader
                  disabled={loading || loadingNewExampleImage}
                  padding="10px"
                  $boxShadow="0px 0px 10px 1px rgba(15, 255, 255, 0.2)"
                  rounded="rounded-xl"
                  $bgColor={theme.colors.dimmedSecondary}
                  fontWeight="bold"
                  fontSize="1rem"
                  onClick={() => {
                    console.log("clickedNewImage");
                    loadExampleImageHandler();
                  }}
                >
                  Load new example image
                </Button>
                OR
                <Uploader>Upload an image</Uploader>
              </>
            ) : (
              loading || (loadingNewExampleImage && <BouncingLoader color={theme.colors.terciary} />)
            )}
          </Col>
          {/*loading && "Processing loaded image..."*/}
          {!error && (
            <ImageBox
              initial={{ boxShadow: "0px 0px 32px 1px rgba(255, 255, 255, 0.15)" }}
              animate={{ boxShadow: "0px 0px 32px 1px rgba(255, 255, 255, 0.25)" }}
              transition={{ duration: 2, repeat: loadingNewExampleImage ? Infinity : 1, repeatType: "mirror" }}
            >
              {loading ||
                (loadingNewExampleImage && !error && (
                  <Col height="100%" justifyContent="center" alignItems="center">
                    <CircleLoader
                      x="0"
                      y="0"
                      spinnerSize={circleLoaderSize}
                      viewBox={`0 0 ${circleLoaderSize} ${circleLoaderSize}`}
                      color={theme.colors.textLight}
                    />
                  </Col>
                ))}
              {imageSrc && !error && (
                <StyledImage
                  id="image"
                  onLoad={() => {
                    const timeout = 1000 + Math.floor(Math.random() * 1000);
                    setTimeout(() => {
                      setLoadingNewExampleImage(false);
                      console.log("image loaded");
                    }, timeout);
                  }}
                  src={imageSrc}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </ImageBox>
          )}
          {error && (
            <Alert
              type="error"
              description="There was an error trying to load the image."
              height="fit-content"
              width="fit-content"
            />
          )}
          {predictions && <Predictions predictions={predictions} />}
        </Frame>
      </FrameBox>
      {predictions && JSON.stringify(predictions, null, 2)}
    </Container>
  );
};
