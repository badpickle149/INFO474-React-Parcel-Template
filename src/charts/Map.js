import React from 'React';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import { useJson } from '../hooks/useJson';
import { feature } from "topojson-client";


export default function ChartSkeleton() {
    // copy the link to see data in browser!
    // this time we're using geojson data
    // more on geojson: https://geojson.org/
    const [data, loading] = useJson(
        "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json"
    );
    // the dimensions of our svg
    // NOTE: the map is quite big, using a width of 1000
    // so we don't have to re-center or zoom the map
    const width = 1000;
    const height = 600;
    const margin = 50;

    // if loading, just return some text
    if (loading) {
        return <h2>Loading ...</h2>
    // only work with all data if data is loaded
    } else {
        // data.object has 3 fields: counties, nation, and states
        // each field contains shape information at that level
        // e.g. "nation" is just one shape (the outline of the US)
        const shapes = feature(data, data.objects.nation);

        // other shapes
        const states = feature(data, data.objects.states);
        const counties = feature(data, data.objects.counties);

        // geoPath returns a function we can use to translate geoJson shapes to
        // svg elements
        const path = geoPath();

        // use the <path> element which lets us draw shapes
        // to draw the outline of the US
        // use fill: none to make the map white and
        // stroke: black to outline the map
        const outlineofUS = <path style={{
            fill: "none",
            stroke: "black"
        }} d={path(shapes)}></path>;

        // get path elements for state and county maps
        const statesMap = <path style={{
            fill: "none",
            stroke: "black"
        }} d={path(states)}></path>;

        const countiesMap = <path style={{
            fill: "none",
            stroke: "black"
        }} d={path(counties)}></path>;
        return (
            <div style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}> 
                <h1 style={{
                    textAlign: "center"
                }}>US Map</h1>
                <p style={{
                    textAlign: "center"
                }}>
                    <a href="https://github.com/badpickle149/INFO474-React-Parcel-Template/blob/main/src/charts/Map.js">See the code here</a>
                </p>
                {/* add styling to center svg */}
                <svg style={{
                    display: "block",
                    margin: "auto",
                    marginBottom: "5rem"
                }} width={width} height={height}>
                    <text 
                        style={{
                            textAnchor: "middle",
                            fontSize: "2rem"
                        }}
                        className="title"
                        x={width/2}
                        y={margin - 20}>
                        Outline of US
                    </text>
                    {outlineofUS}
                </svg>
                
                {/* states map */}
                <svg style={{
                    display: "block",
                    margin: "auto",
                    marginBottom: "5rem"
                }} width={width} height={height}>
                    <text 
                        style={{
                            textAnchor: "middle",
                            fontSize: "2rem"
                        }}
                        className="title"
                        x={width/2}
                        y={margin - 20}>
                        US States
                    </text>
                    {statesMap}
                </svg>
                
                {/* Counties map */}
                <svg style={{
                    display: "block",
                    margin: "auto",
                    marginBottom: "5rem"
                }} width={width} height={height}>
                    <text 
                        style={{
                            textAnchor: "middle",
                            fontSize: "2rem"
                        }}
                        className="title"
                        x={width/2}
                        y={margin - 20}>
                        US Counties
                    </text>
                    {countiesMap}
                </svg>
            </div>
        )
    }

}
