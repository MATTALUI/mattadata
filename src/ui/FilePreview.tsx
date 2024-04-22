import { readMetaCollection } from "@/lib/files";
import { basename, extname } from "path";
import { readFile } from "fs/promises";

interface IFilePreviewProps {
  path: string;
}
export default async function FilePreview({
  path
}: IFilePreviewProps) {
  const [
    collection,
  ] = await Promise.all([
    readMetaCollection(),
  ]);
  const collectionEntry = collection[path];
  const fileName = basename(path);
  const extension = extname(fileName);
  let content = null;

  switch (extension) {
    case ".txt": {
      const text = await readFile(path, { encoding: 'utf8' });
      content = (
        <div className="max-h-96 overflow-auto border bg-gray-100 p-4">
          <p>{text}</p>
        </div>
      );
      break;
    }
    case ".gif":
    case ".webp": {
      const srcEncoding = await readFile(path, { encoding: 'base64' });
      content = (
        <img
          src={`data:image/${extension.replace(".", "")};base64, ${srcEncoding}`}
          className="max-h-full max-w-full block"
        />
      );
      break;
    }
    case ".mp4": {
      const srcEncoding = await readFile(path, { encoding: 'base64' });
      content = (
        <video
          src={`data:video/${extension.replace(".", "")};base64, ${srcEncoding}`}
          className="max-h-full max-w-full block cursor-pointer"
          controls
        />
      );
      break;
    }
    case ".mp3": {
      const srcEncoding = await readFile(path, { encoding: 'base64' });
      content = (
        <audio
          src={`data:audio/${extension.replace(".", "")};base64, ${srcEncoding}`}
          className="max-h-full max-w-full block cursor-pointer"
          controls
        />
      );
      break;
    }
    default:
      content = (
        <div>
          <strong>Preview Unavailable: </strong>
          {fileName}
        </div>
      );
  }
  return (
    <div>
      {content}
    </div>
  );
}