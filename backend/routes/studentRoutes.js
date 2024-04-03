import express from 'express';
import { Student } from '../models/student.js';
import { Mentor } from '../models/mentor.js';

const router= express.Router();
 
// add a new student
router.post('/', async(request,response)=>{
    try{
        if(
            !request.body.student_name||
            !request.body.mentor_id
        ){
            return response.status(400).send({
                message:'Send all required fields: Student Name, StudentID, Mentor ID, email',
            });
        }
        const newStudent={
            student_name:request.body.student_name,
            mentor_id:request.body.mentor_id,
            ideation: request.body.ideation,
            execution: request.body.execution,
            viva: request.body.viva,
            email:request.body.email,
        };

        const student=await Student.create(newStudent);
        const updatedMentor = await Mentor.findOneAndUpdate(
            { mentor_id: request.body.mentor_id }, // Find the mentor with matching mentor_id
            { $push: { students: student._id } }, // Add the new student's _id to the students array
            { new: true } // Return the updated mentor document after the update
        );

        if (!updatedMentor) {
            return response.status(404).send({ message: 'Mentor not found' });
        }
        return response.status(201).send(student);
    } 
    catch{error}{
       console.log(error.message);
       response.status(500).send({message:error.message}); 
    }
});

//get all students
router.get('/',async(request,response)=>{
    try{
        const students=await Student.find({});
        return response.status(200).json({
            count:students.length,
            data:students
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message}); 
    }
});

//get 1 student by id
router.get('/:id',async(request,response)=>{
    try{
        const {id}=request.params;

        const student=await Student.findById(id);
        return response.status(200).json({student});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message}); 
    }
});

//update a student
router.put('/:id',async (request,response)=>{
    try{
        if(
            !request.body.student_name||
            !request.body.mentor_id
            
        ){
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        const {id}=request.params;
        const result=await Student.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message: 'Student Not Found'});
        }

        return response.status(200).send({message:'Student Updated Successfully'});
    }catch (error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//delete a student
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Find the student to be deleted
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return response.status(404).json({ message: 'Student Not Found' });
        }

        // Remove the student's ID from the corresponding mentor's students array
        const updatedMentor = await Mentor.findOneAndUpdate(
            { students: id }, // Find the mentor with the student's ID in the students array
            { $pull: { students: id } }, // Pull the student's ID from the students array
            { new: true } // Return the updated mentor document after the update
        );

        if (!updatedMentor) {
            return response.status(404).json({ message: 'Corresponding Mentor Not Found' });
        }

        return response.status(200).json({ message: 'Student Deleted Successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;

