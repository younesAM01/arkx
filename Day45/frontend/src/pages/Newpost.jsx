import { useState } from "react"
import { useForm} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from "zod";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Newpost({addPost , posts}) {
   
  const addpostUrl = 'http://localhost:3000/posts/addpost';

   const [newPost , setNewPost] = useState({title : '' , description : ''});
   const [success , setsuccess] = useState(false);
   const navigate = useNavigate();

   const schema = z.object({
     title : z.string().min(3),
     description : z.string().min(8).max(255),
   });

   const {register , handleSubmit , formState : { errors , isSubmitting } } = useForm( {resolver :zodResolver(schema) });



  function handleInputChange(event){
    const {name , value} = event.target;
    setNewPost(prvState => ({...prvState , [name]: value}));
  } 

  async function submit(){
    if(newPost.title && newPost.description ){
        try {
          const response = await axios.post(addpostUrl , {
            title : title.value,
            content : description.value,
            
          } , {withCredentials : true});
          if(response.data === null){
            throw new Error('')
          }
          console.log(response)
          setNewPost({title : '' , description : ''});
          setsuccess(true);
          navigate('/ ');
        }
        catch(err){
          console.log(err);
        }
        // addPost(newPost);
        
    }
  }

  return (
  
      <div className=" justify-items-center">  
      <form className='flex flex-col rounded-2xl border-2 px-4 py-4 w-fit h-fit ml-8 mt-8' onSubmit={handleSubmit(submit)}>
      <label htmlFor="title">Title:</label>
      <input {...register('title')} id="title" name='title' type='text' value={newPost.title} onChange={handleInputChange} className='border' /><br/>
      <label htmlFor="description">Description:</label>
      <input {...register('description')} id='description' name='description' type='text' value={newPost.description} onChange={handleInputChange} className='border'/><br/>
      <button className="border bg-blue-500 rounded-2xl py-2 px-4" type='submit'>{isSubmitting ? 'Loading...' : 'AddPost'}</button><br/>
      {success ? <p className="text-green-500">Post added successfully</p> : ''}
      </form>
      </div>

  )
}

export default Newpost