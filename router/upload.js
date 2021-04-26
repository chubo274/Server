const express = require("express");
const router = express.Router();

const path = require("path");
const upload = require("../middleware/uploadMiddleware");
const Resize = require("../public/Resize");

router.get("/", async function (req, res) {
  await res.render("formUpload");
});

router.post("/post", upload.single("image"), async function (req, res) {
  // folder upload
  const imagePath = path.join(
    __dirname,
    "../../AppDuNhan/DuNhan/src/assets/img"
  );
  // call class Resize
  const fileUpload = new Resize(imagePath);
  if (!!!req.files) {
    res.status(401).json({ error: "Please provide an image" });
  }
  const filename = await fileUpload.save(req.files.image.data);

  return res.status(200).json({ filename });
});

module.exports = router;
