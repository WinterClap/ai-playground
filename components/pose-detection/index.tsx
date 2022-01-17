import Image from "next/image";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { theme } from "../../styles/theme";

import { Alert } from "../common/Alert";
import { models, modelsName } from "../../constants/homePage";
import { ModelHeader } from "../common/models";
import { Button } from "../common/Buttons";
import { Col } from "../common";
import { Uploader } from "../common/Uploader";
import { BouncingLoader, CircleLoader } from "../common/Loaders";
import { RootState } from "../store/store";
import { Pose, PoseDetectorInput } from "@tensorflow-models/pose-detection";
import { NoPosesFound, PosesCanvas } from "./PosesCanvas";

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
  width: 400px;
  height: 400px;
  box-shadow: 0px 0px 32px 1px rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  position: relative;
`;

const StyledImage = styled(Image)`
  border-radius: 10px;
`;

const circleLoaderSize = 120;

interface Props {}

const RANDOM_BODY_POSES_URL = "https://source.unsplash.com/random/?body, poses";
export const PoseDetectionFrame = (props: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [poseDetector, setPoseDetector] = useState<poseDetection.PoseDetector | null | undefined>(null);
  const [poses, setPoses] = useState<Pose[] | null | undefined>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>(RANDOM_BODY_POSES_URL);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingNewExampleImage, setLoadingNewExampleImage] = useState<boolean>(false);
  const [loadingUploadedImage, setLoadingUploadedImage] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { POSE_DETECTION } = modelsName;
  const [modelInfo] = models.filter((model) => model.name === POSE_DETECTION);
  const defaultText = "made simple";

  const uploadedImage = useSelector((state: RootState) => state.fileUploader.image);
  const loadExampleImageHandler = useCallback(async () => {
    setError(false);
    setLoadingNewExampleImage(true);
    setImageSrc(undefined);
    let response;
    try {
      response = await fetch(RANDOM_BODY_POSES_URL);
      setImageSrc(response.url);
      console.log(response.url);
    } catch (err) {
      console.error(err);
      setError(true);
      setLoadingNewExampleImage(false);
    }
  }, []);

  useEffect(() => {
    const initializeDetector = async () => {
      const detectorConfig: poseDetection.MoveNetModelConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      };
      const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
      setPoseDetector(detector);
    };
    try {
      initializeDetector();
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }, []);
  useEffect(() => {
    const getPosesFromImage = async () => {
      setLoading(true);
      setPoses(null);
      if (poseDetector && imageSrc && !loadingNewExampleImage && !loadingUploadedImage) {
        console.log("Getting poses...");
        const img = document.getElementById("image");
        try {
          console.log("triying to detect");
          const detectedPoses = await poseDetector.estimatePoses(img as HTMLImageElement);
          detectedPoses && setPoses(detectedPoses);
          console.log("detected", detectedPoses);
        } catch (err) {
          console.error(err);
          setError(true);
        }
        setLoading(false);
      } else {
        console.log("Detector not triggered");
        setLoading(false);
      }
    };
    imageSrc && getPosesFromImage();
  }, [imageSrc, poseDetector, loadingNewExampleImage, loadingUploadedImage]);

  useEffect(() => {
    if (uploadedImage) {
      setLoadingUploadedImage(true);
      console.log("uploadedImage", uploadedImage);
      setImageSrc(uploadedImage);
    }
  }, [uploadedImage]);
  return (
    <Container>
      {modelInfo && (
        <ModelHeader highlightedText={modelInfo.name} text={defaultText} description={modelInfo.description} />
      )}
      <FrameBox>
        <Frame>
          <Col width="180px" height="180px" $justifyContent="space-around">
            {!loading && !loadingNewExampleImage ? (
              <>
                <Button
                  padding="10px"
                  rounded="rounded-xl"
                  $bgColor={theme.colors.textLight}
                  fontWeight="bold"
                  fontSize="1rem"
                  color={theme.colors.textDark}
                >
                  Use Camera
                </Button>
                OR
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
                  Load random image
                </Button>
                OR
                <Uploader>Upload an image</Uploader>
              </>
            ) : (
              loading || (loadingNewExampleImage && <BouncingLoader color={theme.colors.terciary} />)
            )}
          </Col>
          {!error && (
            <ImageBox
              ref={imageRef}
              initial={{ boxShadow: "0px 0px 32px 1px rgba(255, 255, 255, 0.15)" }}
              animate={{ boxShadow: "0px 0px 32px 1px rgba(255, 255, 255, 0.25)" }}
              transition={{ duration: 2, repeat: loadingNewExampleImage ? Infinity : 1, repeatType: "mirror" }}
            >
              {loading ||
                (loadingNewExampleImage && !error && (
                  <Col height="100%" $justifyContent="center" $alignItems="center">
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
                <>
                  <StyledImage
                    id="image"
                    onLoad={() => {
                      const timeout = 1000 + Math.floor(Math.random() * 1000);
                      setTimeout(() => {
                        setLoadingNewExampleImage(false);
                        setLoadingUploadedImage(false);
                        console.log("image loaded");
                      }, timeout);
                    }}
                    src={imageSrc}
                    layout="fill"
                    objectFit="cover"
                  />
                </>
              )}
            </ImageBox>
          )}
          {!error && imageSrc && !loading && !loadingUploadedImage && poses && poses.length > 0 && (
            <ImageBox
              initial={{ boxShadow: "0px 0px 32px 1px rgba(255, 255, 255, 0.15)", scale: 0 }}
              animate={{ boxShadow: "0px 0px 32px 1px rgba(255, 255, 255, 0.25)", scale: 1 }}
            >
              <StyledImage id="image" src={imageSrc} layout="fill" objectFit="cover" />
              <PosesCanvas poses={poses} width={400} height={400} />
            </ImageBox>
          )}
          {poses && poses.length === 0 && <NoPosesFound />}
          {error && (
            <Alert
              type="error"
              description="There was an error trying to detect poses"
              height="fit-content"
              width="fit-content"
            />
          )}
        </Frame>
      </FrameBox>
      {poses && JSON.stringify(poses)}
    </Container>
  );
};
