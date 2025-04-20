const express = require("express");
const router = express.Router();
const {
  GetAllStudents,
  CreateNewStudent,
  UpdateStudent,
  DeleteStudent,
  GetStudent

} = require("../../controller/studentController");

router
  .route("/")
  .get(GetAllStudents)
  .post(CreateNewStudent)
  .put(UpdateStudent)
  .delete(DeleteStudent);

router.route("/:id").get(GetStudent);

module.exports = router;
