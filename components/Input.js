import { useAuth } from 'contexts/AuthContext';
import { useState, useRef } from 'react';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
}
  from "@firebase/firestore";
import { db, storage } from "init-firebase";
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import {
  PhotographIcon,
  EmojiHappyIcon,
  XIcon
} from "@heroicons/react/outline";

const Input = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setselectedFile] = useState(null);
  const { currentUser, photoURL } = useAuth();
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      id: currentUser.uid,
      username: currentUser.displayName,
      email: currentUser.email,
      userImg: currentUser.photoURL,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/img`);
    if(selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async ()=> {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db,"posts",docRef.id), {
          image: downloadURL,
        });
      });
    }
    setLoading(false);
    setInput("");
    setselectedFile(null);
    console.log(imageRef)
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setselectedFile(readerEvent.target.result);
    }
  }


  return (
    <div className="pl-10 pr-10 pb-5 w-full h-full">
      <div className="">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="무슨 일이 일어나고 있나요?"
          className="p-5 w-full resize-none min-h-[100px] h-auto border rounded-[20px]" />
        {selectedFile && (
          <div className="border-b pb-5 pt-5">
            <div className="relative flex justify-first">
              <div
                className="absolute left-3 top-3 bg-neutral-50/[.46] rounded-full p-2 cursor-pointer"
                onClick={() => setselectedFile(null)}>
                <XIcon
                  width={20}
                  height={20}
                />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="max-h-[400px] rounded-[20px]"
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-full order-last flex items-center">
        <button>
          <PhotographIcon
            onClick={() => filePickerRef.current.click()}
               
            className="mt-4"
          />
          <input
            hidden
            type="file"
            ref={filePickerRef}
            onChange={addImageToPost}
          />
        </button>
        <button
          className="hover:bg-[#feb545] hover:text-white disabled:opacity-60 disabled:cursor-default
          p-2 border rounded-[20px] px-5 ml-auto text-sm mt-4 font-bold text-[#feb545]
          border-[#feb545]"
          onClick={sendPost}
          disabled={!input.trim() && !selectedFile}>
          글 쓰기
        </button>
      </div>
    </div>
  )
}
export default Input;

