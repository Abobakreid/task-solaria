export type ToolTipProps = {
  unitNumber: string;
  unitType: string;
  totalArea: string;
  price: string;
  availability: string;
};
export type MapOverlayProps = {
  unitType: string;
  maxArea: number;
};
export type FilterFormProps = {
  maxArea: number;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  setMaxArea: React.Dispatch<React.SetStateAction<number>>;
  setUnitType: React.Dispatch<React.SetStateAction<string>>;
};
