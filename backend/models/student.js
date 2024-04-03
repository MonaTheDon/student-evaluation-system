import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  student_name: {
    type: String,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
  },
  mentor_id:{
    type: String,
    required: true,
  },
  ideation: {
    type: Number,
    required: true,
  },
  execution: {
    type: Number,
    required: true,
  },
  viva: {
    type: Number,
    required: true,
  },
  email: {
    lowercase: true,
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please enter a valid email address",
    },
  },
  evaluated: {
    type: Boolean,
    default: false,
  },
});

export const Student = mongoose.model("Student", studentSchema);