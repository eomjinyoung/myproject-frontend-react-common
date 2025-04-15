"use client";

import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    console.log(`토큰 값(${token}) 변경 됨!`);

    if (!token) {
      console.log(`토큰 값이 없어서 로그인 정보 초기화!`);
      localStorage.removeItem("no");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      Cookies.remove("jwt_token");
      return;
    }

    console.log(`토큰(${token})이 있어서 로그인 사용자 정보를 요청!`);
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_AUTH_REST_API_URL}/auth/user-info`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            Cookies.remove("jwt_token");
            throw new Error("토큰 만료됨");
          } else {
            throw new Error("사용자 정보 요청 실패");
          }
        }
        const result = await response.json();
        if (result.status !== "success") {
          throw new Error("사용자 정보 로딩 실패!");
        }

        console.log("사용자 정보 가져옴! - localStorage 보관");
        // 로그인 사용자 기본 정보 저장
        localStorage.setItem("no", result.data.no);
        localStorage.setItem("name", result.data.name);
        localStorage.setItem("email", result.data.email);

        console.log("JWT 토큰을 쿠키에 저장");
        Cookies.set("jwt_token", token, {
          path: "/",
          domain: "localhost",
          sameSite: "None",
          secure: true,
        });
      } catch (error) {
        console.log("요청 오류:" + error.message);
      }
    };
    fetchUserInfo();
  }, [token]);

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
