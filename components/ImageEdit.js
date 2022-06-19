import { useRecoilState } from "recoil";
import { ImgEditState } from "atoms/modalAtom";
import { useAuth } from "contexts/AuthContext";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, useRef } from "react";
import {
    CheckIcon,
    CameraIcon,
} from '@heroicons/react/solid';

const ImageEdit = () => {
    const [imgMoadal, setImgMoadal] = useRecoilState(ImgEditState);
    const { currentUser, upload, photoURL } = useAuth();
    const imageInput = useRef();
    const emailname = (currentUser?.email || '').split('@');
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [isHovering, setIsHovering] = useState(false);

    const onCickImageUpload = () => {
        imageInput.current.click();
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }

    const handleClick = () => {
        upload(photo, currentUser, setLoading);
        setImgMoadal(false);
    }

    function closeModal() {
        setImgMoadal(false);
    }

    function openModal() {
        setImgMoadal(true);
    }


    // z-50 inset-0
    return (
        <Transition appear show={imgMoadal} as={Fragment}>
            <Dialog as="div" className="w-full h-full fixed inset-0" onClose={closeModal} >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel>
                                <div className="">
                                    <div className="">
                                        <div className="bg-[#fff] rounded-xl p-6">
                                            <div className="flex items-center justify-center">
                                                <div className="">
                                                    <input type="file" style={{ display: "none" }} onChange={handleChange} ref={imageInput} />
                                                    <div
                                                        className="w-[140px] h-[140px] rounded-full overflow-hidden bg-white relative -z-100 cursor-pointer"
                                                        onMouseEnter={() => setIsHovering(true)}
                                                        onMouseLeave={() => setIsHovering(false)}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setImgMoadal(true);
                                                        }}>
                                                        <img
                                                            src={photoURL}
                                                            alt='avatar'
                                                            className="h-full w-full object-cover p-1 rounded-full cursor-pointer"
                                                         
                                                        />
                                                        {isHovering && (
                                                            <div className="w-full h-full bg-black/10 absolute top-0 left-0 -z-100"    onClick={onCickImageUpload}>
                                                                <div className="absolute -z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                                    <CameraIcon width={15} height={15} className="text-white opaity-10" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="m-3 pl-4">
                                                    <h1 className="font-bold text-sm inline-block">{currentUser.displayName ? currentUser.displayName : emailname[0]}</h1>
                                                    <div className="inline-block w-[12px] h-[12px] bg-[#ffb745] rounded-full ml-1">
                                                        <span className="flex items-center justify-center w-full h-full">
                                                            <CheckIcon className="text-white h-2 w-2 font-black" />
                                                        </span>
                                                    </div>
                                                    <h2 className="text-sm text-[#d2d2d2] -mt-[3px]">@ {emailname[0]}</h2>
                                                    <button
                                                        className="border border-[#ffb745] py-2 px-4 rounded-[40px] text-[#ffb745] text-sm font-medium mt-5 disabled:opacity-50 hover:bg-[#ffb745] hover:text-white"
                                                        disabled={loading || !photo} onClick={handleClick}>저장 완료</button>
                                                </div>
                                            </div>
                                            {/* <button onClick={onCickImageUpload} className="">업로드</button> */}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
export default ImageEdit;