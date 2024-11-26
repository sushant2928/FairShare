export const Header = () => {
  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="text-white focus:outline-none">
              {/* <!-- Mobile menu button --> */}
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 text-xl font-semibold">Splitwise</div>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-gray-200">
              Dashboard
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              Groups
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              Transactions
            </a>
            <a href="#" className="text-white hover:text-gray-200">
              Settings
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
