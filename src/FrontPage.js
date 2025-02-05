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
                <div className="mt-6">
                    <h2 className="text-3xl font-bold mb-4 color-gray-800">How it Works</h2>
                    <p>
                        This is a visualization of data from 
                        <a classList="color-blue underline" href="mitelectionlab.com"> MIT Election Lab </a> 
                        showing a breakdown of voting demographics by state (1976-2020) and county (2000 - 2020).
                    </p>
                    <p>
                        Click the white button in the top left to switch the view, and the year buttons to change the year. 
                    </p>
                    <p>
                        Hover over the state / county to see exact percentages. 
                    </p>
                    <h2 className="mt-6 mb-4 text-xl font-bold mb-4 color-gray-800">Details</h2>
                    <p>
                        Colors are set on a range from blue to purple to red, with 100% democrat being blue and 100%
                        Republican being red. Third party votes are not (currently) accounted for (work in progress).
                    </p>
                </div>
            </div>
        </>
    );
}

export default Frontpage;