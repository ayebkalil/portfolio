const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = path.resolve(__dirname, "..");
const manifest = require(path.join(root, "video-parts", "manifest.json"));
const destination = path.join(root, "dist", "demos");

fs.mkdirSync(destination, { recursive: true });

for (const [name, entry] of Object.entries(manifest)) {
  const chunks = entry.parts.map((part) =>
    fs.readFileSync(path.join(root, "video-parts", name, part))
  );
  const video = Buffer.concat(chunks);
  const digest = crypto.createHash("sha256").update(video).digest("hex");

  if (video.length !== entry.bytes || digest !== entry.sha256) {
    throw new Error(`Video parts failed integrity check: ${name}`);
  }

  fs.writeFileSync(path.join(destination, `${name}.mp4`), video);
  console.log(`Assembled ${name}.mp4 (${video.length} bytes)`);
}
