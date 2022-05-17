import multer from "multer"

export const profileImageLimitSize = 1048576 //1mb

export const upload = multer({
  dest: "uploads",
  fileFilter: (req, file, cb) => {
    if (file.size > profileImageLimitSize) {
      return cb(null, false)
    }
    if (file.mimetype != "image/jpeg") {
      return cb(null, false)
    }
    cb(null, true)
  }
})