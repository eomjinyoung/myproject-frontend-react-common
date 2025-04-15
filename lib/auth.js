import { cookies } from "next/headers";

export async function getUserFromServer() {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt_token")?.value;

  if (!token) return null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_REST_API_URL}/auth/user-info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // // 중요: 쿠키 포함해서 SSR fetch
      // credentials: 'include',
      // cache: 'no-store',
    });

    if (!response.ok) return null;

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("사용자 정보 요청 오류:", error);
    return null;
  }
}
