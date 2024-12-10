"use client";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/configure";

const HabitListPage = () => {
  const [user] = useAuthState(auth);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchHabits = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(firestore, "habits"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        setHabits(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, [user]);

  const handleMarkAsComplete = async (habitId) => {
    if (!habitId || !user) {
      console.error("Invalid habit ID or user not found.");
      return;
    }

    try {
      const habitRef = doc(firestore, "habits", habitId);
      await updateDoc(habitRef, { completed: true });

      // Update local state to reflect changes immediately
      setHabits((prev) =>
        prev.map((habit) =>
          habit.id === habitId ? { ...habit, completed: true } : habit
        )
      );
    } catch (error) {
      console.error("Error marking habit as complete:", error);
    }
  };

  return (
    <div className="min-h-screen pb-40 bg-gradient-to-l from-blue-500 to-indigo-600 text-white flex justify-center items-center">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Your Habit List
        </h1>

        {habits.length === 0 && (
          <p className="text-center text-gray-300">
            No habits found. Start adding some!
          </p>
        )}

        <div
          className="space-y-4 max-h-[400px] overflow-y-auto rounded-lg shadow-lg"
          style={{ maxHeight: "400px" }} // Fixed height for scrollable list
        >
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`p-4 rounded-lg shadow-lg ${
                habit.completed ? "bg-green-100" : "bg-white"
              } flex justify-between items-center`}
            >
              <span
                className={`text-lg font-medium ${
                  habit.completed ? "line-through text-gray-500" : "text-black"
                }`}
              >
                {habit.habit}
              </span>

              <div className="flex items-center space-x-4">
                {habit.completed ? (
                  <span className="text-green-600 font-semibold">
                    Completed
                  </span>
                ) : (
                  <button
                    onClick={() => handleMarkAsComplete(habit.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-300 transform hover:scale-105"
                  >
                    Mark as Complete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitListPage;
