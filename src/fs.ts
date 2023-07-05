import * as fs from "node:fs/promises";
import { dirname } from "node:path";

import * as prettier from "prettier";

const readFile = async (path: string) => {
  return fs.readFile(path, { encoding: "utf-8" });
};

const writeFile = async (path: string, content: string) => {
  await fs.mkdir(dirname(path), { recursive: true });
  await fs.writeFile(
    path,
    await prettier.format(content, {
      filepath: path,
      ...(await prettier.resolveConfig(path)),
    }),
    { encoding: "utf-8" },
  );
};

const removeDirectory = async (path: string) => {
  await fs.rm(path, { recursive: true, force: true });
};

export { readFile, removeDirectory, writeFile };
