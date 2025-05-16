// src/pages/OAuthSuccess.jsx
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {navigateTo} from App.jsx
const OAuthSuccess = ({navigateTo}) => {
//   const navigate = useNavigate();

  useEffect(() => {
    console.log("OAuthSuccess component mounted ✅");
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    console.log(token)

    if (token!=null) {
      localStorage.setItem('token', token); // store the token
      navigateTo("chat"); // redirect to chat page
    } else {
      navigateTo('login'); // fallback if token missing
    }
  },[]);

  // return <p>Redirecting...</p>;
};

export default OAuthSuccess;
