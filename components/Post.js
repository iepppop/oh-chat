import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";

const Post = ({ id, post, postPage }) => {
    const router = useRouter();
    const emailname= (post.email||'').split('@');
    const { currentUser } = useAuth();
    return (
        <div className={`${!postPage && "cursor-pointer"}`}>
            <div className="" onClick={() => router.push(`/${id}`)}>
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                <img
                src={post?.userImg}
                alt=""
                className="object-cover h-full" 
              />
                </div>
            <img
                src={post?.image}
                alt=""
                className={`${post?.image ? "w-full object-cover" : "hidden"}`}
              />
              <h1>{post.username ? post.username : emailname[0]}</h1>
              <h2>{post?.text}</h2>
            </div>
        </div>
    )
}
export default Post;