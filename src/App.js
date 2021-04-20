import React, { useEffect } from 'react';
import * as d3fetch from 'd3-fetch';

export default function App() {
    useEffect(() => {
        d3fetch.csv("https://gist.githubusercontent.com/armgilles/194bcff35001e7eb53a2a8b441e8b2c6/raw/92200bc0a673d5ce2110aaad4544ed6c4010f687/pokemon.csv")
            .then(data => console.log(data));
    }, [])

    return (
        <div>
            Hello from React!
        </div>
    )
}
