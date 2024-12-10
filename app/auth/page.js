"use client"; // Add this to make this a Client Component

import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation"; // Correct import for Client Component routing
import { auth, googleProvider } from "../firebase/configure";

const AuthPage = () => {
  const router = useRouter();

  // Function to handle Google Sign-In
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/add-habits"); // Redirect after successful sign-in
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-72 min-h-screen bg-gradient-to-l from-blue-500 to-indigo-600 text-center">
      <button
        onClick={signInWithGoogle}
        className="bg-white text-blue-500 px-8 py-4 rounded-lg shadow-xl text-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default AuthPage;
