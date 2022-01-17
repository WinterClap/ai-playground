import { EnhancedNextPage } from "../..";
import { ModelLayout } from "../../../components/common/ModelLayout";
import { PoseDetectionFrame } from "../../../components/pose-detection";

const PoseDetection: EnhancedNextPage = () => {
  return <PoseDetectionFrame />;
};
PoseDetection.withLayout = ModelLayout;
export default PoseDetection;
