import { useRouter } from "next/router";

const Post = ({ id, post, postPage }) => {
    const router = useRouter();
    return (
        <div className={`${!postPage && "cursor-pointer"}`}>
            <div className="" onClick={() => router.push(`/${id}`)}>
            <img
                src={post?.image}
                alt=""
                className={`${post?.image ? "p-10" : "hidden"}`}
              />
              <h1>{post.username ? post.username : post.email}</h1>
              <h2>{post?.text}</h2>
            </div>
        </div>
    )
}
export default Post;