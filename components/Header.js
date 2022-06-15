import Image from 'next/image';
import logo from 'components/image/orange.png';
import {
    MenuIcon,
    BookmarkIcon,
} from '@heroicons/react/outline';

const Header = () => {
    return (
        <div className="bg-white h-[62px] w-full border flex items-center border-b-[#eee]">
            <div className="fixwidth">
                <div className="flex items-center h-full w-full">
                    <div className="w-11/12 flex items-center h-full">
                    <Image src={logo} width={15} height={15} alt="logo"/>
                    <h1 className="logofonts font-black ml-4 mt-1">OHCHAT</h1>
                    </div>
                    <div className="w-1/12 flex items-center h-full justify-end">
                        <MenuIcon width={15} height={15}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Header;