import axios from "axios";
import React, { useState } from "react";

const UserCreateComment = () => {
  const [commentBody, setCommentBody] = useState("");
  const [commentChapterId, setCommentChapterId] = useState("");
  const localhost = "http://localhost:3000/api";

  const addComment = () => {
    axios.post(
      localhost + "/comment/create",
      {
        body: commentBody,
        chapterId: commentChapterId,
      },
      { 
        headers: {
            token: localStorage.getItem("token")
        } 
        },
    ).then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        }else{
            console.log(response)
        }
      });
  };
  return (
    <div className="App">
      <label>
        Chapter Id
        <input
          placeholder="Chapter Id"
          type="text"
          value={commentChapterId}
          onChange={(e) => setCommentChapterId(e.target.value)}
        />
        <br />
      </label>
      <label>
        Comments
        <input
          placeholder="Enter Comment"
          type="text"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
        />
        <br />
      </label>
      <button onClick={addComment}> Add Comment</button>
    </div>
  );
};

export default UserCreateComment;
