import { useState } from "react";
import FilterForm from "./components/FilterForm";
import MapPolygons from "./components/MapPolygons";

function App() {
  const [maxArea, setMaxArea] = useState<number>(300.0);
  const [maxPrice, setMaxPrice] = useState<number>(30.0);
  const [unitType, setUnitType] = useState<string>("Commercial");

  return (
    <div className="flex space-x-4 p-4">
      <FilterForm
        maxArea={maxArea}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        setMaxArea={setMaxArea}
        setUnitType={setUnitType}
      />
      <div className="relative w-full">
        <MapPolygons unitType={unitType} maxArea={maxArea} />
      </div>
    </div>
  );
}

export default App;
