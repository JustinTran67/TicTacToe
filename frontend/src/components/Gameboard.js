//import React, { useState } from 'react';

export default function Gameboard({ value, onSquareClick }) {
    function hover(thisButton) {
        thisButton.target.style.backgroundColor = "grey";
    }
    function normal(thisButton) {
        thisButton.target.style.backgroundColor = "lightgrey";
    }

    return (
        <button onMouseOver={hover} onMouseOut={normal} onClick={onSquareClick}>{value}</button>
    );
}