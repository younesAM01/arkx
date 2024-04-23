import SignupForm from "../components/SignupForm"
import LoginForm from "../components/LoginForm"
import { useState } from "react";

function RegistrationPage( {changeAuth} ) {


  return (
    
    <div className="bg-gray-50">
  
        <LoginForm changeAuth={changeAuth} />
    </div>
  )
  }
  

  


export default RegistrationPage