import { BASE_DIR } from "@/lib/constants";
import { calculatePathCrumbs, collectMountedFiles, checkIsDir, readMetaCollection } from "@/lib/files";
import { INextPageProps } from "@/lib/types";
import FilePreview from "@/ui/FilePreview";
import Link from "next/link";

export default async function ExplorePage({
  searchParams,
}: INextPageProps) {
  const path = searchParams.path || BASE_DIR;
  const crumbs = calculatePathCrumbs(path);
  const [
    contents,
    isDir,
    collection,
  ] = await Promise.all([
    collectMountedFiles(path, false),
    checkIsDir(path),
    readMetaCollection(),
  ]);
  const needsProcessing = !isDir && !collection[path];

  return (
    <main className="flex-1 p-4">
      {needsProcessing && (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-violet-200 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 mb-4 rounded">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6 text-gray-900">
              This file has not been processed yet.
            </p>
            <Link href={`/process?path=${path}`} className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
              Process Now
              &nbsp;
              &rarr;
            </Link>
          </div>
          <div className="flex flex-1 justify-end">
            <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]">
              <svg className="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="relative isolate flex  bg-gray-50 px-6 py-2.5 rounded items-center mb-4 gap-x-2 overflow-hidden sm:px-3.5">
        {crumbs.map((crumb, i) => {
          const linkPath = crumbs.slice(0, i + 1).join("/").replace("Root", BASE_DIR);
          return (
            <Link
              href={`/explore?path=${linkPath}`}
              key={crumb + i.toString()}
              className="text-sky-600 underline"
            >
              {crumb}
            </Link>
          )
        })}
      </div>
      <div className="flex flex-row">
        <div className="w-2/6 border-r border-solid pe-4">
          [File Dir Tree view here]
        </div>
        <div className="flex-1 ps-4">
          {isDir ? (
            contents.map((summary, i) => (
              <div>
                <Link
                  href={`/explore?path=${summary.fullPath}`}
                  key={summary.fullPath}
                  className="text-sky-600 underline"
                >
                  {summary.fullPath.split("/")[summary.fullPath.split("/").length - 1]}
                </Link>
              </div>
            ))
          ) : (
            <FilePreview path={path} />
          )}
        </div>
      </div>
    </main>
  );
}