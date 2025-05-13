import { ToolTipProps } from "../../types/index";

const ToolTip = ({
  unitNumber,
  unitType,
  totalArea,
  price,
  availability,
}: ToolTipProps) => {
  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg space-y-2 w-64">
      <div className="flex justify-between">
        <span className="font-semibold">{unitNumber}</span>
        <span
          className={`text-sm font-medium ${
            availability === "available" ? "bg-green-500" : "bg-red-500"
          } px-2 py-1 rounded`}
        >
          {availability.toUpperCase()}
        </span>
      </div>
      <div className="flex justify-between items-center">
        Unit Type: <span>{unitType}</span>
      </div>
      <div className="flex justify-between items-center">
        Total Area: <span>{totalArea}</span>{" "}
      </div>
      <div className="flex justify-between items-center">
        Price: <span>{price}</span>
      </div>
      <button className="w-full bg-white py-2 mt-2 rounded-lg text-center text-black">
        Callback
      </button>
    </div>
  );
};

export default ToolTip;
