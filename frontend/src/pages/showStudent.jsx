import React, {useEffect,useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const showStudent = () => {
    const [students, setStudents] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
  
    useEffect(() => {
      setLoading(true);
      axios
        .get(`https://student-evaluation-system-backendserver.vercel.app/students/${id}`)
        .then((response) => {
          setStudents(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }, []);
  
    return (
      <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl my-4'>Show Student</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Id</span>
              <span>{students.student_id}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Name</span>
              <span>{students.student_name}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Ideation Marks</span>
              <span>{students.ideation}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Execution Marks </span>
              <span>{students.execution}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Viva Marks </span>
              <span>{students.viva}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Create Time</span>
              <span>{new Date(students.createdAt).toString()}</span>
            </div>
            <div className='my-4'>
              <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
              <span>{new Date(students.updatedAt).toString()}</span>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default showStudent;