"use client";

import { addDoc, collection } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/configure";

const AddHabitPage = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [habit, setHabit] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // If not logged in and not loading, redirect to auth page
    if (!user && !loading) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  const handleAddHabit = async () => {
    if (!habit) return;

    try {
      await addDoc(collection(firestore, "habits"), {
        userId: user.uid,
        habit,
        completed: false,
        createdAt: new Date(),
      });
      setHabit("");
      setSuccess(true);
      // Hide the success message after 7 seconds
      setTimeout(() => setSuccess(false), 7000);
    } catch (error) {
      console.error("Error adding habit", error);
    }
  };

  if (loading || !user) {
    // Show a loading state or redirect while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center pb-40 items-center min-h-screen bg-gradient-to-l from-blue-500 to-indigo-600 text-white">
      <div className="w-full max-w-md px-6 py-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-white">
          Add a New Habit
        </h1>

        <div className="flex flex-col items-center">
          <input
            type="text"
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            className="w-full p-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a new habit"
          />
          <button
            onClick={handleAddHabit}
            className="w-full p-3 bg-blue-500 text-white rounded-lg mt-4 hover:bg-blue-400 transition duration-300 transform hover:scale-105"
          >
            Add Habit
          </button>
        </div>

        {success && (
          <div className="mt-10 bg-green-100 p-4 rounded-lg mb-4 text-green-700 shadow-md">
            <h2 className="text-xl font-semibold">Congratulations!</h2>
            <p className="mt-2">Your habit has been added successfully!</p>
            <p className="mt-2">
              You can view your habits by clicking{" "}
              <Link
                href="/habit-list"
                className="text-blue-500 hover:underline"
              >
                Manage Habits
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddHabitPage;
