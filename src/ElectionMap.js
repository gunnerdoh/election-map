import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import mapData from './assets/counties-10m.json';
import rawElectionData from './data/1976-2020-president.csv';

const ElectionMap = () => {
  const mapRef = useRef(null);
  const [year, setYear] = useState(2020);
  
  function processElectionData(data, year) {
    const votes = data
        .filter(row => row.year === year.toString())
        .reduce((acc, row) => {
            const state = row.state.toUpperCase();
            if (!acc[state]) {
                acc[state] = { dem: 0, rep: 0, total: +row.totalvotes };
            }
            if (row.party_simplified === 'DEMOCRAT') {
                acc[state].dem = +row.candidatevotes;
            } else if (row.party_simplified === 'REPUBLICAN') {
                acc[state].rep = +row.candidatevotes;
            }
            return acc;
        }, {});
    console.log("Processed election data:", votes);
    return votes;
  }

  const setColor = () => {    
    return d3.scaleLinear()
      .domain([1, 0, -1])
      .range(['blue', 'purple', 'red'])
      .clamp(true);
  };

  const drawMap = useCallback((electionData) => {
    if (!mapRef.current) return;

    // Clear previous content
    d3.select(mapRef.current).html("");

    const width = 975;
    const height = 610;
    const colorScale = setColor();

    const svg = d3.select(mapRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, 975, 610])
      .attr("class", "w-full h-auto");

    // Create nation outline
    const nation = topojson.feature(mapData, mapData.objects.nation);
    svg.append('g')
      .append('path')
      .datum(nation)
      .attr('d', d3.geoPath())
      .attr('class', 'nation')
      .attr('fill', 'none')
      .attr('stroke', '#333');

    // Create states
    const states = topojson.feature(mapData, mapData.objects.states);
    svg.append('g')
      .attr('stroke', '#333')
      .selectAll('path')
      .data(states.features)
      .join('path')
      .attr('vector-effect', 'non-scaling-stroke')
      .attr('d', d3.geoPath())
      .attr('fill', d => {
        const stateName = d.properties.name.toUpperCase();
        const stateData = electionData[stateName];
        if (!stateData) return '#d3d3d3';
        const margin = (stateData.dem - stateData.rep) / stateData.total;
        return colorScale(margin);
      })
      .append('title')
      .text(d => {
        const stateName = d.properties.name.toUpperCase();
        const stateData = electionData[stateName];
        if (!stateData) return `${stateName}: No data`;
        const demPercent = ((stateData.dem / stateData.total) * 100).toFixed(1);
        const repPercent = ((stateData.rep / stateData.total) * 100).toFixed(1);
        return `${stateName}: ${demPercent}% Dem, ${repPercent}% Rep`;
      });
  }, []);

  const updateMap = useCallback(async (selectedYear) => {
    try {
      const response = rawElectionData;
      const data = await d3.csv(response);
      console.log(data);
      const electionData = processElectionData(data, selectedYear);
      console.log(data);
      drawMap(electionData);
    } catch (error) {
      console.error('Error updating map:', error);
    }
  }, [drawMap]);

  useEffect(() => {
    updateMap(year);
  }, [year, updateMap]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1>Purple Election Map</h1>
      <h2>
        A tool showing how states and counties voted beyond red and blue
      </h2>
      <p>
        Inspired by <a href="https://x.com/cremieuxrecueil/status/1855675611261317267"> this tweet</a>
        and <a href="https://purplestatesofamerica.org/">the project</a> it references. 
      </p>
      <div ref={mapRef} className="border rounded-lg shadow-lg p-4" />
      <div className="mb-8">
        <label htmlFor="yearSlider" className="block text-lg font-medium mb-2">
          Election Year: {year}
        </label>
        <input
          type="range"
          id="yearSlider"
          min="1976"
          max="2020"
          step="4"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ElectionMap;