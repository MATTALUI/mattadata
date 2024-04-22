import type { INextPageProps } from "@/lib/types";
import { getUnprocessedFiles } from '@/lib/files';
import { redirect } from 'next/navigation'

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
    redirect(`/process?path=${nextUnprocessedFile.fullPath}`)
  }

  return (
    <main className="flex-1 p-4">
      Process: {filePath}
    </main>
  );
}