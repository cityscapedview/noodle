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
    console.log("\n", "✨", "zipping", args[0], "to", args[1], "...\n");
    const packageSize = await zip(args[0], args[1]);
    console.log(
      `13kjs Package Size: ${packageSize} byte / ${(packageSize
        ? (packageSize / LIMIT) * 100
        : 0
      ).toFixed(2)}%\n`
    );
  } catch (error) {
    console.error("zip error", error);
  }
})();
