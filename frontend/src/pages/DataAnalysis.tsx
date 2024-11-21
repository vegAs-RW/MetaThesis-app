import React, { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import * as d3 from "d3";

const DataAnalysis: React.FC = () => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const yearChartRef = useRef<SVGSVGElement | null>(null);
  const keywordChartRef = useRef<SVGSVGElement | null>(null);
  const laboratoryChartRef = useRef<SVGSVGElement | null>(null);
  const domainChartRef = useRef<SVGSVGElement | null>(null);
  const bubbleChartRef = useRef<SVGSVGElement | null>(null);

  const token = useSelector((state: RootState) => state.auth.token);
  const [theses, setTheses] = useState<any[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [filters, setFilters] = useState<{ year?: number; domain?: string }>(
    {}
  );

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
        new Set(
          response.data.data.map((thesis: any) => thesis.year) 
        )
      ).map((year) => Number(year)); 
      setYears(uniqueYears);
    } catch (err) {
      console.error("Erreur lors de la récupération des thèses:", err);
    }
  };

  const handleResetFilters = () => {
    
    setFilters({});
  };

  const handleYearFilter = (year: number) => {
    setFilters((prev) => ({
      ...prev,
      year,
    }));
  };

  useEffect(() => {
    fetchTheses(filters);
  }, [filters]);

  useEffect(() => {
    if (theses.length > 0) {
      renderDomainBarChart();
      renderYearHistogram();
      renderKeywordPieChart();
      renderLaboratoryBarChart();
      renderDomainLineChart();
      renderLaboratoryBubbleChart();
    }
  }, [theses]);

  const renderDomainBarChart = () => {
    const groupedData = d3
      .rollups(
        theses,
        (v) => v.length,
        (d) => d.domain 
      )
      .map(([domain, count]) => ({
        category: domain || "Unknown",
        value: count,
      }));

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(groupedData.map((d) => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(groupedData, (d) => d.value) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(groupedData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.category) || 0)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.value))
      .attr("fill", "#4A90E2");
  };

  const renderYearHistogram = () => {
    const yearData = d3
      .rollups(
        theses,
        (v) => v.length,
        (d) => d.year
      )
      .map(([year, count]) => ({
        year: year || "Unknown",
        count,
      }));

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    d3.select(yearChartRef.current).selectAll("*").remove();

    const svg = d3
      .select(yearChartRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(yearData.map((d) => d.year))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(yearData, (d) => d.count) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(yearData)
      .join("rect")
      .attr("x", (d) => x(d.year) || 0)
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.count))
      .attr("fill", "#FF5733");
  };

  const renderKeywordPieChart = () => {
    const keywordData = d3
      .rollups(
        theses,
        (v) => v.length,
        (d) => d.keyword
      )
      .map(([keyword, count]) => ({
        label: keyword || "Unknown",
        value: count,
      }));

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    d3.select(keywordChartRef.current).selectAll("*").remove();

    const svg = d3
      .select(keywordChartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3
      .pie<{ label: string; value: number }>()
      .value((d) => d.value);

    
    const arc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .outerRadius(radius - 10)
      .innerRadius(0); 

    
    const labelArc = d3
      .arc<d3.PieArcDatum<{ label: string; value: number }>>()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40); 

    
    const arcs = svg
      .selectAll(".arc")
      .data(pie(keywordData))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc) 
      .style("fill", (d) => color(d.data.label)); 

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`) 
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .text((d) => d.data.label); 
  };

  const renderLaboratoryBarChart = () => {
    const groupedData = d3
      .rollups(
        theses,
        (v) => v.length,
        (d) => d.laboratory?.name || "Unknown laboratory"
      )
      .map(([laboratory, count]) => ({
        category: laboratory || "Unknown",
        value: count,
      }));

    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    d3.select(laboratoryChartRef.current).selectAll("*").remove();

    const svg = d3
      .select(laboratoryChartRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(groupedData.map((d) => d.category))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(groupedData, (d) => d.value) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(groupedData)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.category) || 0)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(0) - y(d.value))
      .attr("fill", "#6A5ACD");
  };

  const renderDomainLineChart = () => {
    const domainYearData = d3.rollups(
      theses,
      (v) => v.length,
      (d) => d.year,
      (d) => d.domain
    );

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    d3.select(domainChartRef.current).selectAll("*").remove();

    const svg = d3
      .select(domainChartRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(domainYearData[0].map((d) => String(d[0])))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(domainYearData, (d) => Number(d[1])) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d) => {
        const xValue = x(String(d[0]));
        return xValue !== undefined ? xValue : 0;
      })
      .y((d) => y(Number(d[1]))) 
      .curve(d3.curveMonotoneX);

    svg
      .selectAll(".line")
      .data(domainYearData)
      .enter()
      .append("path")
      .attr("class", "line")
      .attr("d", (d) => line(d))
      .style("stroke", "#4A90E2")
      .style("fill", "none");

    svg.append("g").call(d3.axisLeft(y));
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));
  };

  const renderLaboratoryBubbleChart = () => {
    const bubbleData = theses.reduce((acc, d) => {
      const year = d.year;
      const laboratory = d.laboratory?.name || "Unknown";
      const key = `${year}-${laboratory}`;
      if (!acc[key]) {
        acc[key] = { year, laboratory, count: 0 };
      }
      acc[key].count += 1;
      return acc;
    }, {});

    const data = Object.values(bubbleData);

    const width = 800;
    const height = 400;

    const svg = d3
      .select(bubbleChartRef.current)
      .attr("width", width)
      .attr("height", height);


    const x = d3
      .scaleBand()
      .domain([...new Set(data.map((d) => d.year))]) 
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleBand()
      .domain([...new Set(data.map((d) => d.laboratory))])
      .range([0, height])
      .padding(0.1);

    const size = d3
      .scaleSqrt()
      .domain([0, d3.max(data, (d) => d.count)])
      .range([5, 30]);

    svg
      .selectAll(".bubble")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "bubble")
      .attr("cx", (d) => x(d.year) + x.bandwidth() / 2)
      .attr("cy", (d) => y(d.laboratory) + y.bandwidth() / 2)
      .attr("r", (d) => size(d.count))
      .style("fill", (d) => d3.schemeCategory10[d.year % 10])
      .style("opacity", 0.7);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-8">
        Data analysis
      </h1>

      <div className="flex flex-wrap justify-between mb-8">
        <div className="w-full md:w-1/3 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Filter
          </h2>
          <div className="flex gap-2">
            {years.map((year) => (
              <button
                key={year}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                onClick={() => handleYearFilter(year)}
              >
                {year}
              </button>
            ))}
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              onClick={handleResetFilters}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="shadow-lg p-4 bg-white rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Theses by Domain
          </h2>
          <svg ref={chartRef}></svg>
        </div>
        <div className="shadow-lg p-4 bg-white rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Theses by year
          </h2>
          <svg ref={yearChartRef}></svg>
        </div>
        <div className="shadow-lg p-4 bg-white rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Theses by keyword
          </h2>
          <svg ref={keywordChartRef}></svg>
        </div>
        <div className="shadow-lg p-4 bg-white rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Theses by laboratory
          </h2>
          <svg ref={laboratoryChartRef}></svg>
        </div>
        <div className="shadow-lg p-4 bg-white rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Domain evolution
          </h2>
          <svg ref={domainChartRef}></svg>
        </div>
        <div className="shadow-lg p-4 bg-white rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Répartition par Laboratoire et Année
          </h2>
          <svg ref={bubbleChartRef}></svg>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
