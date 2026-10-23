const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.Image_kit_API,
});

async function uploadFile({ buffer, fileName, folder = "" }) {
  const file = await client.files.upload({
    file: await toFile(Buffer.from(buffer), fileName),
    fileName: fileName,
    folder,
  });
  return file;
}

module.exports = { uploadFile };
