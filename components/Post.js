import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import moment from 'moment';
import {
    ChatIcon,
    HeartIcon,
    TrashIcon
} from "@heroicons/react/outline";
import {
    HeartIcon as HeartIconFilled,
    ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import {
    deleteDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
} from "firebase/firestore";
import { db } from 'init-firebase';
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "atoms/modalAtom";

const Post = ({ id, post, postPage }) => {
    const router = useRouter();
    const emailname = (post?.email || '').split('@');
    const { currentUser } = useAuth();
    const [likes, setLikes] = useState([]);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "posts", id, "comments"),
                    orderBy("timestamp", "asc")
                ),
                (snapshot) => setComments(snapshot.docs)
            ),
        [db, id]
    );

    useEffect(
        () =>
            onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
                setLikes(snapshot.docs)
            ),
        [db, id]
    );

    useEffect(
        () =>
            setLiked(
                currentUser ? likes.findIndex((like) => like.id === currentUser.uid) !== -1 : null
            ),
        [likes]
    );


    const likePost = async () => {
      if(currentUser){
        if (liked) {
            await deleteDoc(doc(db, "posts", id, "likes", currentUser.uid));
        } else {
            await setDoc(doc(db, "posts", id, "likes", currentUser.uid), {
                username: currentUser.email,
            });
        }
      }
    };

    return (
        <div className="mt-5 rounded-lg overflow-hidden last:mb-10 bg-[#fff] shadow-[0_-15px_60px_-15px_rgba(0,0,0,0.3)] shadow-gray-500/10 ">
            <div className=" w-full h-full ">
                <div className="flex w-[200px] h-[50px] m-10">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                        <img
                            src={post?.userImg ? post.userImg : 'https://o2hlounge.com/files/images/placeholder/avatar.png'}
                            alt="avater"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="pl-4 flex flex-col justify-center w-[150px]">
                        <h1 className="w-full font-bold text-sm">{post?.username ? post.username : emailname[0]}</h1>
                        <h1 className="opacity-60 font-bold text-[12px] -mt-[2px]">@ {emailname[0]}</h1>
                    </div>
                </div>
                <div
                    className={`${!postPage && "cursor-pointer"}`}
                    onClick={() => {
                        router.push(`/${id}`);
                    }}>
                    <img
                        src={post?.image}
                        alt=""
                        className={`${post?.image ? "w-full object-cover mt-5" : "hidden"}`}
                    />
                    <h2 className="mt-5 m-10">{post?.text}</h2>
                    <h3 className="text-[12px] opacity-80 mx-10 mb-4">{post?.timestamp ? moment(post?.timestamp.toDate()).format('YYYY/MM/DD') : null}</h3>
                </div>
                <div className="border-t px-10 py-5 flex ">
                    <div className="flex">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                likePost();
                            }}
                            className={`border border-[#e8eaed] bg-[#f9fafb] py-2 px-3 text-[11px] font-medium rounded-[10px] flex items-center cursor-default
                        ${currentUser && 'hover:bg-[#ffebcb] hover:text-[#fea61a] hover:border-[#ffebcb] cursor-pointer'}`}
                        >
                            {liked ? (
                                <span className="border-[#fff8ed] text-[#ffa821]">
                                    <HeartIconFilled width={13} height={13} className="mr-2" />
                                </span>
                            ) : (
                                <span className="">
                                    <HeartIcon width={13} height={13} className="mr-2" />
                                </span>
                            )}
                            <span className="flex">
                                {likes.length > 0 ? (
                                    <div className={` ${liked && "text-[#ffa821]"}`}>
                                        {likes.length}
                                    </div>
                                ) : (
                                    <>
                                        좋아요
                                    </>
                                )}
                            </span>
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setPostId(id);
                                setIsOpen(true);
                            }}
                            className={`${postPage ?
                                "overflow-hidden"
                                :
                                "border border-[#e8eaed] bg-[#f9fafb] py-2 px-3 rounded-[10px] ml-3 text-[11px] font-medium flex items-center hover:bg-[#ffebcb] hover:text-[#fea61a] hover:border-[#ffebcb]"
                                }`}
                        >
                            <ChatIcon width={13} height={13} className={`mr-2 ${postPage && 'opacity-0'}`} />
                            <span className="flex">
                                {comments.length > 0 ? (
                                    <>
                                        <div className={`${postPage && 'opacity-0'}`}>
                                            {comments.length}
                                        </div>
                                    </>
                                ) : (
                                    <div className={`${postPage && 'opacity-0'}`}>
                                        답글
                                    </div>
                                )}
                            </span>
                        </button>
                    </div>

                    {currentUser ? (currentUser.uid === post?.id ? (
                        <div className="ml-auto">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteDoc(doc(db, "posts", id));
                                    router.push("/");
                                }}
                                className="border border-[#e8eaed] bg-[#f9fafb] py-2 px-3 rounded-[10px] ml-3 text-[11px] font-medium flex items-center hover:bg-[#ffebcb] hover:text-[#fea61a] hover:border-[#ffebcb]">
                                <TrashIcon width={13} height={13} />
                            </button>
                        </div>
                    ) : null) : (null)}
                </div>
            </div>
        </div>
    )
}
export default Post;