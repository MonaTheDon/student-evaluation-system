import mongoose from "mongoose";

const mentorSchema = mongoose.Schema({
  mentor_id: {
    type: String,
    required: true,
    unique: true, 
  },
  name: {
    type: String,
    required: true,
  },
  students: {
    type: [mongoose.SchemaTypes.ObjectId], // Array of student object IDs
    ref: 'Student', // Reference to the Student model
    validate: {
      validator: (students) => students.length >= 3 && students.length <= 4,
      message: 'A mentor must have between 3 and 4 students.',
    },
  },
});

export const Mentor = mongoose.model("Mentor", mentorSchema);
