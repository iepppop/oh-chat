import { useAuth } from 'contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';

const Profile = () => {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png');
    const { currentUser, upload } = useAuth();
    const imageInput = useRef();

    const onCickImageUpload = () => {
        imageInput.current.click();
      };

    const handleChange = (e) => {
        if(e.target.files[0]){
            setPhoto(e.target.files[0]);
        }
    }

    const handleClick = () => {
        upload(photo, currentUser, setLoading);
    }

    useEffect(() =>{
        console.log(currentUser)
    })

  return (
    <div>
        <input type="file" style={{display: "none"}} onChange={handleChange} ref={imageInput}/>
        <img src={photoURL} alt='avatar'/>
        <button onClick={onCickImageUpload}>이미지 편집</button>
        <button disabled={loading || !photo} onClick={handleClick}>변경 내용 저장</button>
    </div>
  )
}
export default Profile;