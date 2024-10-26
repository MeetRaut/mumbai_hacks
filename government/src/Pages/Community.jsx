import React, { useEffect } from 'react';

const Community = () => {
  useEffect(() => {
    console.log("Current URL:", window.location.href);
    console.log("Current pathname:", window.location.pathname);

    // Check if there's any redirect in the component
    if (window.location.href.includes("localhost:3002")) {
      console.warn("Redirect detected to localhost:3002");
    }
  }, []);

  return (
    <div>Community</div>
  );
};

export default Community;
