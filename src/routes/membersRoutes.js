const express = require("express");
const router = express.Router();
const membersController = require("../controllers/membersController");

router.get("/members", membersController.getAllMembers);
router.get("/members/:name", membersController.getMemberByName);
router.post("/members", membersController.createMember);
router.put("/members/:id", membersController.updateMember);
router.delete("/members/:id", membersController.deleteMember);

module.exports = router;
