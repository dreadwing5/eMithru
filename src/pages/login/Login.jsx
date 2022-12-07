import './login.css';

import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';

export default function Login() {
  const userId = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ userID: userId.current.value }, dispatch);
  };
  return (
    <div className='login'>
      <form className='loginBox' onSubmit={handleClick}>
        <input
          placeholder='User ID'
          required
          className='loginInput'
          ref={userId}
        />
        <button className='loginButton' type='submit' disabled={isFetching}>
          {isFetching ? <CircularProgress /> : 'Log In'}
        </button>
      </form>
    </div>
  );
}
