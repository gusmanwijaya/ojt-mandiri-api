const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `public/uploads/`);
  },
  filename: function (req, file, callback) {
    callback(null, new Date().getTime().toString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "application/vnd.ms-excel" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    callback(null, true);
  } else {
    callback(
      { message: "Format file yang didukung hanya .xls atau .xlsx" },
      false
    );
  }
};

const uploadMiddleware = multer({
  storage,
  //   limits: {
  //     fileSize: 10000000, //10MB
  //   },
  fileFilter,
});

module.exports = uploadMiddleware;
