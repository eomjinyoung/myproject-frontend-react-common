"use client";

import "./header.css";
import Cookies from "js-cookie";

export default function Header({ user }) {
  const no = localStorage.getItem("no");
  console.log(typeof user.no, typeof no);
  if (user) {
    console.log("사용자 정보를 localStorage 에 보관 했음!");
    localStorage.setItem("no", user.no);
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
  }

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
      {user ? (
        <div className='login'>
          <span className='user-name'>{user.name}</span>
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
