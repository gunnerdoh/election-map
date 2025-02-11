import React, { useState } from 'react';
import StateMap from './StateMap';
import CountyMap from './CountyMap';

function Frontpage() {
    const [showCountyMap, setShowCountyMap] = useState(true);

    const toggleMap = () => {
        setShowCountyMap(!showCountyMap);
    };

    return (
        <>
            <div className="bg-white px-6 py-4">
                <h1 className="font-bold text-4xl mb-2">Purple Election Map</h1>
                <h2 className="text-xl mb-4">
                    A Visualization of US Federal Elections
                </h2>
                <p className="mb-4">
                    Inspired by <a href="https://purplestatesofamerica.org/" className="text-blue-500 hover:underline">this project</a> By Greg Albers.
                </p>
                <button 
                    onClick={toggleMap}
                    className="bg-white-500 hover:bg-gray-200 text-black border border-black font-bold py-2 px-4"
                >
                    {showCountyMap ? 'Show State Map' : 'Show County Map'}
                </button>
                <div className="mt-6">
                    {showCountyMap ? <CountyMap /> : <StateMap />}
                </div>
                <div className="mt-6 mx-56">
                    <h2 className="text-3xl font-bold mb-4 color-gray-800">How it Works</h2>
                    <p className="mb-4">
                        This interactive map visualizes U.S. presidential election results at both 
                        the state and county level from 2000 to 2020, using data from the MIT Election Lab. 
                        The colors indicate the political leaning of each region: deep blue represents strongly 
                        Democratic areas (100%), while deep red shows strongly Republican areas (100%), with various 
                        shades of purple indicating mixed voting patterns.
                    </p>
                    <p className="mb-4">
                        Each county and state is color-coded based on the percentage of votes received by each major party. 
                        You can explore different election years using the buttons at the top of the map (2000-2020). 
                        For detailed results, simply hover your mouse over any state or county to see the exact vote 
                        percentages and total votes cast.
                    </p>
                    <h2 className="mt-6 mb-4 text-xl font-bold mb-4 color-gray-800">Details</h2>
                    <p className="mb-4"> 
                        This visualization currently focuses on Democratic and Republican voting patterns. 
                        Third-party and independent candidate votes are not yet displayed in the color scheme 
                        but will be added in future updates. The map is regularly updated using the latest 
                        available data from MIT Election Lab's official election results database. 
                    </p>
                    <p className="mb-4">
                        The sectioning of Alaska's districts differ between the data and the map, making it difficult to 
                        accuately visualize Alaska's county-wide results. This also applies to the oglala lakota reservation
                        in South Dakota from 2000 - 2016.
                    </p>
                    <p className="mb-4">
                        Will be updating for 2024 once data is freely available. Thanks for stopping by!                        
                    </p>
                </div>
            </div>
        </>
    );
}

export default Frontpage;