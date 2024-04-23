import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import SignupForm from './SignupForm';
import Home from './home';

function navbar(props) {

  const logoutUrl = "http://localhost:3000/user/logout";

  const logout = async () => {
    try{
      const response = await axios.get(logoutUrl);
      if(response.data.errors){
        throw new Error('Error trying to log out');
      }
      props.changeAuth();
    }
    catch(err){
       console.log(err);
    }
  }

  return (
    <nav className= ' m-5 flex  justify-between w-full font-extralight '>
      <div class="flex justify-center">
    <ul class="flex">
        <li class="mr-4">
            <a href="#" target="_blank" class="social-link"><i class="fab fa-facebook-f icon"></i></a>
        </li>
        <li class="mr-4">
            <a href="https://twitter.com/alpha_jupy" target="_blank" class="social-link"><i class="fab fa-twitter icon"></i></a>
        </li>
        <li class="mr-4">
            <a href="https://www.linkedin.com/in/younesaitmanssour/" target="_blank" class="social-link"><i class="fab fa-linkedin-in icon"></i></a>
        </li>
        <li>
            <a href="#" target="_blank" class="social-link"><i class="fab fa-google-plus-g icon"></i></a>
        </li>
    </ul>
</div>

      <ul className='font-medium flex pr-8 gap-4  to-lime-600 text-3xl justify-center'>
        <li className='mr-auto ml-8 bg-gr '>{props.name}</li>
        {/* {props.links.map(link => <li className='cursor-pointer' key={link}><a href={`#${link}`}>{link}</a></li> )}
        {
          props.isloggedIn ? <li className='cursor-pointer'><button onClick={props.changeAuth} >Log Out</button></li> : <li className='cursor-pointer'><a href='#'>Log In</a></li>
        } */}
        {props.links.map((link,index) => <Link className='cursor-pointer' key={index} to={link.path}>{link.name}</Link> )}
        {
          props.isloggedIn ? <li className='cursor-pointer'>
            <button onClick={logout} >Log Out</button></li> :<Link className='cursor-pointer' to={'/signup'}>Signup</Link>
        }
      </ul>
    </nav>
  )
}

export default navbar