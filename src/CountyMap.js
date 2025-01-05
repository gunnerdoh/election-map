import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import rawElectionData from './data/countypres_2000-2020.csv';

const CountyMap = () => {
  const mapRef = useRef(null);
  const svgRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [year, setYear] = useState(2020);

  const processElectionData = (data, selectedYear) => {
    return data
      .filter(row => row.year === selectedYear.toString())
      .reduce((acc, row) => {
        const county = row.county_fips?.toString().padStart(5, '0');
        if (!county) return acc;
        
        if (!acc[county]) {
          acc[county] = { dem: 0, rep: 0, total: +row.totalvotes || 0 };
        }
        
        if (row.party === 'DEMOCRAT') {
          acc[county].dem = + row.candidatevotes || 0;
        } else if (row.party === 'REPUBLICAN') {
          acc[county].rep = + row.candidatevotes || 0;
        }
        return acc;
      }, {});
  };

  const setColor = () => {    
    return d3.scaleLinear()
      .domain([-1, 0, 1])
      .range(['red', 'purple', 'blue'])
      .clamp(true);
  };

  const drawMap = useCallback((mapData, electionData) => {
    if (!mapRef.current) return;

    // Clean up SGV
    if (svgRef.current) {
      svgRef.current.remove();
    }

    // Create new SVG
    const svg = d3.select(mapRef.current)
      .append("svg")
      .attr("width", 975)
      .attr("height", 610)
      .attr("viewBox", [0, 0, 975, 610])
      .attr("class", "w-full h-auto");

    // Store reference 
    svgRef.current = svg.node();

    const colorScale = setColor();
    const nation = topojson.feature(mapData, mapData.objects.nation);
    svg.append('g')
      .append('path')
      .datum(nation)
      .attr('d', d3.geoPath())
      .attr('class', 'nation')
      .attr('fill', 'none')
      .attr('stroke', '#333');

    // Create states outline
    const states = topojson.feature(mapData, mapData.objects.states);
    svg.append('g')
      .attr('stroke', '#333')
      .attr('fill', 'none')
      .selectAll('path')
      .data(states.features)
      .join('path')
      .attr('d', d3.geoPath());

    // Create counties with election data
    const counties = topojson.feature(mapData, mapData.objects.counties);
    svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-width', '0.25')
      .selectAll('path')
      .data(counties.features)
      .join('path')
      .attr('d', d3.geoPath())
      .attr('fill', d => {
        const fips = d.id.toString().padStart(5, '0');
        const countyData = electionData[fips];
        if (!countyData || !countyData.total) return '#d3d3d3';
        const margin = (countyData.dem - countyData.rep) / countyData.total;
        return colorScale(margin);
      })
      .append('title')
      .text(d => {
        const fips = d.id.toString().padStart(5, '0');
        const countyData = electionData[fips];
        if (!countyData || !countyData.total) return `${d.properties.name}: No data`;
        const demPercent = ((countyData.dem / countyData.total) * 100).toFixed(1);
        const repPercent = ((countyData.rep / countyData.total) * 100).toFixed(1);
        return `${d.properties.name}:\n${demPercent}% Dem\n${repPercent}% Rep`;
      });
  }, [mapRef, svgRef]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const mapResponse = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json');
        if (!mapResponse.ok) throw new Error('Failed to load map data');
        const mapData = await mapResponse.json();

        const response = await fetch(rawElectionData);
        const data = await response.text();
        const parsedData = d3.csvParse(data);
        console.log(parsedData);
        
        const processedData = processElectionData(parsedData, year);
        console.log(processedData);
        drawMap(mapData, processedData);
      } catch (err) {
        setError(err.message);
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup 
    return () => {
      if (svgRef.current) {
        svgRef.current.remove();
      }
    };
  }, [year]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-red-600">Error loading map: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">US Presidential Election Results {year}</h1>
      <div className="mb-8">
        <label htmlFor="yearSlider" className="block text-lg font-medium mb-2">
          Select Year
        </label>
        <input
          type="range"
          id="yearSlider"
          min="2000"
          max="2020"
          step="4"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="text-center text-lg font-medium mt-2">{year}</div>
      </div>
      <div ref={mapRef} className="border rounded-lg shadow-lg p-4">
        {isLoading && (
          <div className="flex justify-center items-center h-96">
            <div className="text-gray-600">Loading map data...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountyMap;