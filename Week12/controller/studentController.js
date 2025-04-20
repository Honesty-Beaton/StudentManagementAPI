const Student = require("../model/Student");

// Get All Students
const GetAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No students found!" });
    }
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create New Student
const CreateNewStudent = async (req, res) => {
  const { firstName, lastName, email, course, enrolledDate } = req.body;
  if (!firstName || !lastName || !email || !course ||!enrolledDate) {
    return res
      .status(400)
      .json({ message: "First and Last Names, email, course, and enrolled date are required!" });
  }
  try {
    const result = await Student.create({ firstName, lastName, email, course, enrolledDate });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Student
const UpdateStudent = async (req, res) => {
  const { id, firstName, lastName, email, course, enrolledDate } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required!" });
  }
  try {
    const student = await Student.findById(id).exec();
    if (!student) {
      return res.status(404).json({ message: `No student matches ID ${id}` });
    }
    if (firstName) student.firstName = firstName;
    if (lastName) student.lastName = lastName;
    if (email) student.email = email;
    if (course) student.course = course;
    if (enrolledDate) student.enrolledDate = enrolledDate;
    const result = await student.save();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Student
const DeleteStudent = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required!" });
  }
  try {
    const student = await Student.findById(id).exec();
    if (!student) {
      return res.status(404).json({ message: `No student matches ID ${id}` });
    }
    const result = await Student.deleteOne({ _id: id });
    res.json({ message: "Student deleted", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get One Student
const GetStudent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Student ID is required!" });
  }
  try {
    const student = await Student.findById(id).exec();
    if (!student) {
      return res.status(404).json({ message: `No student matches ID ${id}` });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  GetAllStudents,
  CreateNewStudent,
  UpdateStudent,
  DeleteStudent,
  GetStudent
  
};
