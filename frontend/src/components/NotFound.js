/* 
  Renders a 404 "Not Found" page
*/

import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <main class="h-screen w-full flex flex-col justify-center items-center">
      <h1 class="text-9xl font-extrabold text-gray tracking-widest">404</h1>
      <div class="bg-[#ffcb22] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button class="mt-5">
        <a class="relative inline-block text-sm font-medium text-[#db913e] group active:text-[#ffc96b] focus:outline-none focus:ring">
          <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#db913e] group-hover:translate-y-0 group-hover:translate-x-0"></span>
          <span class="relative block px-8 py-3 bg-[#013367] border border-current">
            <Link to="/">Go Home</Link>
          </span>
        </a>
      </button>
    </main>
  )
}

export default NotFound
