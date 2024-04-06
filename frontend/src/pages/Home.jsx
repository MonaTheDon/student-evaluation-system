import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import StudentTable from '../components/home/StudentTable';
import StudentCard from '../components/home/StudentCard';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DownloadPDF from '../components/DownloadPDF';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [filter, setFilter] = useState('all'); // Add a state for filter
  const [lockMarks, setLockMarks] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://student-evaluation-system-backendserver.vercel.app/students`)
      .then((response) => {
        setStudents(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleLockMarks = () => {
    setLockMarks(!lockMarks);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredStudents = students.filter((student) => {
    // Filter logic based on selected filter
    if (filter === 'marksAssigned') {
      return student.ideation > 0 && student.viva > 0 && student.execution > 0;
    } else if (filter === 'marksNotAssigned') {
      return student.ideation === 0 || student.viva === 0 || student.execution === 0;
    } else {
      return true; // Show all students if no specific filter is selected
    }
  });

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
        <DownloadPDF />
        <button
          className='bg-yellow-300 hover:bg-yellow-600 px-4 py-1 rounded-lg' 
          onClick={toggleLockMarks} 
        >
          {lockMarks ? 'Unlock Marks' : 'Lock Marks'} 
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Students List</h1>
        <div className='flex items-center gap-x-4'>
          <Link to='/students/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
          <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="all">All Students</option>
            <option value="marksAssigned">Marks Assigned</option>
            <option value="marksNotAssigned">Marks Not Assigned</option>
          </select>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <StudentTable students={filteredStudents} />
      ) : (
        <StudentCard students={filteredStudents} />
      )}
    </div>
  );
};

export default Home;
