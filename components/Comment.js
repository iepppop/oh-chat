import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
} from "@heroicons/react/outline";

const Comment = ({ comment }) => {
    const emailname = (comment?.email || '').split('@');
    return (
        <div className="mt-5 bg-white p-10 rounded-xl">
           <div className="flex w-[200px] h-[50px]">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img
                            src={comment?.userImg ? comment.userImg : 'https://o2hlounge.com/files/images/placeholder/avatar.png'}
                            alt="avater"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="pl-4 flex flex-col justify-center w-[150px]">
                        <h1 className="w-full font-bold text-sm">{comment?.username ? comment.username : emailname[0]}</h1>
                        <h1 className="opacity-60 font-bold text-[12px] -mt-[2px]">@ {emailname[0]}</h1>
                    </div>
                </div>
        <div className="pt-5">{comment?.comment}</div>
        </div>
    )
}
export default Comment;