"use client";

import { useEffect, useState } from 'react';
import { useAuth } from 'common/components/AuthProvider';
import Cookies from 'js-cookie';

export const useUserInfo = () => {
  console.log('useUserInfo() 호출됨');
  const { token, setToken } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setToken(Cookies.get("jwt_token"));
  });

  useEffect(() => {
    console.log("useUserInfo()/useEffect 호출됨");
    const no = localStorage.getItem("no");
    if (no) {
      setUserInfo({
        no: localStorage.getItem("no"),
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
      });
    } else {
      setUserInfo({});
    }
  }, [token]);

  return [userInfo];
};