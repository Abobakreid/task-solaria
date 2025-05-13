import { FilterFormProps } from "../../types";
import polygonData from "../assets/data.json";
const FilterForm = ({
  maxArea,
  maxPrice,
  setMaxPrice,
  setMaxArea,
  setUnitType,
}: FilterFormProps) => {
  // Function to handle changes in the range inputs

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "area") {
      setMaxArea(Number(value));
    } else if (name === "price") {
      setMaxPrice(Number(value));
    }

    // Update the state based on the input name and value
    const svgEle = document.getElementById("svg") as HTMLElement;
    if (svgEle) {
      const svg = svgEle as unknown as SVGSVGElement;
      const path = svg.querySelectorAll("polygon");
      path.forEach((p) => {
        const code = Number(p.getAttribute("data-code"));
        const polyData = polygonData.find((item) => item.code === code);
        const price = polyData?.price || 0;

        if (price >= maxPrice) {
          p.setAttribute("style", "display:none");
        } else {
          p.setAttribute("style", "display:block");
        }
      });
    }
  };

  return (
    <div className="p-4 bg-[#32342f] text-white rounded-lg shadow-lg space-y-4 h-fit">
      <div className="flex justify-between px-8 items-center">
        <span className="text-sm font-medium">Type</span>
        <span className="text-sm font-medium text-gray-400">Availability</span>
      </div>

      <div className="flex flex-col rounded-lg overflow-hidden">
        <button
          className="bg-[#23e282] py-2"
          onClick={() => setUnitType("Commercial")}
        >
          Commercial
        </button>
        <button
          className="bg-[#cc8b2a] py-2"
          onClick={() => setUnitType("Administrative")}
        >
          Administrative
        </button>
        <button
          className="bg-[#2673d6] py-2"
          onClick={() => setUnitType("Clinical")}
        >
          Clinical
        </button>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <label className="text-sm">Area</label>
          <span>0.0 - {maxArea} Sq.m</span>
        </div>
        <input
          type="range"
          min="0"
          max="300"
          step="1"
          name="area"
          onChange={(e) => handleChange(e)}
        />
      </div>

      <div>
        <div className="flex justify-between items-center">
          <label className="text-sm">Price</label>
          <span>LE 0.00 - {maxPrice}M</span>
        </div>
        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          name="price"
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};

export default FilterForm;
