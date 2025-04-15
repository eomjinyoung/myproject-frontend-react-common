"use client";

import { useState, useEffect } from "react";
import { useUserInfo } from "../hooks/useUserInfo";
import "./header.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Header() {
  const [userInfo] = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    console.log("Header 컴포넌트 랜더링!");
  }, []);

  function handleLogout(e) {
    e.preventDefault();
    console.log("로그아웃 처리");

    localStorage.removeItem("no");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    Cookies.remove("jwt_token");

    window.location.href = `${process.env.NEXT_PUBLIC_AUTH_UI_URL}/`;
  }

  return (
    <header className='page-header'>
      <h1>
        <a href={`${process.env.NEXT_PUBLIC_AUTH_UI_URL}/`}>프로젝트 관리 시스템</a>
      </h1>
      <nav>
        <ul className='nav-links'>
          <li>
            <a href={`${process.env.NEXT_PUBLIC_AUTH_UI_URL}/members`}>회원</a>
          </li>
          <li>
            <a href={`${process.env.NEXT_PUBLIC_BOARD_UI_URL}/boards`}>게시글</a>
          </li>
        </ul>
      </nav>
      {userInfo ? (
        <div className='login'>
          <span className='user-name'>{userInfo.name}</span>
          <a href='#' onClick={handleLogout}>
            로그아웃
          </a>
        </div>
      ) : (
        <div className='login'>
          <a href={`${process.env.NEXT_PUBLIC_AUTH_UI_URL}/auth`}>로그인</a>
        </div>
      )}
    </header>
  );
}
