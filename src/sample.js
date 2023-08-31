import React from "react";

const sample = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row height ">
        <div className="lg:flex-1 h-full  rounded-lg bg-gray-100 px-10 py-3">
          <div className="borought-list h-full overflow-y-auto ">
            <ul className="space-y-4 p-4">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <button
                className="rounded-full bg-indigo-300 px-4 py-2"
                onClick={handleReturnClick}
              >
                Back To Top
              </button>

              {filteredBoroughs.map((borough) => (
                <BoroughCard
                  key={borough.name}
                  borough={borough}
                  onClick={handleFlyClick}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:flex-1 h-full rounded-lg bg-gray-100" id="map"></div>
      </div>
    </div>
  );
};

export default sample;
