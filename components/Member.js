import Input from './Input';
import Profile from "./Profile";
import { useAuth } from 'contexts/AuthContext'

const Member = () => {
    const { currentUser } = useAuth();
    return (
        <>
            {currentUser ? (
                <div className="max-w-screen-md m-auto w-full h-full px-4 pt-7">
                    <div className="bg-white rounded-lg overflow-hidden w-full h-full">
                        <Profile />
                        <Input />
                    </div>
                </div>
            ) : null}
        </>
    )
}
export default Member;