import React , { useState } from 'react'
import axios from 'axios'

function blogcard({post , onDelete , onEdit}) {
  
  const updatePostUrl = `http://localhost:3000/posts/updatepost/${post._id}`;
  const deletePostUrl = `http://localhost:3000/posts/deletepost/${post._id}`;

  const [ isEditing , setEditing] = useState(false);
  const [editedPost , setEditedPost] = useState(post);

  function handleInputChange(event){
     const {name,value}= event.target;
     setEditedPost(previousState => ({...previousState, [name] : value}) );
    }


  async function updatePost(){
    try{
      const response = await axios.put(updatePostUrl , 
        {title : editedPost.title ,
         content : editedPost.content ,
        } , 
        {withCredentials : true});
      if(response.data.errors){
        throw new Error ('Error trying to update the post');
      }

    }
    catch(err){
      console.log(err);
    }
      onEdit(editedPost);
      setEditing(false);
  }
  async function deletePost(){
  try{
    const response = await axios.delete(deletePostUrl , {withCredentials : true});
    if(response.data.errors){
      throw new Error('Error trying to delete the post');
    }
    onDelete(post._id)
  }
  catch(err){
     console.log(err);
  }
  }

  return (
    <div className='w-1/3 mx-4 px-8 py-8 flex-col mb-8 border rounded-3xl justify-center'>
        {isEditing ? (
        <div>
          <label className='font-bold ' htmlFor="editedTitle">Title:</label>
          <input className="border-2 mt-2" id='editedTitle' name='title' type='text' value={editedPost.title} onChange={handleInputChange} />
          <label className='font-bold ' htmlFor="editedcontent">Description:</label>
          <input className='border-2 my-2' id="editedcontent" name='content' type='text' value={editedPost.content} onChange={handleInputChange} />
          <button className='bg-green-500 px-4 py-2 rounded-lg align-center justify-center' type="button" onClick={updatePost}>Save</button>
        </div>
      ) : (
        <div>
          <h2><b>Title</b> : {post.title}</h2>
          <p><b>Description</b> : {post.content}</p>
          <div className='flex gap-4 mt-4'>
            <button className='border-2  px-4 py-2 rounded-2xl ' type='button' onClick={() => setEditing(true)}>
              Edit
            </button>
            <button className='border-2  px-4 py-2 rounded-2xl ' type='button' onClick={deletePost}>
              Delete
            </button>
          </div>
        </div>
      )}   
    </div>
  )
}

export default blogcard