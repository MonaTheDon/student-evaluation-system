import express from 'express';
import { Mentor } from '../models/mentor.js';

const router = express.Router();

// Get all mentors
router.get('/', async (request, response) => {
  try {
    const mentors = await Mentor.find({});
    return response.status(200).json({ mentors });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get a mentor by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const mentor = await Mentor.findById(id);
    return response.status(200).json({ mentor });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Add a mentor 
router.post('/', async (request, response) => {
  try {
    const newMentor = new Mentor(request.body);
    const savedMentor = await newMentor.save();
    return response.status(201).send(savedMentor);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Update a mentor (assuming you have request params for ID and request body for updated data)
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const updatedMentor = await Mentor.findByIdAndUpdate(id, request.body, {
      new: true, // Return the updated document
    });
    if (!updatedMentor) {
      return response.status(404).json({ message: 'Mentor Not Found' });
    }
    return response.status(200).send(updatedMentor);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete a mentor
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedMentor = await Mentor.findByIdAndDelete(id);
    if (!deletedMentor) {
      return response.status(404).json({ message: 'Mentor Not Found' });
    }
    return response.status(200).send({ message: 'Mentor Deleted Successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
