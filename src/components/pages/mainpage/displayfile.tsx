import type { IFile } from "../../config/types"

interface Props {
  file: IFile;
}


export const DisplayFile = (props: Props) => {
  const { file } = props;
  const {original_name, size_bytes, comment } = file;

  return (
    <div  className="main-box-row">
      <div className="file-name">{original_name}</div>
      <div className="file-size">{size_bytes}</div>
      <div className="file-comment">{comment}</div>
    </div>
  )
}

