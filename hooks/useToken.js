"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useToken = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    if (!token) return;

    console.log(`토큰 값이 변경 됨!`);

    console.log(`로그인 사용자 정보를 요청!`);
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
      } catch (error) {
        console.log("요청 오류:" + error.message);
      }
    };
    fetchUserInfo();
  }, [token]);

  return [token, setToken];
};
