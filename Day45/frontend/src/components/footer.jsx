import React from 'react'

function Footer() {
  return (
    <footer className=" max-h-full bg-emerald-600 text-white py-4 bottom-0 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-center md:text-left">
          <p>&copy; 2024 Your Blog</p>
          <p>All rights reserved.</p>
        </div>
        <div className="text-center md:text-right">
          <a href="" className=" text-white hover:text-white mx-2">About</a>
          <a href="" className="text-white hover:text-white mx-2">Contact</a>
          <a href="" className="text-white hover:text-white mx-2">Privacy Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer