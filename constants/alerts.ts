import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faExclamationCircle, faInfoCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../styles/theme";

export type AlertType = {
  primaryColor: string;
  secondaryColor: string;
  icon: IconProp;
  defaultDescription: string;
  defaultTitle: string;
};
export type AlertsType = {
  success: AlertType;
  warning: AlertType;
  error: AlertType;
  informative: AlertType;
};
export const alerts: AlertsType = {
  success: {
    primaryColor: theme.colors.alertSuccessPrimary,
    secondaryColor: theme.colors.alertSuccessSecondary,
    icon: faCheckCircle,
    defaultDescription: "Done successfully",
    defaultTitle: "Done!",
  },
  warning: {
    primaryColor: theme.colors.alertWarningPrimary,
    secondaryColor: theme.colors.alertWarningSecondary,
    icon: faExclamationCircle,
    defaultDescription: "Warning",
    defaultTitle: "Warning!",
  },
  error: {
    primaryColor: theme.colors.alertErrorPrimary,
    secondaryColor: theme.colors.alertErrorSecondary,
    icon: faTimesCircle,
    defaultDescription: "There was an error trying to do that",
    defaultTitle: "Oops!",
  },
  informative: {
    primaryColor: theme.colors.alertInformativePrimary,
    secondaryColor: theme.colors.alertInformativeSecondary,
    icon: faInfoCircle,
    defaultDescription: "Information message",
    defaultTitle: "Did you know?",
  },
};
