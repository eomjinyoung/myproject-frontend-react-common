"use client";

import { useEffect, useState } from "react";
import { useAuth } from "common/components/AuthProvider";
import Cookies from "js-cookie";

export const useUserInfo = () => {
  console.log("useUserInfo() 호출됨");
  const { token, setToken } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log(`토큰 값이 변경 됨!`);

    if (!token) {
      console.log(`토큰이 없어서 로그인 정보 초기화!`);
      localStorage.removeItem("no");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      Cookies.remove("jwt_token");
      return;
    }

    console.log(`토큰이 있어서 로그인 사용자 정보를 요청!`);
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

        const user = result.data;

        console.log("사용자 정보 가져옴! - localStorage 보관");
        // 로그인 사용자 기본 정보 저장
        localStorage.setItem("no", user.no);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);

        console.log("JWT 토큰을 쿠키에 저장");
        Cookies.set("jwt_token", token, {
          path: "/",
          domain: "localhost",
          sameSite: "None",
          secure: true,
        });

        console.log("setUserInf()를 호출하여 사용자 정보를 저장!");
        setUserInfo(user);
      } catch (error) {
        console.log("요청 오류:" + error.message);
      }
    };
    fetchUserInfo();
  }, [token]);
  /*
  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    console.log(`useUserInfo()/useEffet()/1: ${jwtToken}`);
    if (jwtToken) {
      setToken(jwtToken);
    } else {
      setToken(null);
    }
  });

  useEffect(() => {
    console.log("useUserInfo()/useEffect()/2: 호출됨");
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
*/
  return [userInfo];
};
