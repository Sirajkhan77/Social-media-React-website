import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/Post-List-Store";
import WelcomeMessage from "./WelcomMessage";
import Loading from "./Loading";
const PostList = () => {
  const { postlist } = useContext(PostListData);
  const { fetchPost } = useContext(PostListData);

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    const controler = new AbortController();
    const signal = controler.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        fetchPost(data.posts);
        setFetching(false);
      });

    return () => {
      console.log("Cleaning up the Use Effect.");
      controler.abort();
    };
  }, []);

  return (
    <div className="yyyy">
      {fetching && <Loading />}
      {!fetching && postlist.length === 0 && <WelcomeMessage></WelcomeMessage>}
      {!fetching &&
        postlist.map((postt) => <Post key={postt.id} post={postt} />)}
    </div>
  );
};
export default PostList;
// 13:36
