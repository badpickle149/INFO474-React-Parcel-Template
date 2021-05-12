import React from 'react';
import { extent } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { timeParse } from 'd3-time-format';
import { useFetch } from '../hooks/useFetch';
import { line } from 'd3-shape';
import { Axis, Orient } from 'd3-axis-for-react';

export default function Linechart() {
    // copy the link to see data in browser!
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/vega/datalib/master/test/data/stocks.csv"
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
        // For this chart, we'll be making a line chart
        // of price of microsoft stock over time

        // returns a function that converts a string of the specified format
        // into a DateTime object
        // see https://github.com/d3/d3-time-format for more about available formats
        const parse = timeParse("%b %d %Y");

        // parse our date strings
        // grab only fields we want
        const formattedData = data.map((d) => {
            return {
                symbol: d.symbol,
                price: +d.price,
                date: parse(d.date)
            }
        });

        // filter for only msft stock data
        const msftData = formattedData.filter(d => d.symbol === "MSFT");

        // get limits for our x scale
        // NOTE: we can use extent on DateTime just as we would for regular numbers
        const timeLimits = extent(msftData, d => d.date);

        // make x scale using scaleTime
        // more on scaleTime: https://observablehq.com/@d3/d3-scaletime
        // we use scaleTime to make a scale for DateTime objects
        const xScale = scaleTime()
            .domain(timeLimits)
            .range([margin, width - margin]);
        
        // get limits for our y scale
        const priceLimits = extent(msftData, d => d.price);

        // make our y scale
        const yScale = scaleLinear()
            .domain(priceLimits)
            .range([height - margin, margin]);

        // make a path generator for our line
        // our path generator will calculate how to draw the line for us
        // the path generator is a function which accepts our data as a parameter
        // more on d3.line: https://github.com/d3/d3-shape
        const gen = line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.price));

        // using our line generator, we can use it to calculate the 
        // "d" string which we'll need to pass to our <path> element
        const d = gen(msftData);

        // debugger;

        return (
            <div style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}> 
                <h1 style={{
                    textAlign: "center"
                }}>Line chart of MSFT stock price over time</h1>
                <p style={{
                    textAlign: "center"
                }}>
                    <a href="https://github.com/badpickle149/INFO474-React-Parcel-Template/blob/main/src/charts/Linechart.js">See the code here</a>
                </p>
                {/* add styling to center svg */}
                <svg style={{
                    display: "block",
                    margin: "auto"
                }} width={width} height={height}>
                    {/* 
                        render our line chart here
                        remember to set fill: none and stroke: black or the chart won't render correctly 
                    */}
                    <path fill="none" stroke="black" class="linechart" d={d}></path>
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
