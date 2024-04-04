import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteStudent = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch the mentor associated with the student being deleted
    axios.get(`https://student-evaluation-system-backendserver-3gnyr4l24.vercel.app/students/${id}`)
      .then(response => {
        const mentorId = response.data.mentor_id;
        // Check if deleting the student would leave the mentor with less than 3 students
        axios.get(`https://student-evaluation-system-backendserver-3gnyr4l24.vercel.app/mentors/${mentorId}`)
          .then(mentorResponse => {
            const mentorStudents = mentorResponse.data.students;
            if (mentorStudents && mentorStudents.length <=3) {
              enqueueSnackbar('A mentor must have at least 3 students. Cannot delete the student.', { variant: 'error' });
              navigate('/');
            }
          })
          .catch(error => {
            enqueueSnackbar('Error fetching mentor data: ' + error.message, { variant: 'error' });
            console.error(error);
          });
      })
      .catch(error => {
        enqueueSnackbar('Error fetching student data: ' + error.message, { variant: 'error' });
        console.error(error);
      });
  }, [id, enqueueSnackbar, navigate]);

  const handleDeleteStudent = () => {
    setLoading(true);
    axios
      .delete(`https://student-evaluation-system-backendserver-3gnyr4l24.vercel.app/students/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Student Record Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error deleting student: ' + error.message, { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Student</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete the record of this student?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteStudent}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteStudent;
