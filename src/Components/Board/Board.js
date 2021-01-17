import React from "react";
import "./Board.css";

const buildArray = (len) => Array.from(Array(len).keys());

const Hint = () => <div className="board__hint"></div>;

const Hints = () => (
    <div className="board__hints">
        {buildArray(4).map((j) => (
            <Hint key={j} />
        ))}
    </div>
);

const Guess = () => <div className="board__guess"></div>;

const Guesses = ({ num }) => (
    <div className="board__guesses">
        {buildArray(num).map((k) => (
            <Guess key={k} />
        ))}
    </div>
);

const Board = () => {
    return (
        <div className="board">
            <div className="board__score">score</div>
            <div className="board__solution">solution</div>
            {buildArray(8).map((i) => (
                <React.Fragment key={i}>
                    <Hints />
                    <Guesses num={4} />
                </React.Fragment>
            ))}
            <Guesses num={6} />
        </div>
    );
};

export default Board;
