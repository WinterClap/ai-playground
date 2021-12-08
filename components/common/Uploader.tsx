import { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import { Button } from "../common/Buttons";
import { BouncingLoader } from "./Loaders";
interface UploaderProps {}

export const Uploader: React.FC<UploaderProps> = ({ children }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [file, setFile] = useState<HTMLInputElement | null | string>(null);
  const inputOnChange = () => {
    setIsUploading(!isUploading);
  };

  useEffect(() => {
    if (file) {
      console.log("uploading setted to false");
      setIsUploading(false);
    }
  }, [file]);
  return (
    <Button
      withLoader={<BouncingLoader size={5} spacing="2px" key="BouncingLoader-coco-upload" />}
      disabled={isUploading}
      padding="10px"
      fontSize="1rem"
      fontWeight="bold"
      $boxShadow="0px 0px 10px 1px rgba(254, 22, 114, 0.2)"
      rounded="rounded-xl"
      $bgColor={theme.colors.dimmedTerciary}
      onClick={() => {
        console.log("uploadNewImage");
        inputOnChange();
        console.log("isUploading", isUploading);
        setTimeout(() => {
          setFile("file_sample" + (Math.random() * 999).toString());
        }, 4000);
      }}
    >
      {children}
    </Button>
  );
};
