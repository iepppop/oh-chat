import { useAuth } from 'contexts/AuthContext';
import { useRouter } from "next/router";


const Menu = () => {
    const router = useRouter();
    const { logout } = useAuth();
  return (
    <div onClick={async e => {
        e.preventDefault();
        logout();
        router.push('/');;
    }}
    >로그아웃
    </div>
  )
}
export default Menu;