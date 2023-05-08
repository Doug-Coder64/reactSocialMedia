import React from "react";
import CreatePost from "./CreatePost";

interface Props {
  children: React.ReactNode;
}

const Feed: React.FC<Props> = ({ children }) => {
  return (
    <div className='feed-container'>
      <div className='feed-wrapper'>
        <div className='feed'>
          <div className='feed-heading'>
            <h2>Home</h2>
          </div>
          <CreatePost />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Feed;
