# US Presidential Election Map Visualization

An interactive visualization of US presidential election results from 1976-2020, showing voting patterns at both state and county levels. Data is sourced from MIT Election Lab.

I made this project because I hadn't seen a breakdown like this at the county level, and wanted to make my own. I also wanted to get some practice with refining data and D3 Visualizations. 

## Features

- Interactive map visualization of election results
- Toggle between state and county-level data
- Year selection from 2000-2020 for county data, 1976-2020 for state data
- Color gradient showing Democratic (blue) to Republican (red) voting patterns
- Hover functionality to view detailed election results

## Technologies Used

- React.js
- D3.js for map visualization
- Python for data processing
- Tailwind CSS for styling

## Setup

### Prerequisites
- Node.js (v14 or higher)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gunnerdoh/election-map.git
cd election-map
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

## Project Structure

```
election-map/
├── data-refinement/      # Python scripts for data processing
├── public/              # Static files
├── src/                 # Source code
│   ├── assets/         # Images and static resources
│   ├── data/           # Processed election data
│   ├── CountyMap.js   
│   ├── FrontPage.js
│   ├── index.js        
│   ├── StateMap.css    
│   └── styles.css
└── README.md
```

## Data Processing

The project uses election data from MIT Election Lab, processed using Python scripts in the `data-refinement` directory:
- `addquotes.py`: Handles CSV formatting
- `merge_diff_modes.py`: Merges different data modes

## Data Source

Election data is sourced from the MIT Election Lab's U.S. President 1976–2020 dataset. The data includes:
- State-level results from 1976-2020
- County-level results from 2000-2020

## Acknowledgments

- MIT Election Lab for providing the election data