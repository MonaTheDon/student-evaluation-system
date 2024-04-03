import mongoose from 'mongoose';
import { PORT , mongoDBURL} from "./config.js";
import { Mentor } from './models/mentor.js';
import { Student } from './models/student.js'; // Assuming you have a Student model defined similarly to the Mentor model

// Connect to MongoDB
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a function to populate mentors and students
async function populateDatabase() {
  try {
    // Create mentors
    const mentor1 = await Mentor.create({
      mentor_id: 'M001',
      name: 'Mentor 1',
      students: ['660d3d38b190553a5e6201c2', '660d3c4066b67908681c8d13', '660d4297223f71910367ed93'],
    });

    const mentor2 = await Mentor.create({
      mentor_id: 'M002',
      name: 'Mentor 2',
      students: ['660c6d4a629dfdfb4b7d039b', '660d3e8b992cd5c5e585a3ed', '660d52c3223f71910367eda9', '660d61d4cf6ab2c5b41c4af9'],
    });

    // Create students if you haven't already
    // You can create them similarly as mentors using the Student model

    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    // Close the connection after populating the database
    mongoose.disconnect();
  }
}

// Call the function to populate the database
populateDatabase();
