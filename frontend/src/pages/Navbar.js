import React from 'react'
import logo from '../assets/logo_gameit.png'
const Navbar = () => {
  return (
    <div>
      

<nav class="bg-transparent border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a  class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} class="h-15 w-20" alt="Flowbite Logo" />
    </a>
    
    <div class="   " id="navbar-default">
    <button type="button" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">EN</button>

    <button type="button" class="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">AR</button>

    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar
