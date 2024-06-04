import { Headset, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-1 h-screen w-48 px-4 py-8 border-r" aria-label="Sidebar">
      <h1 className="font-bold mb-12 px-3">Customer Service App</h1>
      <ul className="space-y-1 text-sm font-medium">
        <li>
          <Link
            className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
            to="customers"
          >
            <UsersRound className="mr-2" />
            Customers
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
            to="interactions"
          >
            <Headset className="mr-2" />
            Interactions
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
