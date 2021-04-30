import React from 'react';
import { extent } from 'd3-array';
import { 
    scaleLinear,
    scaleBand 
} from 'd3-scale';
import { useFetch } from '../hooks/useFetch';

export default function ChartSkeleton() {
    // copy the link to see data in browser!
    const [data, loading] = useFetch(
        "https://gist.githubusercontent.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6/raw/92200bc0a673d5ce2110aaad4544ed6c4010f687/pokemon.csv"
    );

    // the dimensions of our svg
    const width = 400;
    const height = 600;
    const margin = 50;
    
    // just display some text when data is loading
    if (loading) {
        return <h2>Loading ...</h2>
    
    // make sure to work with data only when data is loaded in
    } else {
        // for this example, we'll make a simple bar chart with the x-axis being
        // 3 pokemon: Bulbasaur, Charmander, and Squirtle
        // respectively, these pokemon are id's 1,4, and 7 in the data
        // the y-axis will be the "total" column (total combined stats of that pokemon)
        
        // first, get a small data set of only those 3 pokemon
        const startPokemon = ([1,4,7]).map(d => {
            // .find returns the row in the data set where the "#" column equals "d"
            const row = data.find(v => +v["#"] === d);
            // return only the columns we need (in this case pokemon name and total)
            return {
                name: row.Name,
                total: +row.Total
            }
        });
        
        // now we need to find the min and max values of "total"
        // in our small data set. We will need this for our scaling
        const totalExtent = extent(startPokemon, d => d.total);
        
        // using our min and max values, we can make a y scale function
        // note: since the positive y direction in an svg is downwards we're going to flip
        // the range. this will map the min "total" value to the lowest position on our svg
        // note: if we use the mininum value of "total" for our domain our bar
        // corresponding to the pokemon with the lowest total stat will have a height of 0
        // by starting the minimum value of our domain at a slightly lower value, we
        // can show the bar
        const max = totalExtent[1];
        const min = totalExtent[0] - 30;
        const yScale = scaleLinear()
            .domain([min, max])
            .range([height - margin, margin]);

        // now we need to get the domain for our x axis
        // for this we'll use scaleBand. learn about scaleBand here: 
        // https://observablehq.com/@d3/d3-scaleband
        // for the .doamin parameter, we'll pass an array of pokemon names
        const pokemonNames = startPokemon.map(d => d.name);

        // now define our x scale
        const xScale = scaleBand()
            .domain(pokemonNames)
            .range([margin, width - margin])
            // we can add a paddingInner to give some space between our bars
            // paddingInner accepts a value from 0 - 1
            // think of this as a percentage with 0 being no padding
            // and 1 being ALL padding (your bars wont show)
            .paddingInner(0.1);

        // finally, we'll put together our bars
        // for the bars we'll use <rect> elements
        // check here for more about <rect>:
        // https://www.w3schools.com/graphics/svg_rect.asp
        const bars = startPokemon.map((d) => {
            // x and y will be the upper left coordinates of our bar
            const x = xScale(d.name);
            const y = yScale(d.total);
            // in a <rect>, the "height" attribute is the distance that the bottom of
            // the bar should be located from the top (the "y" attribute)
            // yScale(min) always calculates the position of the bottom of the bar
            // since the bottom of the bar will always be located at height - marginBottom
            // by subtracting the position of the top of the bar we get the appropriate
            // value for the height
            const height = yScale(min) - yScale(d.total);

            // scaleband has a method called "bandwidth" which will automatically give us
            // how wide each bar should be
            const width = xScale.bandwidth();
            return <rect x={x} y={y} height={height} width={width} />;
        });

        // also, we can add some labels
        const pokemonNameLabels = startPokemon.map((d) => {
            const x = xScale(d.name);
            const y = height - margin + 15
            return <text x={x} y={y}>{d.name}</text>
        });    

        return (
            <div style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "5rem",
                width: "50rem"
            }}> 
                <h1 style={{
                    textAlign: "center"
                }}>Bar chart</h1>
                {/* add styling to center svg */}
                <svg style={{
                    display: "block",
                    margin: "auto"
                }} width={width} height={height}>
                    {bars}
                    {pokemonNameLabels}
                </svg>
            </div>
        )
    }
}
