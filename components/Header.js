"use client";

import { useUserInfo } from "./hooks/useUserInfo";
import { useAuth } from "./components/AuthProvider";
import "./header.css";

export default function Header() {
  const { resetToken } = useAuth();
  const [userInfo] = useUserInfo();

  function handleLogout(e) {
    e.preventDefault();
    console.log("로그아웃 처리");
    resetToken();
  }

  return (
    <header className='page-header'>
      <h1>
        <a href='/'>프로젝트 관리 시스템</a>
        {console.log("Header:", userInfo)}
      </h1>
      <nav>
        <ul className='nav-links'>
          <li>
            <a href='/member'>회원</a>
          </li>
          <li>
            <a href='/board'>게시글</a>
          </li>
        </ul>
      </nav>
      {userInfo != null && (userInfo.no ? (
        <div className='login'>
          <span className='user-name'>{userInfo.name}</span>
          <a href='#' onClick={handleLogout}>로그아웃</a>
        </div>
        ) : (
        <div className='login'>
          <a href='/auth'>로그인</a>
        </div>
      ))}
    </header>
  );
}
