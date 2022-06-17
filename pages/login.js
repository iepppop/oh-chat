import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import oil from 'components/image/oil.png';
import Image from 'next/image';
import logo from 'components/image/orange.png';
import {
  ChevronLeftIcon
} from '@heroicons/react/outline';
import google from 'components/image/google.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signInWithGoogle, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="w-full h-screen flex bg-[#fff]">
      <div className="w-[35%] h-full bg-[#ffc057] relative overflow-hidden">
      <div className="absolute -bottom-2">
        <Image src={oil} fill="fixed"/>
        </div>
        <div className="p-[50px] flex flex-col w-full">
          <h5 className="text-[12px] font-semibold mb-2">오일리</h5>
          <div className="">
            <h1 className="bg-[#fff] rounded-2xl text-2xl font-semibold px-6 py-3 inline-block">오늘 뭐 해?</h1>
          </div>
          <div className="text-right">
            <h1 className="bg-[#fff] rounded-2xl text-2xl font-semibold px-6 py-3 inline-block mb-3">ㅋㅋ 게임 중</h1>
          </div>
          <div className="text-right">
            <h1 className="bg-[#fff] rounded-2xl text-2xl font-semibold px-6 py-3 inline-block mb-3">내 손안의 간편한 일상 공유</h1>
          </div>
          <div className="text-right">
            <h1 className="bg-[#fff] rounded-2xl text-2xl font-semibold px-6 py-3 inline-block">
              <Image src={logo} width={15} height={15} />
              <span className="logofonts font-black ml-4 mt-1">OHily</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-[65%] relative">
        <button className="absolute left-10 top-8" onClick={()=>router.back()}>
          <ChevronLeftIcon width={15} height={15}/>
        </button>
        <h1 className="font-bold mb-1">오일리 로그인</h1>
        <h2 className="mb-10 text-[12px]">당신의 일상을 남겨주세요</h2>
        <form
          className="flex flex-col"
          onSubmit={async e => {
            e.preventDefault();
            login(email, password)
                .then((response) => {
                    router.push('/');
                })
                .catch((error) => console.log(error))
        }}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="아이디"
            className="border px-5 py-3 w-[300px]"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            autoComplete="password"
            placeholder="비밀번호"
            className="border px-5 py-3 w-[300px] mt-1"
          />
          <button
            type="submit"
            className="border px-5 py-4 w-[300px] mt-2 border-[#ffc057] text-sm bg-[#ffc057] text-[#fff] font-bold"
          >로그인 하기
          </button>
          <button
            type="submit"
            onClick={() =>
              signInWithGoogle()
              .then((response) => {
                router.push('/');
            })
            .catch((error) => console.log(error))
              }
            className="flex justify-center border px-5 py-4 w-[300px] mt-2 bg-[#f8f8f8] text-sm font-bold"
          > <span className="mr-2 flex items-center h-full">
            <Image src={google} width={15} height={15}/>
           </span>
           구글로 로그인
          </button>
          <div className="w-[300px] text-right mt-3">
            <span className="text-[13px] mr-3 text-[#ababab]">아직 회원이 아니세요?</span>
            <Link href="/register">
              <a><button type="button" className="text-[13px] font-semibold text-[#424242]">
                회원가입
              </button></a>
            </Link>
          </div>
        </form>
      </div>
      <div className="fixed w-[100px] h-[50px] right-1 bottom-0 ">
        <h1 className="logofonts font-black ml-4 mt-1 inline-block" onClick={()=> router.push('/')}>OHily</h1>
        <div onClick={async e => {
                                            e.preventDefault();
                                            logout();
                                            router.push('/');;
                                        }}
                                        >로그아웃</div>
      </div>
    </div>
  )
}
export default Login;