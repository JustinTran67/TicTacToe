import React, { useState, useEffect } from 'react';

function Scorelist() {
    const [scores, setScores] = useState([]);
    let listResult = "";

    function determineListResult(result) {
        if (result === "Win") {
            listResult = "win";
        } else if (result === "Lose") {
            listResult = "lose";
        } else {
            listResult = "draw";
        }
        return listResult;
    }
    
    useEffect(() => {
        fetch('http://localhost:8000/api/scores/')
            .then(response => response.json())
            .then(data => setScores(data.results))
    }, [])

    if (!Array.isArray(scores)) {
        return <div>No scores available</div>;
    }
    
    return (
        <div>
            <h2>Recent Scores</h2>
            <ul>
                {scores.map((score) => (
                    <li key = {score.id}>
                        {score.player} - Result: <span className={determineListResult(score.result)}>{score.result}</span> - [{score.time}]
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Scorelist;