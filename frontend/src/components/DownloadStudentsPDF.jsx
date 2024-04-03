import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DownloadStudentsPDF = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students data from backend
    axios.get('http://localhost:5555/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleDownloadPDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Define the columns for the table
    const columns = ['Name', 'Mentor ID', 'Ideation Marks', 'Execution Marks', 'Viva Marks', 'Email'];

    // Define an empty array to hold the data rows
    const data = [];

    // Push each student's data into the data array
    students.forEach(student => {
      const rowData = [
        student.student_name,
        student.mentor_id,
        student.ideation,
        student.execution,
        student.viva,
        student.email
      ];
      data.push(rowData);
    });

    // Set the table layout
    pdf.autoTable({
      head: [columns],
      body: data
    });

    // Save the PDF
    pdf.save('students.pdf');
  };

  return (
    <div>
      <button className= 'bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={handleDownloadPDF}>Download PDF</button>
    </div>
  );
};

export default DownloadStudentsPDF;
