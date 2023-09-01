#!/usr/bin/env node
const archiver = require("archiver");
const fs = require("fs");

function zip(dir, outputFilename) {
  return new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const output = fs.createWriteStream(outputFilename);
    output.on("close", () => {
      resolve(archive.pointer());
    });
    output.on("error", (error) => {
      reject(error);
    });
    archive.on("error", (error) => {
      reject(error);
    });
    archive.pipe(output);
    archive.directory(dir, "");
    archive.finalize();
  });
}

const LIMIT = 13 * 1024;

(async () => {
  try {
    const packageSize = await zip("build/bundled", "build/zipped/noodle.zip");
    console.log(
      `Package: ${packageSize} byte / ${(packageSize
        ? (packageSize / LIMIT) * 100
        : 0
      ).toFixed(2)}%`
    );
  } catch (error) {
    console.error("zip error", error);
  }
})();
