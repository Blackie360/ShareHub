import React, { useState, useEffect } from 'react';

const ProgressiveBar = ({ progress }) => {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    // Update the bar width based on the progress
    setBarWidth(progress);
  }, [progress]);

  return (
    <div className="relative mt-3">
      <div className="relative h-4 bg-purple-400 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300 ease-in-out"
          style={{ width: `${barWidth}%` }}
        ></div>
      </div>
      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
        {barWidth}%
      </span>
    </div>
  );
};

export default ProgressiveBar;
