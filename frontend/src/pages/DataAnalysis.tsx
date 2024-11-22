import React, { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  renderBarChart,
  renderBarChartByGroup,
  renderPieChart,
  renderBubbleChart,
  renderLineChart,
} from "../utils/ChartUtils";

const DataAnalysis: React.FC = () => {
  const chartRefs = {
    domain: useRef<SVGSVGElement | null>(null),
    year: useRef<SVGSVGElement | null>(null),
    keyword: useRef<SVGSVGElement | null>(null),
    laboratory: useRef<SVGSVGElement | null>(null),
    domainLine: useRef<SVGSVGElement | null>(null),
    bubble: useRef<SVGSVGElement | null>(null),
    department: useRef<SVGSVGElement | null>(null),
  };

  const token = useSelector((state: RootState) => state.auth.token);
  const [theses, setTheses] = useState<any[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [filters, setFilters] = useState<{ year?: number }>({});

  const fetchTheses = async (filters: any) => {
    try {
      const response = await api.get("/thesis", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: filters,
      });
      setTheses(response.data.data);
      const uniqueYears = Array.from(
        new Set(response.data.data.map((thesis: any) => thesis.year))
      ).map((year) => Number(year));
      setYears(uniqueYears);
    } catch (err) {
      console.error("Erreur lors de la récupération des thèses:", err);
    }
  };

  const handleResetFilters = () => setFilters({});
  const handleYearFilter = (year: number) =>
    setFilters((prev) => ({ ...prev, year }));

  useEffect(() => {
    fetchTheses(filters);
  }, [filters]);

  useEffect(() => {
    if (theses.length > 0) {
      renderCharts();
    }
  }, [theses]);

  const renderCharts = () => {
    chartData.forEach(({ render }) => render());
  };

  const chartData = [
    {
      title: "Theses by Domain",
      ref: chartRefs.domain,
      render: () =>
        renderBarChart({
          ref: chartRefs.domain.current,
          data: theses,
          key: "domain",
          color: "#4A90E2",
        }),
    },
    {
      title: "Theses by Year",
      ref: chartRefs.year,
      render: () =>
        renderBarChart({
          ref: chartRefs.year.current,
          data: theses,
          key: "year",
          color: "#FF5733",
        }),
    },
    {
      title: "Theses by Keyword",
      ref: chartRefs.keyword,
      render: () =>
        renderPieChart({
          ref: chartRefs.keyword.current,
          data: theses,
          key: "keyword",
        }),
    },
    {
      title: "Line Chart of Domains",
      ref: chartRefs.domainLine,
      render: () =>
        renderLineChart({
          ref: chartRefs.domainLine.current,
          data: theses,
          key: "year",
        }),
    },
    {
      title: "Bubble Chart of Labs",
      ref: chartRefs.bubble,
      render: () =>
        renderBubbleChart({
          ref: chartRefs.bubble.current,
          data: theses,
          key: "laboratory",
        }),
    },
    {
      title: "Theses by Laboratory",
      ref: chartRefs.laboratory,
      render: () =>
        renderBarChartByGroup({
          ref: chartRefs.laboratory.current,
          data: theses,
          key: "laboratory",
          color: "#6A5ACD",
        }),
    },
    {
      title: "Theses by Advisor's Department",
      ref: chartRefs.department,
      render: () =>
        renderBarChartByGroup({
          ref: chartRefs.department.current,
          data: theses,
          key: "advisor.department",
          color: "#28A745",
        }),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-8">
        Data Analysis
      </h1>
      <div className="flex flex-wrap gap-4 mb-8">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearFilter(year)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {year}
          </button>
        ))}
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chartData.map(({ title, ref }, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <svg ref={ref}></svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataAnalysis;

