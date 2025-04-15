"use client";

import { useUserInfo } from "common/hooks/useUserInfo";
import { useAuth } from "common/components/AuthProvider";
import "./header.css";
import { useRouter } from "next/navigation";

export default function Header() {
  const { resetToken } = useAuth();
  const [userInfo] = useUserInfo();
  const router = useRouter();

  function handleLogout(e) {
    e.preventDefault();
    console.log("로그아웃 처리");
    resetToken();
    router.push("http://NEXT_PUBLIC_AUTH_UI_URL:3010/");
  }

  return (
    <header className='page-header'>
      <h1>
        <a href='http://NEXT_PUBLIC_AUTH_UI_URL:3010/'>프로젝트 관리 시스템</a>
      </h1>
      <nav>
        <ul className='nav-links'>
          <li>
            <a href='http://NEXT_PUBLIC_AUTH_UI_URL:3010/members'>회원</a>
          </li>
          <li>
            <a href='http://NEXT_PUBLIC_BOARD_UI_URL:3020/boards'>게시글</a>
          </li>
        </ul>
      </nav>
      {userInfo != null &&
        (userInfo.no ? (
          <div className='login'>
            <span className='user-name'>{userInfo.name}</span>
            <a href='#' onClick={handleLogout}>
              로그아웃
            </a>
          </div>
        ) : (
          <div className='login'>
            <a href='http://NEXT_PUBLIC_AUTH_UI_URL:3010/auth'>로그인</a>
          </div>
        ))}
    </header>
  );
}
