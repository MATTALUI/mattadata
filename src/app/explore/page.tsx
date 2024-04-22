import { BASE_DIR } from "@/lib/constants";
import { calculatePathCrumbs, collectMountedFiles, checkIsDir } from "@/lib/files";
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
  ] = await Promise.all([
    collectMountedFiles(path, false),
    checkIsDir(path),
  ]);

  return (
    <main className="flex-1 p-4">
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