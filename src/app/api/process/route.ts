"use server";

import { redirect } from 'next/navigation'
import { getUnprocessedFiles, updateMetaCollection } from "@/lib/files";
import type { FileMetaData } from "@/lib/types";

export async function POST(req: Request) {
  const formData = await req.formData();
  const entry: FileMetaData = {
    id: formData.get("id")?.toString() || "",
    fullPath: formData.get("fullPath")?.toString() || "",
    fileName: formData.get("fileName")?.toString() || "",
    name: formData.get("name")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    search: "",
  };
  entry.search = [
    entry.name,
    entry.description,
  ].join(" | ");
  await updateMetaCollection({ [entry.fullPath]: entry });
  const [nextFile] = await getUnprocessedFiles();
  const redirectPath = nextFile ? `/process?path=${nextFile.fullPath}` : "/"
  redirect(redirectPath);
}