import React from 'react';
import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { Axis, Orient } from 'd3-axis-for-react';
import { useFetch } from '../hooks/useFetch';

export default function ChartSkeleton() {
    // copy the link to see data in browser!
    const [data, loading] = useFetch(
        "https://gist.githubusercontent.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6/raw/92200bc0a673d5ce2110aaad4544ed6c4010f687/pokemon.csv"
    );
    // the dimensions of our svg
    const width = 600;
    const height = 600;
    const margin = 50;
    
    // if loading, just return some text
    if (loading) {
        return <h2>Loading ...</h2>
    // only work with all data if data is loaded
    } else {
        // let's make two axes: 
        // x-axis representing our pokemon attack,
        // y-axis representing our pokemon defense

        // first, we need scales
        // define x scale
        const attackExtent = extent(data, d => +d.Attack);
        const xScale = scaleLinear()
            .domain(attackExtent)
            .range([margin, width - margin]);
        
        // define y scale
        const defenseExtent = extent(data, d => +d.Defense);
        const yScale = scaleLinear()
            .domain(defenseExtent)
            .range([height - margin, margin]);

        return (
            <div style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}> 
                <h1 style={{
                    textAlign: "center"
                }}>Axes</h1>
                <p style={{
                    textAlign: "center"
                }}>
                    <a href="https://github.com/badpickle149/INFO474-React-Parcel-Template/blob/main/src/charts/Barchart.js">See the code here</a>
                </p>
                {/* add styling to center svg */}
                <svg style={{
                    display: "block",
                    margin: "auto"
                }} width={width} height={height}>
                {/* define our axes here. First, we need to position them with <g> elements */}
                <g transform={`translate(${margin}, 0)`} className="axisLeft">
                    {/* define our axis here */}
                    <Axis
                        orient={Orient.left}
                        scale={yScale}
                    />
                </g>
                <g transform={`translate(0, ${height - margin})`} className="axisBottom">
                    <Axis
                        orient={Orient.bottom}
                        scale={xScale}
                    />
                </g>
                </svg>
            </div>
        )
    }

}