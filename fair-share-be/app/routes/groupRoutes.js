const express = require("express");
const {
  createGroup,
  getGroups,
  addUserToGroup,
} = require("../controllers/groupController");

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.post("/add-user", addUserToGroup);

module.exports = router;
