import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from 'next/image';
import logo from 'components/image/orange.png';
import {
    ChevronLeftIcon
  } from '@heroicons/react/outline';


const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const { register, currentUser } = useAuth();
    console.log(currentUser)
    const [msg, setMsg] = useState('');
    const router = useRouter();

    return (
        <div className="w-full h-screen flex bg-[#fff]">
            <div className="flex flex-col items-center justify-center w-full relative">
            <button className="absolute left-10 top-8" onClick={()=>router.push('/login')}>
          <ChevronLeftIcon width={15} height={15}/>
        </button>
            <h1 className="bg-[#fff] rounded-2xl text-2xl font-semibold px-6 py-3 inline-block">
              <Image src={logo} width={15} height={15} />
              <span className="logofonts font-black ml-4 mt-1">OHily</span>
            </h1>
            <form onSubmit={async e => {
               e.preventDefault();
               register(email,password)
               .then((response) => {
                router.push('/');
            })
            .catch((error) => console.log(error))
            }}
            className="flex flex-col mt-2">
                <input
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="아이디"
                    className="border px-5 py-3 w-[300px]"
                />
                <input
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type="password"
                    autoComplete="password"
                    placeholder="비밀번호"
                    className="border px-5 py-3 w-[300px] mt-1"
                />
                <button type="submit" className="order px-5 py-4 w-[300px] mt-2 border-[#ffc057] text-sm bg-[#ffc057] text-[#fff] font-bold">회원 가입 완료</button>
            </form>
            </div>
        </div>
    )
}
export default Register;