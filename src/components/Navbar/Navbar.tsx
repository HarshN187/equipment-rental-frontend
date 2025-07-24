import { useState, type FC } from "react";
import { HiChevronDown } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { menuItems } from "../../constants/navbarFields";
import Cookies from "js-cookie";

const Navbar: FC = (): ReturnType<FC> => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const handleDropdownToggle = (dropdown?: any) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      Cookies.remove("token");
      navigate("login");
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="dashboard">
                <span className="text-gray-800 text-xl font-bold">
                  RentalPro
                </span>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.dropdown == null ? (
                    <NavLink
                      to={item.href}
                      onClick={handleDropdownToggle}
                      className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <button
                      className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                      onClick={() => handleDropdownToggle(item.name)}
                    >
                      {item.name}
                      {item.dropdown && (
                        <HiChevronDown className="inline-block ml-2" />
                      )}
                    </button>
                  )}

                  {item.dropdown && (
                    <div
                      className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ${
                        activeDropdown === item.name
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      }`}
                    >
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <NavLink
                          key={dropdownIndex}
                          to={dropdownItem.href}
                          onClick={handleDropdownToggle}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                        >
                          {dropdownItem.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="text-gray-800 hover:bg-gray-100 rounded-full p-2"
            >
              <FaUser className="w-6 h-6" />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                {/* <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  Profile
                </NavLink> */}
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
