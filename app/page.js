"use client";
import Link from "next/link";

const MainPage = () => {
  return (
    <div className="flex flex-col items-center pb-40 justify-center min-h-screen bg-gradient-to-l from-blue-500 to-indigo-600 text-center text-white p-6 pb-16">
      <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600 hover:scale-105 transition-all duration-300">
        Welcome to Habit Tracker
      </h1>
      <p className="text-xl mb-8 text-gray-100 opacity-80">
        Start your journey by managing your habits and achieving your goals!
      </p>

      <h2 className="text-3xl font-semibold mb-6 text-white">Key Features:</h2>
      <ul className="list-disc text-left text-xl text-gray-100 opacity-90 mb-8 space-y-4">
        <li className="hover:text-gray-300 transition-all duration-300">
          Track and manage your daily habits
        </li>
        <li className="hover:text-gray-300 transition-all duration-300">
          View your progress with detailed stats
        </li>
        <li className="hover:text-gray-300 transition-all duration-300">
          Set goals and monitor completion
        </li>
        <li className="hover:text-gray-300 transition-all duration-300">
          Easy-to-use interface with a smooth user experience
        </li>
      </ul>

      <p className="text-lg text-gray-100 opacity-80">
        Ready to start your habit tracking journey?{" "}
        <Link href="/auth" className="text-yellow-400 font-bold">
          Sign in
        </Link>{" "}
        and begin!
      </p>
    </div>
  );
};

export default MainPage;
