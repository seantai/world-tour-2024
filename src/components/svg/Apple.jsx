import React from "react";

export const Apple = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      role="img"
      className="h-12 transition-transform duration-200 hover:scale-95"
      fill={props.fill}
    >
      <path
        d="M33.34,0c.68,5.65-4.46,11.52-9.6,11A10.68,10.68,0,0,1,33.34,0Zm-.69,48c-3.25,0-4.28-1.92-7.88-1.92S20,47.8,17.09,48C11.91,48.17,4,36.34,4,26.05c0-9.42,6.72-14.22,12.34-14.22,3.08,0,6,2.05,7.88,2.05s5.49-2.57,9.26-2.23a11.4,11.4,0,0,1,8.74,4.8c-7.5,5-6.34,15.09,1.72,18.86C42.25,39.77,37.45,47.83,32.65,48Z"
        transform="translate(-4.03 0)"
      ></path>
    </svg>
  );
};
