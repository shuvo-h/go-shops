import React from 'react';
import squireST from "./squareCombine.module.css";

const LoaderSquareCombine = () => {
    return (
        <div>
            <span className={`${squireST.loader}`}></span>
        </div>
    );
};

export default LoaderSquareCombine;