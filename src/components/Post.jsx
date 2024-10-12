import { useContext } from "react";
import { MdDeleteForever } from "react-icons/md";
import { PostList } from "../store/Post-List-Store";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);

  return (
    <div className="card xxx">
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger dell-btn"
            onClick={() => deletePost(post.id)}
          >
            <MdDeleteForever className="iconn" />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        <div className="tags">
          {post.tags.map((tag) => (
            <span className="badge text-bg-secondary hashtags" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="alert alert-success reactions" role="alert">
          This post has been reacted to by {post.reactions.likes} users with{" "}
          {post.reactions.dislikes} dislikes.
        </div>
      </div>
    </div>
  );
};

export default Post;
