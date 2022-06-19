import moment from 'moment';
import { useRouter } from "next/router";
import {
    CalendarIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    PhotographIcon,
    XIcon,
} from "@heroicons/react/outline";
import { db } from "init-firebase";
import {
    onSnapshot,
    doc,
    addDoc,
    collection,
    serverTimestamp,
} from "@firebase/firestore";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "atoms/modalAtom";
import { useAuth } from 'contexts/AuthContext';

function Modal() {
    const { currentUser, photoURL } = useAuth();
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdState);
    const [post, setPost] = useState();
    const [comment, setComment] = useState("");
    const router = useRouter();
    const emailname = (post?.email || '').split('@');

    useEffect(() => {
        onSnapshot(doc(db, "posts", postId), (snapshot) => {
            setPost(snapshot.data());
            console.log(post)
        }),
            [db]
    });

    const sendComment = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "posts", postId, "comments"), {
            comment: comment,
            username: currentUser.displayName,
            email: currentUser.email,
            userImg: currentUser.photoURL,
            timestamp: serverTimestamp(),
        });
        setIsOpen(false);
        setComment("");

        router.push(`/${postId}`);
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
                <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="fixed inset-0 inline-block align-bottom bg-[#f8f8f8] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                            <div className="flex items-center px-1.5 py-2 border-b border-[#eee]">
                                <div
                                    className="w-9 h-9 flex items-center justify-center xl:px-0"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <XIcon className="h-[22px] text-[#2d2d2d]  cursor-pointer" />
                                </div>
                            </div>
                            <div className="flex  pb-2.5 sm:px-6">
                                <div className="w-full">
                                    <div className="text-[#6e767d] flex gap-x-3 relative">
                                        <div className="w-[200px] h-[50px] m-5 flex items-center justify-center">
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
                                    </div>
                                    <div className="m-5 mt-[10px]">
                                        {post?.text}
                                    </div>
                                    <div className="mt-7 flex space-x-3 w-full">
                                        <div className="flex-grow mt-2 px-5">
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="답글 남기기"
                                                rows="2"
                                                className="bg-white outline-none border border-l-[#eee] rounded-xl p-5 px-5 text-[#2d2d2d] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px] resize-none"
                                            />

                                            <div className="flex items-center justify-between pt-2.5 mb-4">
                                                <button
                                                    className="bg-[#ffa821] text-white rounded-xl px-4 py-1.5 font-bold shadow-md disabled:hover:bg-[#ffa821] disabled:opacity-50 disabled:cursor-default ml-[auto] mb-[10px]"
                                                    type="submit"
                                                    onClick={sendComment}
                                                    disabled={!comment.trim()}
                                                >
                                                    답장
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
export default Modal;