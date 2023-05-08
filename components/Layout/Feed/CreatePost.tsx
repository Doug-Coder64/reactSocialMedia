import React, { useRef, useState, useEffect } from "react";
import { Post } from "../../../lib/interfaces";
import { useUser } from "@auth0/nextjs-auth0/client";

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

const makePost = (post: Post | undefined, user: any) => (event: any) => {
  console.log(user);
  alert("");
};

interface Props {
  children?: React.ReactNode;
}

const CreatePost: React.FC<Props> = () => {
  const [value, setValue] = useState("");
  const [post, setPost] = useState<Post>();

  const { user } = useUser();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
  };

  return (
    <div className='create-post-wrapper'>
      <div className='create-post'>
        <label className='draft-label'>
          <textarea
            onChange={handleChange}
            autoComplete='on'
            autoCorrect='on'
            autoFocus
            className='draft'
            placeholder='Make A Post:'
            rows={1}
            ref={textAreaRef}
          ></textarea>
        </label>
        <div className='draft-toolbar'>
          <div></div>
          <button className='make-post' onClick={makePost(post, user)}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
