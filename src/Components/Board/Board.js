import React, { useState } from "react";
import "./Board.css";

const Hint = () => <div className="board__hint"></div>;

const Hints = ({ guess }) => (
    <div className="board__hints">
        {guess.map((piece, i) => (
            <Hint key={i} guess={guess} />
        ))}
    </div>
);

const Piece = ({
    active,
    color,
    column,
    guesses,
    row,
    setActive,
    setGuesses,
}) => {
    const _guesses = [...guesses];

    return (
        <div
            className={`board__piece${
                row !== "new" && active ? ` board__piece--active` : ""
            }${color ? ` board__piece--${color}` : ""}`}
            onClick={() => {
                if (row === "new") {
                    _guesses[active.row][active.column] = color;
                    setGuesses(_guesses);
                    if (guesses[active.row].includes("0")) {
                        setActive({
                            column: guesses[active.row].indexOf("0"),
                            row: active.row,
                        });
                    } else {
                        setActive({ column: 0, row: active.row + 1 });
                    }
                } else if (
                    typeof column !== "undefined" &&
                    typeof row !== "undefined"
                ) {
                    setActive({ column, row });
                }
            }}
        ></div>
    );
};

const Pieces = ({ active, guess, guesses, row, setActive }) => (
    <div className="board__pieces">
        {guess.map((piece, column) => (
            <Piece
                active={active.row === row && active.column === column}
                color={guesses[row][column]}
                column={column}
                guesses={guesses}
                key={column}
                row={row}
                setActive={setActive}
            />
        ))}
    </div>
);

const Board = () => {
    const [guesses, setGuesses] = useState([
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
        ["0", "0", "0", "0"],
    ]);
    const [active, setActive] = useState({ column: 0, row: 0 });
    const colors = ["red", "yellow", "green", "blue", "black", "white"];

    return (
        <div className="board">
            <div className="board__score">score</div>
            <div className="board__solution">solution</div>
            {guesses
                .map((guess, row) => (
                    <React.Fragment key={row}>
                        <Hints guess={guess} />
                        <Pieces
                            active={active}
                            guess={guess}
                            guesses={guesses}
                            row={row}
                            setActive={setActive}
                        />
                    </React.Fragment>
                ))
                .reverse()}
            <div className="board__pieces">
                {Array.from(Array(colors.length).keys()).map((k) => (
                    <Piece
                        active={active}
                        color={colors[k]}
                        guesses={guesses}
                        key={k}
                        row="new"
                        setActive={setActive}
                        setGuesses={setGuesses}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;
