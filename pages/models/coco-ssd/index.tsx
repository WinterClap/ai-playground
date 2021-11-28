import { NextPage } from "next";
import { EnhancedNextPage } from "../..";
import { SSDFrame } from "../../../components/coco-ssd";
import { ModelLayout } from "../../../components/common/ModelLayout";

const Ssd: EnhancedNextPage = () => {
  return <SSDFrame />;
};
Ssd.withLayout = ModelLayout;
export default Ssd;
