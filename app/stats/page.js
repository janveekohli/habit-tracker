"use client";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CircularProgressBar from "../components/CircularProgressBar";
import { auth, firestore } from "../firebase/configure";

const StatsPage = () => {
  const [user] = useAuthState(auth);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      const q = query(
        collection(firestore, "habits"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const habitsData = querySnapshot.docs.map((doc) => doc.data());
      setHabits(habitsData);
      setTotal(habitsData.length);
      setCompleted(habitsData.filter((habit) => habit.completed).length);
    };

    fetchStats();
  }, [user]);

  const percentage = total ? Math.round((completed / total) * 100) : 0;

  const completedHabits = habits.filter((habit) => habit.completed);
  const remainingHabits = habits.filter((habit) => !habit.completed);

  return (
    <div className="flex items-center pb-40 justify-center h-screen bg-gradient-to-l from-blue-500 to-indigo-600 text-white">
      <div className="container mx-auto flex p-6 space-x-12">
        {/* Left Column for Circular Progress Bar */}
        <div className="flex flex-col items-center justify-center w-1/3">
          <CircularProgressBar percentage={percentage} />
          <p className="text-lg mt-4 text-center">
            {completed} out of {total} tasks completed!
          </p>
        </div>

        {/* Right Column for Task Breakdown */}
        <div className="w-2/3 bg-white bg-opacity-30 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
            Task Breakdown
          </h2>

          <div className="space-y-6">
            {completedHabits.length > 0 && (
              <div>
                <h3 className="font-medium text-xl text-green-500">
                  Completed Habits
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {completedHabits.map((habit, index) => (
                    <li key={index} className="text-gray-900">
                      {habit.habit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {remainingHabits.length > 0 && (
              <div>
                <h3 className="font-medium text-xl text-red-500">
                  Remaining Habits
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {remainingHabits.map((habit, index) => (
                    <li key={index} className="text-gray-900">
                      {habit.habit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
