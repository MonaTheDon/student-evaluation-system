import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DownloadPDF = () => {
  const handleDownloadPDF = () => {
    axios.get('https://student-evaluation-system-backendserver.vercel.app/students') // Replace with your actual API endpoint
      .then(response => {
        console.log('API Response:', response.data);
        const students = response.data.data;
        // Generate PDF
        const doc = new jsPDF();
        let yPos = 10;
        students.forEach((student, index) => {
          const { student_name, ideation, execution, viva } = student;
          doc.text(10, yPos, `Student Name: ${student_name}`);
          doc.text(10, yPos + 10, `Ideation Marks: ${ideation}`);
          doc.text(10, yPos + 20, `Execution Marks: ${execution}`);
          doc.text(10, yPos + 30, `Viva Marks: ${viva}`);
          yPos += 40;
          if (index !== students.length - 1) {
            doc.addPage();
          }
        });
        // Save PDF
        doc.save('marksheets.pdf');
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
        // Handle error
      });
  };

  return (
    <button 
    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
    onClick={handleDownloadPDF}>Download PDF</button>
  );
};

export default DownloadPDF;
