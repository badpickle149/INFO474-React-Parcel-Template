import React from 'react';
import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
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
        return (
            <div style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}> 
                <h3>Chart Name</h3>
                {/* add styling to center svg */}
                <svg style={{
                    display: "block",
                    margin: "auto"
                }} width={width} height={height}>
                    
                </svg>
            </div>
        )
    }

}
