import { getUnprocessedFiles } from '@/lib/files';
import { redirect } from 'next/navigation'
interface IProcessPageProps {
  // These come from nextjs so I am just guessing on the type
  searchParams: { path?: string };
}
export default async function ProcessPage({
  searchParams
}: IProcessPageProps) {
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