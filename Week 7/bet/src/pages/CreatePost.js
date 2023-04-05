import React, { useState } from 'react';
import { supabase } from '../client';
import './CreatePost.css';

const CreatePost = () => {
  const [post, setPost] = useState({title: "", author: "", description: ""});

  const handleTitleChange = (event) => {
    setPost((prev) => ({...prev, title: event.target.value}));
  }

  const handleAuthorChange = (event) => {
    setPost((prev) => ({...prev, author: event.target.value}));
  }

  const handleDescriptionChange = (event) => {
    setPost((prev) => ({...prev, description: event.target.value}));
  }

  const createPost = async (event) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .insert({title: post.title, author: post.author, description: post.description})
      .select();

    window.location = "/";
  }

  return (
    <div>
      <form>
        <label htmlFor="title">Title</label> <br />
        <input type="text" id="title" name="title" onChange={handleTitleChange}/><br />
        <br/>

        <label htmlFor="author">Author</label><br />
        <input type="text" id="author" name="author" onChange={handleAuthorChange}/><br />
        <br/>

        <label htmlFor="description">Description</label><br />
        <textarea rows="5" cols="50" id="description" onChange={handleDescriptionChange}>
        </textarea>
        <br/>
        <input type="submit" value="Submit" onClick={createPost}/>
      </form>
    </div>
  )
}

export default CreatePost