'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const currentStyles = "bg-violet-900 text-white rounded-md px-3 py-2 text-sm font-medium";
const otherStyles = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" /> */}
              <div className=" bg-violet-900 h-8 w-8 rounded-full"></div>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href="/" className={clsx({
                  [currentStyles]: pathname === "/",
                  [otherStyles]: pathname !== "/",
                })}>
                  Home
                </Link>
                <Link href="/explore" className={clsx({
                  [currentStyles]: pathname.startsWith("/explore"),
                  [otherStyles]: !pathname.startsWith("/explore"),
                })}>
                  Explore
                </Link>
                <Link href="/process" className={clsx({
                  [currentStyles]: pathname.startsWith("/process"),
                  [otherStyles]: !pathname.startsWith("/process"),
                })}>
                  Process
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}