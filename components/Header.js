import Image from 'next/image';
import logo from 'components/image/orange.png';
import {
    MenuIcon,
    BookmarkIcon,
    LoginIcon
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import ScrollToTop from './ScrollToTop';
import { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';


const Header = () => {
    const router = useRouter();
    const { logout, currentUser, photoURL } = useAuth();
    const [scrollActive, setScrollActive] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const HandleScroll = () => {
        if (scrollY > 299) {
            setScrollY(window.pageYOffset);
            setScrollActive(true);
        } else {
            setScrollY(window.pageYOffset);
            setScrollActive(false);
        }
    }

    useEffect(() => {
        const ScrollListener = () => {
            window.addEventListener("scroll", HandleScroll);
        }
        ScrollListener();
        return () => {
            window.removeEventListener("scroll", HandleScroll)
        }
    })

    return (
        <>
            {
                router.pathname === '/login' ? null : (
                    <div className="bg-white h-[6.5vh] w-full border flex items-center border-b-[#eee]">

                        <div className={`${scrollActive ? 'bg-white border-b-[#eee] border fixed w-full z-10 opacity-90 text-[#090909] ' : 'w-full z-10 opacity-90 text-[#090909]'}`}>
                            <ScrollToTop />
                            <div className="fixwidth">
                                <div className="flex items-center h-full w-full">
                                    <div onClick={() => router.push('/')}
                                        className="w-11/12 flex items-center h-full cursor-pointer">
                                        <Image src={logo} width={15} height={15} alt="logo" />
                                        <h1 className="logofonts font-black ml-4 mt-1">OHily</h1>
                                    </div>
                                    <div className="w-1/12 flex items-center h-full justify-end cursor-pointer">
                                      {currentUser ? (
                                          <>
                                          <img src={photoURL} width={30} height={30} alt="사용자" className="rounded-full"/>
                                          </>
                                      )
                                      :
                                      (
                                          <>
                                            <LoginIcon
                                            width={15}
                                            height={15}
                                            onClick={() => router.push('/login')}
                                            className={`${router.pathname === '/login' ? 'invisible' : 'visible'}`} />
                                          </>
                                      )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
        </>
    )
}
export default Header;