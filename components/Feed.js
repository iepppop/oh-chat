import { useState } from 'react';
import { db } from 'init-firebase'
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useEffect } from 'react';
import Post from './Post';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        onSnapshot(
            query(collection(db,"posts"), orderBy("timestamp","desc")),
            (snapshot) =>{
                setPosts(snapshot.docs);
            }
        )
    },[db])

  return (
    <div className="">
        {posts.map((post)=>(
            <Post key={post.id} id={post.id} post={post.data()}/>
        ))}
    </div>
  )
}
export default Feed;