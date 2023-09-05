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
    const args = process.argv.slice(2);
    const packageSize = await zip(args[0], args[1]);
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
