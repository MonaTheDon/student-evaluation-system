import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const editStudent = () => {
  const [student_name, setName] = useState('');
  const [mentor_id, setMentorID] = useState('');
  const [ideation, setIdeation] = useState('');
  const [viva, setViva] = useState('');
  const [execution, setExecution] = useState('');
  const [email, setEmail] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`https://student-evaluation-system-backendserver.vercel.app/students/${id}`)
    .then((response) => {
        setName(response.data.student_name)
        setMentorID(response.data.mentor_id);
        setIdeation(response.data.ideation)
        setViva(response.data.viva);
        setExecution(response.data.execution)
        setEmail(response.data.email)
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [])


  const handleEditStudent = () => {
    const data = {
      student_name,
      mentor_id,
      ideation,
      viva,
      execution,
      email
    };
    setLoading(true);
    const jsonData = JSON.stringify(data);
    console.log(jsonData);
    axios
      .put(`https://student-evaluation-system-backendserver.vercel.app/students/${id}`, jsonData,{
        headers: { 'Content-Type': 'application/json' }})
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Student edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Check console');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Student details</h1>
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
          <label className='text-xl mr-4 text-gray-500'>MentorID</label>
          <input
            type='text'
            value={mentor_id}
            onChange={(e) => setMentorID(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
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
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditStudent}>
          Save
        </button>
      </div>
    </div>
  );
}

export default editStudent;