import Post from "@components/Post";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { db } from "init-firebase";
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
  } from "@firebase/firestore";
import Header from "@components/Header";
import { useRecoilState } from "recoil";
import { modalState } from "atoms/modalAtom";
import Comment from 'components/Comment';

const PostPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);

    useEffect(
        () =>
          onSnapshot(doc(db, "posts", id), (snapshot) => {
            setPost(snapshot.data());
          }),
        [db]
      );
    
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

    return (
        <div className="">
        <div className="fixwidth">
            <Post id={id} post={post} postPage />
            {comments.length > 0 && (
              <div className="comments">
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    comment={comment.data()}
                  />
                ))}
              </div>
            )}
        </div>
        </div>
    )
}
export default PostPage;