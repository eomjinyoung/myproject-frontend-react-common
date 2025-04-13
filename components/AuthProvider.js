"use client";

import { createContext, useState, useContext, useCallback } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [value, setValue] = useState();

  const setToken = useCallback((token) => {
    console.log("setToken() 호출됨!");
    
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:8010/auth/user-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('사용자 정보 요청 실패!');
        }
        const result = await response.json();
        if (result.status !== 'success') {
          throw new Error('사용자 정보 로딩 실패!');
        }

        // 로그인 사용자 기본 정보 저장
        localStorage.setItem("no", result.data.no);
        localStorage.setItem("name", result.data.name);
        localStorage.setItem("email", result.data.email);

        // JWT 토큰을 쿠키에 저장
        Cookies.set("jwt_token", token, {
          path: "/",
          domain: "localhost",
          sameSite: "None",
          secure: true,
        });
    
        // 토큰 값을 업데이트
        setValue(token);

      } catch (error) {
        setError('요청 오류:' + error.message);
      }
    };
    fetchUserInfo();
  }, []);

  const resetToken = useCallback(() => {
    localStorage.removeItem("no");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    Cookies.remove("jwt_token");
    setValue(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token: value, setToken, resetToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};