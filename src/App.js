import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import "mapbox-gl/dist/mapbox-gl.css";
import SearchBar from "./components/SearchBar";
import BoroughCard from "./components/BoroughCard";
import { boroughts, initialPolygon } from "./constants";

const App = () => {
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBoroughs, setFilteredBoroughs] = useState([]);

  useEffect(() => {
    mapboxgl.accessToken =process.env.REACT_APP_YOUR_MAPBOX_KEY

    const newMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.4672438166478, 17.37219783854397],
      zoom: 6,
    });
    newMap.on("load", () => {
      boroughts.forEach(({ name, color, lonLat }) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

        new mapboxgl.Marker({ color: color })
          .setLngLat(lonLat)
          .addTo(newMap)
          .setPopup(popup)
          .getElement()
          .addEventListener("click", () => {
            newMap.flyTo({
              center: lonLat,
              zoom: 6,
              essential: true,
            });
          });
      });

      setMap(newMap);
    });

    setMap(newMap);
    return () => newMap.remove();
  }, []);

  useEffect(() => {
    if (map) {
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
        },
      });

      map.addControl(draw);
      draw.add(initialPolygon);

      // draw a new co=ordinate
      map.on("draw.selectionchange", (event) => {
        const selectedFeatures = event.features;
        console.log(`selectedFeatures : ${selectedFeatures}`);
        if (selectedFeatures.length === 1) {
          draw.changeMode("direct_select", {
            featureId: selectedFeatures[0].id,
          });
        }
      });

      // update co-ordinates
      map.on("draw.update", (event) => {
        const updatedFeatures = event.features;
        updatedFeatures.forEach((feature) => {
          const newCoordinates = feature.geometry.coordinates[0];
          console.log(`Updated coordinates: ${newCoordinates}`);
        });
      });

      return () => {
        map.removeControl(draw);
      };
    }
  }, [map]);
  const handleFlyClick = (lonLat) => {
    if (map) {
      // Fly to the clicked borough's latitude and longitude
      map.flyTo({
        center: lonLat,
        zoom: 10,
        essential: true,
        pitch: 45,
      });
    }
  };

  const handleReturnClick = () => {
    if (map) {
      // Fly to starting-location
      map.flyTo({
        center: [80.049133, 16.26511],
        zoom: 4.5,
        pitch: 0,
        essential: true,
      });
    }
  };

  useEffect(() => {
    // Filter by name
    const filtered = boroughts.filter((borough) =>
      borough.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBoroughs(filtered);
  }, [searchQuery]);

  return (
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
  );
};

export default App;
