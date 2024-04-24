"use client"

import { FileMetaData } from "@/lib/types";
import { basename } from "path";

interface IProcessFormProps {
  path: string;
  meta: FileMetaData | null;
}
export default function ProcessForm({
  path,
  meta,
}: IProcessFormProps) {
  const fileName = meta?.fileName || basename(path);
  const id = meta?.id || crypto.randomUUID();
  return (
    <form method="post" action="/api/process" encType="multipart/form-data">
      <input name="id" type="hidden" value={id} />
      <input name="fullPath" type="hidden" value={path} />
      <input name="fileName" type="hidden" value={fileName} />
      <div className="space-y-12">
        <div >
          <h2 className="text-base font-semibold leading-7 text-gray-900">Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">This information will help to index the file and make it easier to search</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input type="text" name="name" id="name" autoComplete="name" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <div className="mt-2">
                <textarea id="description" name="description" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the file.</p>
            </div>

          </div>
        </div>
      </div>
      <input type="submit" value="submit" />
    </form>
  );
}