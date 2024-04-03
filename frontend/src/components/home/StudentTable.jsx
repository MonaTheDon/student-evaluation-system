import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const StudentTable = ({ students }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Name</th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Mentor ID
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Ideation Marks
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Viva Marks
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Execution Marks
          </th>
          <th className='border border-slate-600 rounded-md max-md:hidden'>
            Total Marks
          </th>
          <th className='border border-slate-600 rounded-md'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {students.map((students, index) => (
          <tr key={students._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {students.student_name}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {students.mentor_id}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {students.ideation}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {students.viva}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {students.execution}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {students.ideation + students.viva + students.execution}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/students/details/${students._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/students/edit/${students._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/students/delete/${students._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;