import { Keypoint, Pose } from "@tensorflow-models/pose-detection";
import styled from "styled-components";
import { ScaleLinear, scaleLinear } from "d3-scale";
import { motion } from "framer-motion";
import { Col, IconContainer } from "../common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../styles/theme";

const Title = styled(motion.h2)`
  font-size: 2rem;
  font-weight: bold;
`;

const NODE_COLOR = "purple";

const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
interface SVGProps {
  width: string;
}
const SVG = styled.svg<SVGProps>`
  position: absolute;
  inset: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
type LinkType = {
  start: number;
  end: number;
};
interface NodeMapInterface {
  keypoints: Keypoint[];
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  size: number;
}

const NodeMap = ({ keypoints, xScale, yScale, size }: NodeMapInterface) => {
  return (
    <>
      {keypoints
        ? keypoints.map((node, index) => (
            <circle key={index} cx={xScale(node.x)} cy={yScale(node.y)} r={size} fill={NODE_COLOR} />
          ))
        : null}
    </>
  );
};

interface LinkerInterface {
  links: LinkType[];
  keypoints: Keypoint[];
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
}

const Linker = ({ links, keypoints, xScale, yScale }: LinkerInterface) => {
  return (
    <>
      {links.map((link, i) => (
        <line
          key={i}
          x1={xScale(keypoints[link.start].x)}
          x2={xScale(keypoints[link.end].x)}
          y1={yScale(keypoints[link.start].y)}
          y2={yScale(keypoints[link.end].y)}
          strokeWidth={2}
          stroke="green"
        />
      ))}
    </>
  );
};
//MoveNet configuration, refer to https://github.com/tensorflow/tfjs-models/tree/master/pose-detection
const linksGroup = [
  [
    { start: 4, end: 2 },
    { start: 2, end: 0 },
    { start: 0, end: 1 },
    { start: 1, end: 3 },
  ],
  [
    { start: 10, end: 8 },
    { start: 8, end: 6 },
    { start: 6, end: 12 },
    { start: 12, end: 14 },
    { start: 14, end: 16 },
    { start: 6, end: 5 },
    { start: 5, end: 7 },
    { start: 7, end: 9 },
    { start: 5, end: 11 },
    { start: 11, end: 13 },
    { start: 13, end: 15 },
    { start: 12, end: 11 },
  ],
];
interface PosesCanvasProps {
  poses: Pose[];
  width: number;
  height: number;
}
export const PosesCanvas = ({ poses, width, height }: PosesCanvasProps) => {
  const { keypoints } = poses[0];
  const [headNodes, bodyNodes] = [keypoints.slice(0, 5), keypoints.slice(5)];
  console.log(keypoints);
  const nodes = [headNodes, bodyNodes];
  var xScale = scaleLinear().domain([0, width]).range([0, width]);
  var yScale = scaleLinear().domain([0, height]).range([0, height]);
  return (
    <>
      {poses.length > 0 ? (
        <SVG
          width={width + "px"}
          height={height + "px"}
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {nodes.map((nodeGroup, index) => (
            <Linker key={index} links={linksGroup[index]} keypoints={keypoints} xScale={xScale} yScale={yScale} />
          ))}
          <NodeMap keypoints={keypoints} xScale={xScale} yScale={yScale} size={5} />
        </SVG>
      ) : null}
    </>
  );
};

export const NoPosesFound = () => {
  return (
    <Col width="400px" padding="10px 20px">
      <Title initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        No poses found for this image. Try again.
      </Title>
      <IconContainer initial={{ scale: 0 }} animate={{ scale: [0, 2, 1] }} margin="20px 0 0 0">
        <FontAwesomeIcon icon={faSadTear} size="3x" color={theme.colors.terciary} />
      </IconContainer>
    </Col>
  );
};
