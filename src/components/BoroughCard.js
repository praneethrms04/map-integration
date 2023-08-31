import React from "react";

const BoroughCard = ({ borough, onClick }) => {
  return (
    <li key={borough.name} onClick={() => onClick(borough.lonLat)}>
      <div className="bg-white border border-indigo-600 p-4 sm:p-6 md:p-8 lg:p-10 h-full flex flex-col rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-indigo-500 mb-2">
          {borough.name}
        </h2>
        <div className="text-gray-400 text-sm flex-grow">{borough.address}</div>
      </div>
    </li>
  );
};

export default BoroughCard;
