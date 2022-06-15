import Input from './Input';
import Profile from "./Profile";

const Member = () => {
    return (
        <div className="fixwidth">
            <div className="bg-white rounded-lg overflow-hidden w-full h-full">
                <Profile />
                <Input />
            </div>
        </div>
    )
}
export default Member;