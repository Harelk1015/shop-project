import Login from '../../components/login/Login';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

const LoginPage = () => {
  return <Login></Login>;
};

export default LoginPage;
