const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ================= SIGNUP =================
exports.signup = async (req, res) => {
  res.status(200).json({ message: "Signup API working" });
};

// ================= VERIFY OTP =================
exports.verifyOtp = async (req, res) => {
  res.status(200).json({ message: "Verify OTP API working" });
};

// ================= RESEND OTP =================
exports.resendOtp = async (req, res) => {
  res.status(200).json({ message: "Resend OTP API working" });
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  res.status(200).json({ message: "Login API working", token: "dummy-token" });
};

// ================= VERIFY LOGIN OTP =================
exports.verifyLoginOtp = async (req, res) => {
  res.status(200).json({ message: "Verify Login OTP API working" });
};

// ================= RESEND LOGIN OTP =================
exports.resendLoginOtp = async (req, res) => {
  res.status(200).json({ message: "Resend Login OTP API working" });
};

// ================= LOGOUT =================
exports.logout = (req, res) => {
  res.status(200).json({
    message: "User logged out successfully (client should remove token)",
  });
};
