export type FileSummary = {
  fullPath: string;
  type: "dir" | "file";
};

export type FileMetaData = {
  /** The unique identifier for the file. This identifier is for MattaData */
  id: string;
  /** The full path on disk for the file */
  fullPath: string;
  /** The name of the file on disk */
  fileName: string;
  /** The user-assigned Mattadata name */
  name: string;
  /** A user writtedn description of the file */
  description: string;
  /** A searchable composite string that can be indexed and easy to search */
  search: string;
  /** A key-value set of data that the user can set to capture additional information */
  additionalData?: Record<string, string>;
}

export type FileMetaDataCollection = Record<string, FileMetaData | null>;