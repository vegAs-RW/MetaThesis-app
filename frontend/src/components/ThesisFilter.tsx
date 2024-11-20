import React, { useState } from "react";

const ThesisFilters: React.FC<{ onFilter: (filters: any) => void }> = ({ onFilter }) => {
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");
  const [domain, setDomain] = useState("");
  const [advisorName, setAdvisorName] = useState("");
  const [laboratoryName, setLaboratoryName] = useState("");

  const handleFilter = () => {
    const filters = {
      keyword: keyword || undefined,
      year: year ? parseInt(year) : undefined,
      domain: domain || undefined,
      advisorName: advisorName || undefined,
      laboratoryName: laboratoryName || undefined,
    };
    onFilter(filters);
  };

  const handleResetFilter = () => {
    setKeyword(""); 
    setYear(""); 
    setDomain(""); 
    setAdvisorName("");
    setLaboratoryName(""); 
    onFilter({}); 
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Filter</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <input
          type="text"
          placeholder="Advisor name"
          value={advisorName}
          onChange={(e) => setAdvisorName(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Laboratory"
          value={laboratoryName}
          onChange={(e) => setLaboratoryName(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <div className="mt-4 flex gap-4">
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Apply filters
        </button>
        <button
          onClick={handleResetFilter}
          className="bg-gray-500 text-white py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
      </div>
      
    </div>
  );
};

export default ThesisFilters;
