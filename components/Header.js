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
import Menu from './Menu';


const Header = () => {
    const router = useRouter();
    const { logout, currentUser, photoURL } = useAuth();
    const [scrollActive, setScrollActive] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [openMenu, setOpenMenu] = useState(false);

    const toggleMenu = () => {
        setOpenMenu(openMenu => !openMenu);
    }

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
                router.pathname === '/login' || router.pathname === '/register' ? null : (
                    <div className="bg-white h-[6.5vh] w-full flex items-center shadow-2xl shadow-gray-500/10 relative z-1">
                        <div className={`${scrollActive ? 'bg-white border-b-[#eee] border fixed w-full z-10 opacity-90 text-[#090909] ' : 'w-full z-10 opacity-90 text-[#090909]'}`}>
                            <ScrollToTop />
                            <div className="fixwidth">
                                <div className="flex items-center h-full w-full">
                                    <div onClick={() => router.push('/')}
                                        className="w-11/12 flex items-center h-full cursor-pointer">
                                        <Image src={logo} width={15} height={15} alt="logo" object/>
                                        <h1 className="logofonts font-black ml-4 mt-1">OHily</h1>
                                    </div>
                                    <div className="w-1/12 flex items-center h-full justify-end cursor-pointer relative">
                                        {currentUser ? (
                                            <div className="w-[30px] h-[30px] overflow-hidden rounded-full">
                                                <img src={photoURL}
                                                    width={30}
                                                    height={30}
                                                    alt="사용자"
                                                    onClick={() => toggleMenu()}
                                                />
                                                <div className={`${openMenu ? 'w-[94px] absolute top-[50px] left-[0px] py-2 px-5 rounded-full border bg-[#fff] ease-out duration-300 font-semibold text-sm visible' : 'invisible w-[94px] absolute top-[50px] opacity-0 left-[0px] py-2 px-5 rounded-full border bg-[#fff] ease-out duration-300 font-semibold text-sm'}`}>
                                                    <Menu />
                                                </div>
                                            </div>
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