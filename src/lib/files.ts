import type { FileMetaDataCollection, FileSummary } from "@/lib/types";
import { COLLECTION_PATH, BASE_DIR } from "@/lib/constants"
import { readdir, stat, readFile, writeFile } from "fs/promises";
import { join } from "path";

export const collectMountedFiles = async (
  dir = BASE_DIR,
  recursive = true,
): Promise<FileSummary[]> => {
  const fileStat = await stat(dir);
  if (!fileStat.isDirectory()) return [{
    fullPath: dir,
    type: "file",
  }];
  const contents = await readdir(dir);
  const dirsWithMeta = await Promise.all(contents.map(async (localPath) => {
    const fullPath = join(dir, localPath);
    const fileStat = await stat(fullPath);
    const summary: FileSummary = {
      fullPath,
      type: fileStat.isDirectory() ? "dir" : "file"
    }

    return summary;
  }));


  if (recursive) {
    const explorations: Array<FileSummary | FileSummary[]> = await Promise.all(dirsWithMeta.map(async (summary) => {
      if (summary.type === "file") return summary;
      return await collectMountedFiles(summary.fullPath);
    }));
    return explorations.flat();
  }

  return dirsWithMeta;
}

export const readMetaCollection = async (): Promise<FileMetaDataCollection> => {
  try {
    return JSON.parse(await readFile(COLLECTION_PATH, { encoding: "utf8" }));
  } catch (e) {
    return {};
  }
}

export const updateMetaCollection = async (
  updates: FileMetaDataCollection
): Promise<FileMetaDataCollection> => {
  const collection = await readMetaCollection();
  Object.assign(collection, updates);
  await writeFile(COLLECTION_PATH, JSON.stringify(collection));

  return collection;
}

export const getUnprocessedFiles = async (): Promise<FileSummary[]> => {
  const [
    files,
    collection
  ] = await Promise.all([
    collectMountedFiles(),
    readMetaCollection(),
  ]);

  return files.filter((file) => !collection[file.fullPath]);
}