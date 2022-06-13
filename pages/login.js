import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <form
        className="flex flex-col"
        onSubmit={async e => {
          try {
            await login(email, password)
          } catch (err) {
            console.log(err)
          }
        }}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="아이디"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          autoComplete="password"
          placeholder="비밀번호"
        />
        <button type="submit">로그인</button>
        <Link href="/register"><a><button type="button">회원가입</button></a></Link>
      </form>
    </div>
  )
}
export default Login;