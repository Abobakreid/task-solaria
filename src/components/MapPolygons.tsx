import { useEffect, useRef, useState } from "react";
import { MapOverlayProps } from "../../types";
import polygonsData from "../assets/data.json";
import baseImg from "./../assets/0-floor.png";
import layer from "./../assets/0-floor.svg";
import ToolTip from "./ToolTip";
const MapPolygons = ({ unitType, maxArea }: MapOverlayProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgContent, setSvgContent] = useState("");
  const [polygonData, setPolygonData] = useState<{
    code: number;
    status: string;
    price: number;
  }>({
    code: 0,
    status: "",
    price: 0,
  });
  const [svgBox, setSvgBox] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Load the SVG file as text
    fetch(layer)
      .then((res) => res.text())
      .then(setSvgContent);
  }, []);

  useEffect(() => {
    if (!svgContent || !svgRef.current) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, "image/svg+xml");
    const inlineSVG = doc.documentElement;
    svgRef.current.innerHTML = "";
    svgRef.current.appendChild(inlineSVG);
    const polygons = svgRef.current.querySelectorAll("polygon");
    polygons.forEach((polygon) => {
      polygon.addEventListener("mouseenter", (e: MouseEvent) => {
        const evt = e as MouseEvent;
        setSvgBox({ x: evt.pageX, y: evt.pageY });
        const code = Number(polygon.getAttribute("data-code"));
        const polyData = polygonsData.find((item) => item.code === code);
        const price = polyData?.price || 0;
        const status = polyData?.status || "";
        setPolygonData({ code, status, price });
      });
      polygon.addEventListener("mouseleave", () => {
        setSvgBox(null);
      });
    });
  }, [svgContent]);

  return (
    <div className="relative">
      <img src={baseImg} alt="Floor Plan" className="w-full" />
      <svg className="absolute inset-0 w-full h-full" id="svg" ref={svgRef}>
        <image href={layer} x="0" y="0" width="100%" height="100%" />
      </svg>
      {svgBox && (
        <div
          className="absolute"
          style={{
            left: svgBox.x - 300,
            top: svgBox.y,
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
          }}
        >
          <ToolTip
            unitNumber="Unit 104"
            unitType={`${unitType}`}
            totalArea={`${maxArea} m²`}
            price={`${polygonData.price} EGY`}
            availability={polygonData.status}
          />
        </div>
      )}
    </div>
  );
};

export default MapPolygons;
