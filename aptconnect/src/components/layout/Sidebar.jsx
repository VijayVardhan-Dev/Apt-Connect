import React from "react";
import { Link} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Sidebar = () => {
  //const { pathname } = useLocation();
  const { logout } = useAuth();
  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Explore", path: "/explore" },
    { name: "Chat", path: "/chat" },
    { name: "Notifications", path: "/notifications" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="h-16 flex items-center justify-center border-b font-bold text-xl text-primary">
        APT Connect
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all `}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
      <button onClick={logout} className="p-2 text-sm text-gray-600 hover:text-red-600">
  Logout
       </button>
    </aside>
  );
};

export default Sidebar;
