import type { INextPageProps } from "@/lib/types";
import { getUnprocessedFiles } from '@/lib/files';
import { redirect } from 'next/navigation'
import FilePreview from "@/ui/FilePreview";

export default async function ProcessPage({
  searchParams
}: INextPageProps) {
  const [
    unprocessedFiles
  ] = await Promise.all([
    getUnprocessedFiles(),
  ]);
  const filePath = searchParams.path;
  if (!filePath && unprocessedFiles.length) {
    const nextUnprocessedFile = unprocessedFiles[0];
    redirect(`/process?path=${nextUnprocessedFile.fullPath}`);
  }
  if (!filePath) {
    redirect(`/`);
  }

  return (
    <main className="flex-1 p-4">
      <div className="flex flex-row">
        <div className="w-2/6 border-r border-solid pe-4">
          <FilePreview path={filePath} />
        </div>
        <div className="flex-1 ps-4">
          Right
        </div>
      </div>
    </main>
  );
}