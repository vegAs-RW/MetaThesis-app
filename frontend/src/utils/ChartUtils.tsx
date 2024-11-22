import * as d3 from "d3";

interface BarChartOptions {
  ref: SVGSVGElement | null;
  data: any[];
  key: string;
  color: string;
}

interface PieChartOptions {
  ref: SVGSVGElement | null;
  data: any[];
  key: string;
}

interface BubbleChartOptions {
    ref: SVGSVGElement | null;
    data: any[];
    key: string;
  }
  
  interface BubbleNode extends d3.SimulationNodeDatum {
    lab: string;
    count: number;
    x: number;
    y: number;
  }

  interface LineChartOptions {
    ref: SVGSVGElement | null;
    data: any[];
    key: string;
  }

export const renderBarChart = ({ ref, data, key, color }: BarChartOptions) => {
  if (!ref) return;

  const groupedData = d3
    .rollups(
      data,
      (v) => v.length,
      (d) => d[key] || "Unknown"
    )
    .map(([category, count]) => ({ category, value: count }));

  const width = 400;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 60, left: 50 };

  d3.select(ref).selectAll("*").remove();

  const svg = d3
    .select(ref)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`);

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
    .attr("fill", color);
};

export const renderBarChartByGroup = ({ ref, data, key, color }: BarChartOptions) => {
  if (!ref) return;

  const groupedData = d3
    .rollups(
      data,
      (v) => v.length,
      (d) => key.split(".").reduce((acc, k) => acc[k], d) || "Unknown"
    )
    .map(([category, count]) => ({ category, value: count }));

  const width = 400;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 60, left: 50 };

  d3.select(ref).selectAll("*").remove();

  const svg = d3
    .select(ref)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`);

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
    .attr("fill", color);
};

/*export const renderPieChart = ({ ref, data, key }: PieChartOptions) => {
  if (!ref) return;

  const groupedData = d3
    .rollups(
      data,
      (v) => v.length,
      (d) => d[key] || "Unknown"
    )
    .map(([category, count]) => ({ category, value: count }));

  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2 - 20;

  d3.select(ref).selectAll("*").remove();

  const svg = d3
    .select(ref)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const pie = d3.pie<any>().value((d) => d.value);
  const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  svg
    .selectAll("path")
    .data(pie(groupedData))
    .join("path")
    .attr("d", arc)
    .attr("fill", (d) => color(d.data.category));
};*/

export const renderPieChart = ({ ref, data, key }: PieChartOptions) => {
    if (!ref) return;
  
    // Grouper les données par catégories de keywords
    const groupedData = d3
      .rollups(
        data,
        (v) => v.length,
        (d) => d[key] || "Unknown"
      )
      .map(([category, count]) => ({ category, value: count }));
  
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2 - 20;
  
    // Supprimer les anciens graphiques
    d3.select(ref).selectAll("*").remove();
  
    const svg = d3
      .select(ref)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
  
    // Définir les paramètres du graphique circulaire (pie chart)
    const pie = d3.pie<any>().value((d) => d.value);
    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);
    const labelArc = d3.arc<any>().outerRadius(radius - 20).innerRadius(radius - 20); // Arc pour positionner les labels
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    // Créer les segments du pie chart
    svg
      .selectAll("path")
      .data(pie(groupedData))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.category));
  
    // Ajouter les labels sur chaque segment du pie chart
    svg
      .selectAll("text")
      .data(pie(groupedData))
      .enter()
      .append("text")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text((d) => d.data.category); // Afficher le nom du keyword
  
    // Ajouter une légende à côté du pie chart
    const legend = svg
      .append("g")
      .attr("transform", `translate(${width / 2 + 30}, -${height / 2 + 20})`);
  
    // Créer les cercles pour la légende
    legend
      .selectAll("circle")
      .data(pie(groupedData))
      .enter()
      .append("circle")
      .attr("cx", 0)
      .attr("cy", (_, i) => (i * 20) + 20) // Espacement vertical ajusté pour éviter les warnings
      .attr("r", 8)
      .attr("fill", (d) => color(d.data.category)); // Utilisation correcte de 'd'
  
    // Ajouter les textes à côté des cercles de légende
    legend
      .selectAll("text")
      .data(pie(groupedData))
      .enter()
      .append("text")
      .attr("x", 15) // Décalage horizontal pour le texte
      .attr("y", (_, i) => (i * 20) + 20) // Ajustement de la position verticale pour le texte
      .attr("dy", "0.35em")
      .text((d) => `${d.data.category} (${d.data.value})`); // Utilisation correcte de 'd'
  };
  
  

export const renderLineChart = ({ ref, data, key }: LineChartOptions) => {
    if (!ref) return;
  
    // Grouper les données par années
    const groupedData = d3
      .rollups(
        data,
        (v) => v.length,
        (d) => d[key] || "Unknown"
      )
      .map(([category, count]) => ({ category: +category, value: count }));
  
    // Trier par années pour que la ligne soit continue
    groupedData.sort((a, b) => a.category - b.category);
  
    const width = 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  
    d3.select(ref).selectAll("*").remove();
  
    const svg = d3
      .select(ref)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`);
  
    const x = d3
      .scaleLinear()
      .domain(d3.extent(groupedData, (d) => d.category) as [number, number])
      .range([margin.left, width - margin.right]);
  
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(groupedData, (d) => d.value) || 0])
      .nice()
      .range([height - margin.bottom, margin.top]);
  
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d"))); // Années en format entier
  
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  
    const line = d3
      .line<{ category: number; value: number }>()
      .x((d) => x(d.category))
      .y((d) => y(d.value));
  
    svg
      .append("path")
      .datum(groupedData)
      .attr("fill", "none")
      .attr("stroke", "#4A90E2")
      .attr("stroke-width", 2)
      .attr("d", line);
  };

  export const renderBubbleChart = ({ ref, data, key }: BubbleChartOptions) => {
    if (!ref) return;
  
    // Regrouper les données par laboratoire et calculer le total des mots-clés pour chaque laboratoire
    const groupedData: BubbleNode[] = d3
      .rollups(
        data,
        (v) =>
          v.reduce((sum, thesis) => sum + (thesis.keywords?.length || 0), 0),
        (d) => d[key] || "Unknown"
      )
      .map(([lab, count]) => ({ lab, count, x: 0, y: 0 }));
  
    const width = 400;
    const height = 400;
  
    d3.select(ref).selectAll("*").remove();
  
    const svg = d3
      .select(ref)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`);
  
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(groupedData, (d) => d.count) || 1])
      .range([10, 50]);
  
    const simulation = d3
      .forceSimulation<BubbleNode>(groupedData)
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05))
      .force(
        "collision",
        d3.forceCollide<BubbleNode>().radius((d) => radiusScale(d.count) + 2)
      );
  
    const nodes = svg
      .selectAll("circle")
      .data(groupedData)
      .enter()
      .append("circle")
      .attr("r", (d) => radiusScale(d.count))
      .attr("fill", (d) => color(d.lab))
      .attr("stroke", "white")
      .attr("stroke-width", 1.5);
  
    simulation.on("tick", () => {
      nodes.attr("cx", (d) => d.x || 0).attr("cy", (d) => d.y || 0);
    });
  };