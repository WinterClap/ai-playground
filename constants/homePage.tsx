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

export const models: ModelsType = [
  {
    name: "Image classification",
    description: "Classify images with labels from the ImageNet database (MobileNet).",
    href: "models/",
    icons: [faImages],
  },
  {
    name: "SSD-Object detection",
    description: "Localize and identify multiple objects in a single image (Coco SSD).",
    href: "models/coco-ssd",
    icons: [faObjectUngroup],
  },
  {
    name: "Body segmentation",
    description: "Segment person(s) and body parts in real-time (BodyPix).",
    href: "models/",
    icons: [faChild],
  },
  {
    name: "Pose detection",
    description:
      "Unified pose detection API for using one of three models that help detect atypical poses and fast body motions with real time performance",
    href: "models/",
    icons: [faDiagnoses],
  },
  {
    name: "Text toxicity detection",
    description:
      "Score the perceived impact a comment may have on a conversation, from 'Very toxic' to 'Very healthy' (Toxicity).",
    href: "models/",
    icons: [faBiohazard],
  },
  {
    name: "Speech command recognition",
    description: "Classify 1-second audio snippets from the speech commands dataset (speech commands).",
    href: "models/",
    icons: [faLanguage],
  },
  {
    name: "Simple face detection",
    description: "Detect faces in images using a Single Shot Detector arquitecture with a custom encoder (Blazeface).",
    href: "models/",
    icons: [faSmileBeam, faSadTear, faGrinSquint, faGrinWink, faTired, faLaugh],
  },
  {
    name: "Natural language question answering",
    description: "Answer questions based on the content of a given passage of text using BERT.",
    href: "models/",
    icons: [faComments],
  },
];
