import './sidebar.css';

import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ChatIcon from '@mui/icons-material/Chat';

import { useContext } from 'react';
const Sidebar = () => {
  const { dispatch } = useContext(AuthContext);
  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <div className='sidebar'>
      <div className='center'>
        <ul>
          <p className='title'>MAIN</p>
          <li>
            <DashboardIcon className='icon' />
            <span>Dashboard</span>
          </li>
          <li>
            <Link to='/messenger'>
              <ChatIcon className='icon' />
              <span>Chats</span>
            </Link>
          </li>
          <li>
            <ExitToAppIcon className='icon' />
            <span onClick={logoutHandler}>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
