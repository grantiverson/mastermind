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

const Piece = ({ color }) => (
    <div
        className={`board__piece${color ? ` board__piece--${color}` : ""}`}
    ></div>
);

const Pieces = ({ num }) => (
    <div className="board__pieces">
        {buildArray(num).map((k) => (
            <Piece key={k} />
        ))}
    </div>
);

const Board = () => {
    const pieces = ["red", "yellow", "green", "blue", "black", "white"];

    return (
        <div className="board">
            <div className="board__score">score</div>
            <div className="board__solution">solution</div>
            {buildArray(8).map((i) => (
                <React.Fragment key={i}>
                    <Hints />
                    <Pieces num={4} />
                </React.Fragment>
            ))}
            <div className="board__pieces">
                {buildArray(pieces.length).map((k) => (
                    <Piece key={k} color={pieces[k]} />
                ))}
            </div>
        </div>
    );
};

export default Board;
