import { useAuth } from 'contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';
import {
  CheckIcon,
  CameraIcon,
} from '@heroicons/react/solid';
import { useRecoilState } from 'recoil'
import { ImgEditState } from "atoms/modalAtom";;


const Profile = () => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser, upload, photoURL } = useAuth();
  const imageInput = useRef();
  const [imgMoadal, setImgMoadal] = useRecoilState(ImgEditState);
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
  }

  const emailname = (currentUser?.email || '').split('@');

  console.log(isHovering)

  return (
    <div className="w-full h-[255px] flex flex-col">
      <div className="w-full h-[150px]">
        <img
          src="https://blog.kakaocdn.net/dn/bMRSek/btrEUh80mvq/JTbbFwAE2f8jQLazLazLxK/img.png"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full h-[70px] relative -z-1" >
        <div className="absolute -top-[0] left-10 flex w-full h-full z-999 items-end">
  
            <input type="file" style={{ display: "none" }} onChange={handleChange} ref={imageInput} />
            <div className="w-[140px] h-[140px] rounded-full overflow-hidden bg-white relative -z-100 cursor-pointer"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={(e) => {
                e.stopPropagation();
                setImgMoadal(true);
              }}
            >
              <img
                src={photoURL}
                alt='avatar'
                className="h-full w-full object-cover p-1 rounded-full cursor-pointer"
              />
              {isHovering && (
                <div className="w-full h-full bg-black/10 absolute top-0 left-0">
                  <div className="absolute z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <CameraIcon width={15} height={15} className="text-white opaity-10" />
                  </div>
                </div>
              )}
            </div>

          <div className="m-3 pl-4">
            <h1 className="font-bold text-sm inline-block">{currentUser.displayName ? currentUser.displayName : emailname[0]}</h1>
            <div className="inline-block w-[12px] h-[12px] bg-[#ffb745] rounded-full ml-1">
              <span className="flex items-center justify-center w-full h-full">
                <CheckIcon className="text-white h-2 w-2 font-black" />
              </span>
            </div>
            <h2 className="text-sm text-[#d2d2d2] -mt-[3px]">@ {emailname[0]}</h2>
          </div>
          {/* <button onClick={onCickImageUpload} className="">업로드</button>
          <button disabled={loading || !photo} onClick={handleClick}>완</button> */}
        </div>
      </div>
    </div>
  )
}
export default Profile;