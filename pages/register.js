import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";


const register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const { register, currentUser } = useAuth();
    console.log(currentUser)
    const [msg, setMsg] = useState('');
    const router = useRouter();

    return (
        <div>
            <form onSubmit={async e => {
               e.preventDefault();
               try {
                   await register(email, password)
               }catch(err){
                   console.log(err)
               }
            }}>
                <input
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="아이디"
                />
                <input
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    type="password"
                    autoComplete="password"
                    placeholder="비밀번호"
                />
                <button type="submit">회원 가입 완료</button>
            </form>
        </div>
    )
}
export default register;