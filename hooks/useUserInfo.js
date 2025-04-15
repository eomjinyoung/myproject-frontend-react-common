"use client";

import { useEffect, useState } from "react";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const no = localStorage.getItem("no");
    if (!no) return;

    console.log("localStorage에서 사용자 정보 로딩");
    setUserInfo({
      no: localStorage.getItem("no"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    });

    // if (!token) {
    //   console.log(`토큰이 없어서 로그인 정보 초기화!`);
    //   localStorage.removeItem("no");
    //   localStorage.removeItem("name");
    //   localStorage.removeItem("email");
    //   Cookies.remove("jwt_token");
    //   return;
    // }
  });

  return [userInfo, setUserInfo];
};
