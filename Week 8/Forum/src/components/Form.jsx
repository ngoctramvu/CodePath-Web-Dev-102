const Form = ({post, setPost}) => {
  const handleTitleChange = (event) => {
    setPost((prev) => ({...prev, title: event.target.value}));
  };

  const handleContentChange = (event) => {
    setPost((prev) => ({...prev, content: event.target.value}));
  }

  const handleFileChange = (event) => {
    setPost((prev) => ({...prev, file: event.target.files[0]}));
  }

  return (
    <div>
      <form className="form-container">
        <div className="mini-container">
          <input type="text" name="title" placeholder="Title" value={post.title} onChange={handleTitleChange} />
        </div>
        <div className="mini-container">
          <input type="text" name="content" placeholder="Content (Optional)" value={post.content} onChange={handleContentChange}/>
        </div>
        <div className="mini-container">
          <label>Upload an Image</label>
          <input type="file" name="file" accept="image/*" onChange={handleFileChange}/>
        </div>
      </form>
    </div>
  );
};

export default Form;