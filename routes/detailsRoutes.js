const express = require("express");

const router = express.Router();

const {
  getDel,
  setDel,
  updateDel,
  deleteDel,
} = require("../controllers/controller");

const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getDel).post(protect, setDel);
router.route("/:id").delete(protect, deleteDel).put(protect, updateDel);

module.exports = router;
