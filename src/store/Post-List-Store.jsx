import { createContext, useCallback, useReducer } from "react";
export const PostList = createContext({
  postlist: [],
  addPost: () => {},
  deletePost: () => {},
  fetchPost: () => {},
});

const PostListProvider = ({ children }) => {
  const currPostReducer = (currPostList, action) => {
    let newPostList = currPostList;
    if (action.type === "DELETE_POST") {
      newPostList = currPostList.filter(
        (deletor) => deletor.id !== action.payload.id
      );
    } else if (action.type === "ADD_POST") {
      newPostList = [action.payload, ...currPostList];
    } else if (action.type === "FETCH_POST") {
      newPostList = action.payload.posts;
    }
    return newPostList;
  };

  const [postlist, dispathPostList] = useReducer(currPostReducer, []);

  const addPost = (post) => {
    dispathPostList({
      type: "ADD_POST",
      payload: post,
    });
  };

  const fetchPost = (posts) => {
    dispathPostList({
      type: "FETCH_POST",
      payload: {
        posts,
      },
    });
  };

  const deletePost = useCallback(
    (id) => {
      dispathPostList({
        type: "DELETE_POST",
        payload: {
          id: id,
        },
      });
    },
    [dispathPostList]
  );

  return (
    <PostList.Provider value={{ postlist, addPost, fetchPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};
export default PostListProvider;
// 13:17
