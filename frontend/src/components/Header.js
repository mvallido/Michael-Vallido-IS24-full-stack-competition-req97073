/**
  The Header component represents the top navigation bar of the web application.
  It displays BC Mark and links to home.
*/

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-[#013367]">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="text-white -m-1.5 p-1.5">
            BC Mark (protected by Crown Copyright.)
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Header
