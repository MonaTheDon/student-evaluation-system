import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateStudent = () => {
    const [student_name, setName] = useState('');
    const [mentor_id, setMentorID] = useState(''); // Use selected mentor ID
    const [ideation, setIdeation] = useState('');
    const [viva, setViva] = useState('');
    const [execution, setExecution] = useState('');
    const [email, setEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
  
    // Create a mapping object for mentor_id to _id
    const mentorMap = {
      "M001": "660d6357592a06e4eaa8e5da",
      "M002": "660d6358592a06e4eaa8e5dd"
    };
  
    const handleSaveStudent = () => {
      // Check if mentor_id is provided
      if (!mentor_id) {
        enqueueSnackbar('Please select a mentor.', { variant: 'error' });
        return;
      }
  
      // Get mapped _id from selected mentor ID
      const mappedMentorID = mentorMap[mentor_id];
  
      // Check if the mentor has already 4 students
      axios.get(`https://student-evaluation-system-backendserver.vercel.app/mentors/${mappedMentorID}`) // Use mapped _id here
        .then(response => {
            console.log('Mentor Data:', response.data);
            const mentorStudents = response.data.students;
            if (mentorStudents && mentorStudents.length >= 4) {
            enqueueSnackbar('A mentor can only accommodate a maximum of 4 students.', { variant: 'error' });
          } else {
            const data = {
              student_name,
              mentor_id, // Use selected mentor ID here
              ideation,
              viva,
              execution,
              email
            };
            setLoading(true);
            const jsonData = JSON.stringify(data);
            axios.post('https://student-evaluation-system-backendserver.vercel.app/students', jsonData, {
              headers: { 'Content-Type': 'application/json' }
            })
              .then(() => {
                setLoading(false);
                enqueueSnackbar('Student Created successfully', { variant: 'success' });
                navigate('/');
              })
              .catch((error) => {
                setLoading(false);
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
              });
          }
        })
        .catch(error => {
            enqueueSnackbar('Error fetching mentor data: ' + error.message, { variant: 'error' });
            console.error(error);
        });
    };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Add Student</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Name</label>
          <input
            type='text'
            value={student_name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Mentor</label>
          <select
            value={mentor_id}
            onChange={(e) => setMentorID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          >
            <option value="">Select Mentor</option>
            <option value="M001">M001</option>
            <option value="M002">M002</option>
          </select>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Ideation Marks</label>
          <input
            type='number'
            value={ideation}
            onChange={(e) => setIdeation(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Execution Marks</label>
          <input
            type='number'
            value={execution}
            onChange={(e) => setExecution(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Viva Marks</label>
          <input
            type='number'
            value={viva}
            onChange={(e) => setViva(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Email Address</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveStudent}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateStudent;
