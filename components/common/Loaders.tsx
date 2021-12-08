import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { theme } from "../../styles/theme";
interface CircleLoaderProps {
  spinnerSize: number;
  position?: string;
  color?: string;
  viewBox?: string;
  x?: string;
  y?: string;
}
interface CircleLoaderSVGProps {
  $spinnerSize: number;
}
const CircleLoaderSVG = styled(motion.svg)<CircleLoaderSVGProps>`
  width: ${(props) => props.$spinnerSize + "px"};
  height: ${(props) => props.$spinnerSize + "px"};
  circle {
    fill: transparent;
    stroke-linecap: round;
    stroke-dasharray: calc(3.14 * ${(props) => props.$spinnerSize});
    stroke-width: ${(props) => props.$spinnerSize / 20 + "px"};
  }
`;

const innerCircleVariants: Variants = {
  initial: {
    stroke: theme.colors.terciary,
  },
  animate: {
    stroke: theme.colors.secondary,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 2,
    },
  },
};

const circleLoaderVariants: Variants = {
  initial: {
    stroke: theme.colors.terciary,
  },
  animate: (spinnerSize: number) => ({
    scale: [0.95, 1.05, 1],
    stroke: theme.colors.secondary,
    strokeDashoffset: [0.66 * spinnerSize, 3.14 * spinnerSize, 0.66 * spinnerSize],
    rotate: 360,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 2,
    },
  }),
};
export const CircleLoader = ({ spinnerSize, ...rest }: CircleLoaderProps) => {
  return (
    <CircleLoaderSVG
      custom={spinnerSize}
      variants={circleLoaderVariants}
      initial="initial"
      animate="animate"
      $spinnerSize={spinnerSize}
      {...rest}
    >
      <motion.circle
        variants={innerCircleVariants}
        initial="initial"
        animate="animate"
        cy={spinnerSize / 2}
        cx={spinnerSize / 2}
        r={spinnerSize / 2 - 10}
      ></motion.circle>
    </CircleLoaderSVG>
  );
};

const BouncingBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface BouncingSphereProps {
  size: number | undefined;
  color?: string;
  spacing?: string;
}
const BouncingSphere = styled(motion.span)<BouncingSphereProps>`
  margin: 0 ${(props) => props.spacing || "4px"};
  border-radius: 50%;
  width: ${(props) => (props.size ? props.size + "px" : "50px")};
  height: ${(props) => (props.size ? props.size + "px" : "50px")};
  background-color: ${(props) => props.color || props.theme.colors.textLight};
`;

interface BouncingLoaderProps {
  size?: number;
  units?: number;
  color?: string;
  spacing?: string;
}

const bouncingLoaderBoxVariants: Variants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
};
const bouncingLoaderItemVariants: Variants = {
  animate: (index: number) => ({
    originX: "0",
    originY: "0",
    y: [0, -10, 0],
    transition: {
      y: { duration: 1, delay: index * 0.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
    },
  }),
};

export const BouncingLoader: React.FC<BouncingLoaderProps> = ({ size, units, color, spacing }) => {
  const spheres = Array.from(new Array(units));
  return (
    <BouncingBox variants={bouncingLoaderBoxVariants} initial="initial" animate="animate" exit="exit" key="12345">
      {spheres.map((sphere, index) => (
        <BouncingSphere
          spacing={spacing}
          custom={index}
          variants={bouncingLoaderItemVariants}
          animate="animate"
          color={color}
          size={size}
          key={index}
        />
      ))}
    </BouncingBox>
  );
};

BouncingLoader.defaultProps = { size: 10, units: 3, color: theme.colors.textLight, spacing: "4px" };
