import { useAppDispatch } from '@s/store';
import { logoutUser } from '@s/userSlice';
import { Link } from 'react-router-dom';



export default function Sidebar() {
  const dispatch = useAppDispatch();
  function logoutUserrrr() {
    console.log('user logged out')
    dispatch(logoutUser())
  }
  const items = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'TeamView', to: '/team-preview' },
    { label: 'Student Management', to: '/student-management' },
    { label: 'Summary View', to: '/summary' },
    { label: 'Detailed View', to: '/detailed' },
    { label: 'General Settings', to: '/settings' },
    {
      label: 'Switch Account',
      to: '/welcome',
      onClick: () => logoutUserrrr()
    },
    {
      label: 'Logout',
      to: '/welcome',
      onClick: () => logoutUserrrr()
    },
  ];
  return (
    <div className="w-64 bg-background text-white h-screen p-6">
      <h1 className="text-2xl font-semibold mb-10">Monaco Peer Assessment</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-4">
            <Link
              to={item.to}
              onClick={item.onClick}
              className="block px-4 py-2 text-white hover:bg-gray-300 hover:text-black rounded transition duration-200 cursor-pointer"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

