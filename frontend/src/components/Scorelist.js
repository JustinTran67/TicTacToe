import React, { useState, useEffect } from 'react';

function Scorelist() {
    const [scores, setScores] = useState([]);

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
                        {score.player} - Result: {score.result} - Score: {score.score} - {score.time}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Scorelist;