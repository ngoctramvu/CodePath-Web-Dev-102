import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client'
import './EditPost.css'

const EditPost = ({data}) => {
  const {id} = useParams();

  const [post, setPost] = useState(data.filter(item => item.id === parseInt(id))[0]);

  const handleTitleChange = (event) => {
    setPost((prev) => ({...prev, title: event.target.value}));
  }

  const handleAuthorChange = (event) => {
    setPost((prev) => ({...prev, author: event.target.value}));
  }

  const handleDescriptionChange = (event) => {
    setPost((prev) => ({...prev, description: event.target.value}));
  }

  const updatePost = async (event) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .update({ title: post.title, author: post.author, description: post.description})
      .eq('id', id);

    window.location = "/";
  }

  const deletePost = async (event) => {
    event.preventDefault();

    await supabase
      .from('Posts')
      .delete()
      .eq('id', id);

    window.location = "/";
  }

  return (
    <div>
      <form>
        <label htmlFor="title">Title</label> <br />
        <input type="text" id="title" name="title" value={post.title} onChange={handleTitleChange}/><br />
        <br/>

        <label htmlFor="author">Author</label><br />
        <input type="text" id="author" name="author" value={post.author} onChange={handleAuthorChange}/><br />
        <br/>

        <label htmlFor="description">Description</label><br />
        <textarea rows="5" cols="50" id="description" value={post.description} onChange={handleDescriptionChange}>
        </textarea>
        <br/>
        <input type="submit" value="Submit" onClick={updatePost}/>
        <button className="deleteButton" onClick={deletePost}>Delete</button>
      </form>
    </div>
  )
}

export default EditPost