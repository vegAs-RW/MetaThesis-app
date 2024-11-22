// src/components/ChartCard.tsx

import React from "react";

interface ChartCardProps {
  title: string;
  svgRef: React.RefObject<SVGSVGElement>;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, svgRef }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ChartCard;
