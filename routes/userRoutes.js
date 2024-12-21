const express = require("express");

const getAllUsers = (req,res) => {
    res.status(500).json({
      status: "fail",
      message: "Route not created"
    });
  }
  
  const createNewUser = (req,res) => {
    res.status(500).json({
      status: "fail",
      message: "Route not created"
    });
  }
  const getUser = (req,res) => {
    res.status(500).json({
      status: "fail",
      message: "Route not created"
    });
  }
  
  const updateUser = (req,res) => {
    res.status(500).json({
      status: "fail",
      message: "Route not created"
    });
  }
  const deleteUser = (req,res) => {
    res.status(500).json({
      status: "fail",
      message: "Route not created"
    });
  }

  
const router = express.Router();


router.route('/').get(getAllUsers).post(createNewUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;