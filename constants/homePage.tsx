import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faComments,
  faGrinSquint,
  faGrinWink,
  faLaugh,
  faObjectUngroup,
  faSadTear,
  faSmileBeam,
  faTired,
} from "@fortawesome/free-regular-svg-icons";
import { faBiohazard, faChild, faDiagnoses, faImages, faLanguage } from "@fortawesome/free-solid-svg-icons";

export type ModelsType = { name: string; description: string; href: string; icons: IconProp[] }[];

export const modelsName = {
  IMAGE_CLASSIFICATION: "Image classification",
  SSD_OBJECT_DETECTION: "SSD-Object detection",
  BODY_SEGMENTATION: "Body segmentation",
  POSE_DETECTION: "Pose detection",
  TEXT_TOXICITY_DETECTION: "Text toxicity detection",
  SPEECH_COMMAND_RECOGNITION: "Speech command recognition",
  SIMPLE_FACE_DETECTION: "Simple face detection",
  NATURAL_LANGUAGE_QUESTION_ASNWERING: "Natural language question answering",
};
export const models: ModelsType = [
  {
    name: modelsName.IMAGE_CLASSIFICATION,
    description: "Classify images with labels from the ImageNet database (MobileNet).",
    href: "/models",
    icons: [faImages],
  },
  {
    name: modelsName.SSD_OBJECT_DETECTION,
    description: "Localize and identify multiple objects in a single image (Coco SSD).",
    href: "/models/coco-ssd",
    icons: [faObjectUngroup],
  },
  {
    name: modelsName.BODY_SEGMENTATION,
    description: "Segment person(s) and body parts in real-time (BodyPix).",
    href: "/models/",
    icons: [faChild],
  },
  {
    name: modelsName.POSE_DETECTION,
    description:
      "Unified pose detection API for using one of three models that help detect atypical poses and fast body motions with real time performance",
    href: "/models/",
    icons: [faDiagnoses],
  },
  {
    name: modelsName.TEXT_TOXICITY_DETECTION,
    description:
      "Score the perceived impact a comment may have on a conversation, from 'Very toxic' to 'Very healthy' (Toxicity).",
    href: "/models/",
    icons: [faBiohazard],
  },
  {
    name: modelsName.SPEECH_COMMAND_RECOGNITION,
    description: "Classify 1-second audio snippets from the speech commands dataset (speech commands).",
    href: "/models/",
    icons: [faLanguage],
  },
  {
    name: modelsName.SIMPLE_FACE_DETECTION,
    description: "Detect faces in images using a Single Shot Detector arquitecture with a custom encoder (Blazeface).",
    href: "/models/",
    icons: [faSmileBeam, faSadTear, faGrinSquint, faGrinWink, faTired, faLaugh],
  },
  {
    name: modelsName.NATURAL_LANGUAGE_QUESTION_ASNWERING,
    description: "Answer questions based on the content of a given passage of text using BERT.",
    href: "/models/",
    icons: [faComments],
  },
];
