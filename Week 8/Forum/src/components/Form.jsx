import { useRef, useState } from "react";

const Form = ({post, setPost}) => {
  const [text, setText] = useState(post.attachment ? "No File Chosen" : "Uploaded");

  const inputRef = useRef(null);

  const handleTitleChange = (event) => {
    setPost((prev) => ({...prev, title: event.target.value}));
  };

  const handleContentChange = (event) => {
    setPost((prev) => ({...prev, content: event.target.value}));
  }

  const handleFileChange = (event) => {
    setText(event.target.files[0].name);
    setPost((prev) => ({...prev, file: event.target.files[0], attachment: true}));
  }

  const handleRemoveFile = (event) => {
    inputRef.current.value = null;
    setText("No File Chosen");
    setPost((prev) => ({...prev, file: null, attachment: false}));
  }

  return (
    <div>
      <form className="form-container">
        <div className="mini-container">
          <input type="text" className="title" placeholder="Title" value={post.title} onChange={handleTitleChange} />
        </div>
        <div className="mini-container">
          <textarea className="content" placeholder="Content (Optional)" value={post.content} onChange={handleContentChange}/>
        </div>
        <div className="mini-container">
          <label>Add Attachment</label>
          <div className="attachment-container">
            <div className="upload-container">
              <input ref={inputRef} type="file" className="file" style={{color: "transparent"}} accept="image/*" onChange={handleFileChange}/>
              <label htmlFor="files">{text}</label>
            </div>
            <i className="fa fa-times-circle-o fa-2x" onClick={handleRemoveFile} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;