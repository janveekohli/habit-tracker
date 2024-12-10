"use client";

const CircularProgressBar = ({ percentage }) => {
  const radius = 70; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg
        className="transform -rotate-90"
        width="150"
        height="150"
        viewBox="0 0 150 150"
      >
        {/* Define the Gradient */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#ff7a18", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#af002d", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        {/* Background Circle - White */}
        <circle
          className="text-white"
          strokeWidth="10"
          stroke="currentColor"
          fill="none"
          cx="75"
          cy="75"
          r={radius}
        />
        {/* Foreground Circle - Gradient Progress Bar */}
        <circle
          className="stroke-gradient"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          stroke="url(#gradient)" // Apply the gradient
          fill="none"
          cx="75"
          cy="75"
          r={radius}
        />
      </svg>
      <span className="absolute text-xl font-bold text-white">
        {percentage}%
      </span>
    </div>
  );
};

export default CircularProgressBar;
