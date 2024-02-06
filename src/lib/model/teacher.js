import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    trim: [true, "User id must be unique"],
    minlength: 8,
    validate: {
      validator: function (value) {
        return !/\s/.test(value); // Should not contain spaces
      },
      message: "User ID should not contain spaces.",
    },
  },
  className: {
    type: String,
    required: true,
    unique:true,
    enum: [
      "LKG",
      "UKG",
      "Class-1",
      "Class-2",
      "Class-3",
      "Class-4",
      "Class-5",
      "Class-6",
      "Class-7",
      "Class-8",
      "Class-9",
      "Class-10",
      "Class-11",
      "Class-12",
    ],
  },
  classTeacherName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (value) {
        // Minimum length of 8 characters, at least one uppercase letter, and one number
        const hasUpperCase = /[A-Z]/.test(value);
        const hasNumber = /\d/.test(value);
        return hasUpperCase && hasNumber;
      },
      message:
        "Password should be at least 8 characters long and contain at least one uppercase letter and one number.",
    },
  },
});


export const Teacher= mongoose.models.teachers || mongoose.model("teachers", teacherSchema)
