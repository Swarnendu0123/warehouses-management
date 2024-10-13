import { useRecoilValue } from "recoil";
import { currentFileState } from "../../store/atoms";
import { TypeIcon } from "../TreeViewer/TypeIcon";

import { CustomData, NodeModel } from "../TreeViewer/types";

const InfoViewer = () => {
  // @ts-ignore
  const currentFile = useRecoilValue<NodeModel<CustomData>>(currentFileState);
  console.log(currentFile);

  if (currentFile) {
    return (
      <div className="border-gray-300 border p-5 rounded-md mx-5 w-96 flex">
        <div className="">
          <div className="mx-3">
            <TypeIcon
              droppable={currentFile.droppable || false}
              fileType={currentFile.data?.fileType}
            />
          </div>
          <div className="mx-3">
            <p className="">Id: {currentFile.id}</p>
            <p className="font-bold">Name: {currentFile.text} </p>
            <p className="">Parent Godown: {currentFile.parent}</p>
            <p className="">
              Droppable: {currentFile.droppable ? "Yes" : "No"}
            </p>
            <p className="">
              Type: {currentFile.data ? currentFile.data?.fileType : "Folder"}
            </p>
            {currentFile.data && (
              <p className="">Size: {currentFile.data?.fileSize}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-gray-300 border p-5 rounded-md mx-5 w-96">
      <h1>Please select a file.</h1>
    </div>
  );
};

export default InfoViewer;
