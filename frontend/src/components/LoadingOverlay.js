import React from 'react';

function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50 text-2xl">
      Loading...
    </div>
  );
}

export default LoadingOverlay;