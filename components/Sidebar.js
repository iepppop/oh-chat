import { HomeIcon } from '@heroicons/react/solid';
import {
    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    UserIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
    CogIcon,
} from '@heroicons/react/outline';
import SidebarLink from './SidebarLink';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
            <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
            logo
            </div>
                <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
            <SidebarLink text="홈" Icon={HomeIcon}  active={true}/>
            <Link href="/login">
                <a><SidebarLink text="로그인" Icon={CogIcon}/></a>
            </Link>
            </div>
        </div>
    )
}
export default Sidebar;