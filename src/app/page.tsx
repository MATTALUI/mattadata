import { getUnprocessedFiles } from '@/lib/files';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

export default async function Home() {
  const [
    unprocessedFiles,
  ] = await Promise.all([
    getUnprocessedFiles(),
  ]);
  const unprocessedFileCount = unprocessedFiles.length;
  const nextUnprocessedFile = unprocessedFiles[0];
  const recentFiles = new Array(5).fill(null);

  return (
    <main className="flex-1 p-4">
      {!!unprocessedFileCount && (
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-violet-200 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 mb-4 rounded">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6 text-gray-900">
              There are {unprocessedFileCount} unprocessed files found.
            </p>
            <Link href={`/process?path=${nextUnprocessedFile?.fullPath}`} className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
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
      <div className="flex flex-row">
        <div className="w-2/6 border-r border-solid pe-4">
          <div className="divide-y divide-gray-100">
            {recentFiles.map((recent, i) => (
              <Link href={`/explore/${i}`} className="flex justify-between gap-x-6 py-5 hover:bg-gray-50">
                <div className="flex min-w-0 gap-x-4">
                  {/* <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                  <div className="bg-violet-50 h-8 w-8 rounded-full"></div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">Patch at the Beach</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">/Users/mattalui/Development/projects/wdd430/nextjs-dashboard/patb.jpg</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  {/* <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p> */}
                  <p className="text-xs leading-5 text-gray-500">Viewed 3h ago</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1 ps-4">
          <div>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">
                  <FaSearch />
                </span>
              </div>
              <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Search" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
