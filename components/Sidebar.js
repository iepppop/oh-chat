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
        <div className="">
            <div className="">
            logo
            </div>
                <div className="">
            <SidebarLink text="홈" Icon={HomeIcon}  active={true}/>
            <Link href="/login">
                <a><SidebarLink text="로그인" Icon={CogIcon}/></a>
            </Link>
            </div>
        </div>
    )
}
export default Sidebar;