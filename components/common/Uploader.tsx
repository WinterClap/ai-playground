import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { Button } from "../common/Buttons";
import { BouncingLoader } from "./Loaders";
import { setImage } from "../store/fileUploaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AnimatePresence, motion } from "framer-motion";
interface UploaderProps {}

const StyledInput = styled.input``;

const SlipperyText = styled(motion.h5)`
  font-size: 0.75rem;
  padding: 0;
  margin: 8px 0 0 0;
  font-weight: bold;
`;

export const Uploader: React.FC<UploaderProps> = ({ children }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [shouldNotifyFileExistence, setShouldNotifyFileExistence] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const image = useSelector((state: RootState) => state.fileUploader.image);
  const dispatch = useDispatch();

  const checkFileExistence = () => {
    const fileWasUploaded = (fileRef.current?.value.length && fileRef.current?.value?.length) || null;
    console.log("fileWasUploaded: ", fileWasUploaded);
    if (!fileWasUploaded) {
      setIsUploading(false);
      console.log("No file was uploaded.");
      setShouldNotifyFileExistence(true);
      setTimeout(() => {
        setShouldNotifyFileExistence(false);
      }, 3000);
    }
    document.body.onfocus = null;
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleOnChange -fn");
    const uploadedFile = (event.target.files?.length && event.target.files.length > 0 && event.target.files[0]) || null;
    console.log("uploadedFile: ", uploadedFile);
    const image = URL.createObjectURL(uploadedFile) || null;
    dispatch(setImage(image));
  };
  const handleOnClick = () => {
    setIsUploading(true);
    fileRef.current?.click();
    document.body.onfocus = checkFileExistence;
    console.log("uploadingNewImage");
  };

  useEffect(() => {
    console.log("image: ", image);
    if (image) {
      setIsUploading(false);
    }
  }, [image]);
  return (
    <>
      <Button
        withLoader={<BouncingLoader size={5} spacing="2px" key="BouncingLoader-coco-upload" />}
        disabled={isUploading}
        padding="10px"
        fontSize="1rem"
        fontWeight="bold"
        $boxShadow="0px 0px 10px 1px rgba(254, 22, 114, 0.2)"
        rounded="rounded-xl"
        $bgColor={theme.colors.dimmedTerciary}
        onClick={handleOnClick}
      >
        {children}
        <AnimatePresence>
          {shouldNotifyFileExistence && (
            <SlipperyText initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 5, opacity: 0 }}>
              No file was uploaded
            </SlipperyText>
          )}
        </AnimatePresence>
      </Button>
      <StyledInput hidden ref={fileRef} type="file" accept=".png, .img, .jpg" onChange={handleOnChange} />
    </>
  );
};
