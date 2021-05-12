import React, { useState } from 'react';
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

    // define state for our tooltip display status
    const [showTooltip, setShowTooltip] = useState(false);
    // define state for tooltip position
    const [tooltipPos, setTooltipPos] = useState({x: 0, y: 0});
    // define state for our tooltip content
    const [tooltipContent, setTooltipContent] = useState("");
    
    // if loading, just return some text
    if (loading) {
        return <h2>Loading ...</h2>
    // only work with all data if data is loaded
    } else {
        // We'll make a scatter plot of pokemon attack (x)
        // vs pokemon defense (y)

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

        // now, we need to create the circles
        const circles = data.map((d) => {
            // arbitrary radius for our circles
            const radius = 5;
            const x = xScale(+d.Attack);
            const y = yScale(+d.Defense);
            // cx and cy define the CENTER of the circle
            // atk and def are used to store the Attack and Defense 
            // of the pokemon respectively
            // NOTE: atk and def are just properties I made up,
            // e.g. if you wanted to also store the name of a pokemon you could add
            // a "name" property
            // this is how we'll retrieve our attack and defense values later
            return <circle 
                onMouseEnter={(event) => onPointHover(event)}
                onMouseLeave={() => onPointLeave()} 
                cx={x} cy={y} r={radius} 
                atk={d.Attack} def={d.Defense} />
        });

        /*******************************************
         * Tooltip code
         *******************************************/
        // first, create a container for our tooltip
        const tooltip = (<div style={{
            width: "5rem",
            height: "5rem",
            position: "absolute",
            // if showtooltip is true, display the tooltip otherwise set display to none
            display: `${showTooltip ? "inline" : "none"}`,
            backgroundColor: "white",
            // set left and top (which you can think of as the "x" and "y" of our tooltip div)
            // to match the current state
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`
        }}>
            {/* set the attack and defense to match the current state */}
            <span>Attack: {tooltipContent.x}</span>
            <br />
            <span>Defense: {tooltipContent.y}</span>
        </div>)

        // called when our mouse enters a circle
        const onPointHover = (e) => {
            // set new position of tooltip
            // set the tooltip slightly to the right of our mouse for better viewability
            // set the tooltips y position to our mouse's y position
            setTooltipPos({ x: e.pageX + 30, y: e.pageY });
            setShowTooltip(true);

            // get the element our circle is hovering over
            const circle = e.target;
            // set our tooltip content
            // get our new attack and defense from the circle's properties
            setTooltipContent({
                x: circle.getAttribute("atk"),
                y: circle.getAttribute("def")
            });
        }

        // if the mouse exits the circle, hide the tooltip
        const onPointLeave = () => {
            setShowTooltip(false);
        }

        return (
            <div style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}> 
                <h1 style={{
                    textAlign: "center"
                }}>Scatter plot with tooltip</h1>
                <p style={{
                    textAlign: "center"
                }}>
                    <a href="https://github.com/badpickle149/INFO474-React-Parcel-Template/blob/main/src/charts/Tooltip.js">See the code here</a>
                </p>
                {/* Make sure to include tooltip here!!! */}
                {tooltip}
                {/* add styling to center svg */}
                <svg style={{
                    display: "block",
                    margin: "auto"
                }} width={width} height={height}>
                    {/* define title and axes labels here */}
                    <text className="title" style={{
                        textAnchor: "middle"
                    }} x={width/2} y={margin - 20}>Pokemon attack vs defense</text>
                    <text style={{
                        textAnchor: "middle"
                    }} className="x-label" x={width/2} y={height - margin + 35}>
                        Pokemon Attack
                    </text>
                    {/* easiest way to rotate text and position it correctly is to ue both translate to position x,y and 
                    rotate to make the text vertical */}
                    <text className="y-label" 
                        transform={`translate(${margin - 30}, ${height/2})rotate(-90)`} >
                        Pokemon Defense
                    </text>

                    {/* render our circles here */}
                    {circles}

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