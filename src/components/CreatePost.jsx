import { useContext, useRef } from "react";
import { PostList } from "../store/Post-List-Store";

const CreatePost = () => {
  const { addPost } = useContext(PostList);
  const userIdElement = useRef();
  const titleElement = useRef();
  const bodyElement = useRef();
  const likesElement = useRef(); // Separate input for likes
  const dislikesElement = useRef(); // Separate input for dislikes
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const title = titleElement.current.value;
    const body = bodyElement.current.value;
    const likes = parseInt(likesElement.current.value) || 0; // Default to 0 if not provided
    const dislikes = parseInt(dislikesElement.current.value) || 0; // Default to 0 if not provided
    const tags = tagsElement.current.value
      .split(" ")
      .filter((tag) => tag.trim() !== ""); // Remove empty tags

    // Clear form fields
    userIdElement.current.value = "";
    titleElement.current.value = "";
    bodyElement.current.value = "";
    likesElement.current.value = "";
    dislikesElement.current.value = "";
    tagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // id: Date.now(),
        title: title,
        body: body,
        // reactions: {
        //   likes: likes || 0,
        //   dislikes: dislikes || 0,
        // },
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => addPost(post));
  };

  return (
    <>
      <form className="create-post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User ID
          </label>
          <input
            ref={userIdElement}
            type="text"
            className="form-control"
            id="userId"
            placeholder="Enter Your ID..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Post Title
          </label>
          <input
            ref={titleElement}
            type="text"
            className="form-control"
            id="title"
            placeholder="How are you feeling today..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Post Content
          </label>
          <textarea
            ref={bodyElement}
            rows={4}
            className="form-control"
            id="body"
            placeholder="Tell us more about it..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="likes" className="form-label">
            Likes
          </label>
          <input
            ref={likesElement}
            type="number"
            className="form-control"
            id="likes"
            placeholder="Enter the number of Likes..."
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dislikes" className="form-label">
            Dislikes
          </label>
          <input
            ref={dislikesElement}
            type="number"
            className="form-control"
            id="dislikes"
            placeholder="Enter the number of Dislikes..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags
          </label>
          <input
            ref={tagsElement}
            type="text"
            className="form-control"
            id="tags"
            placeholder="Enter your tags separated by spaces..."
          />
        </div>

        <button type="submit" className="btn btn-primary">
          POST
        </button>
      </form>
    </>
  );
};
export default CreatePost;
