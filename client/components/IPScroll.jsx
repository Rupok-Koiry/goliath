import React, { useEffect, useState } from "react";

const IPScroll = ({ ips }) => {
  // Duplicate the list for seamless looping
  const displayIps = [...ips, ...ips];

  return (
    <div className="ip-scroll-container text-center">
      <div className="ip-scroll">
        {displayIps.map((ip, index) => (
          <div key={index} className={`ip-item`}>
            {ip}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IPScroll;
