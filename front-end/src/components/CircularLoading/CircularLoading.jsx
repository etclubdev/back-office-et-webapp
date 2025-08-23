import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import { Error } from '../Error';
import './CircularLoading.css';

export const CircularLoading = () => {
  // const [hasTimedOut, setHasTimedOut] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setHasTimedOut(true);
  //   }, 10000); // 10 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  // if (hasTimedOut) {
  //   return <Error />
  // }

  return (
    <div className="loading-container">
      <Box>
        <CircularProgress size="6rem" />
      </Box>
    </div>
  );
};