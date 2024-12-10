"use client";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct import for Client Component routing
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/configure";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter(); // Initialize router

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/"); // Redirect to the main page after signing out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-gradient-to-l from-blue-500 to-indigo-600 text-white shadow-lg">
      <Link
        href="/"
        className="text-3xl font-bold text-white hover:text-gray-200 transition-all duration-300"
      >
        Habit Tracker
      </Link>
      <div className="flex items-center space-x-6">
        {user ? (
          <>
            <Link
              href="/add-habits"
              className="text-lg hover:text-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Add Habit
            </Link>
            <Link
              href="/habit-list"
              className="text-lg hover:text-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Habit List
            </Link>
            <Link
              href="/stats"
              className="text-lg hover:text-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Stats
            </Link>
            <button
              onClick={handleLogout}
              className="text-lg hover:text-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/auth"
            className="text-lg hover:text-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
