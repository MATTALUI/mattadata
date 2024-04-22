import type { FileSummary } from "@/types";
import { readdir, stat, } from "fs/promises";
import { join } from "path";

const BASE_DIR = "/Users/mattalui/Development/projects/mattadata/fake-shared"
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