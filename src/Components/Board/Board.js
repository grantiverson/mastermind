import React, { useState } from "react";
import "./Board.css";

const guessColors = ["red", "yellow", "green", "blue", "black", "white"];
const generateSolution = () =>
    [null, null, null, null].reduce(
        (arr) => arr.concat(guessColors[Math.floor(Math.random() * 6)]),
        [],
    );
const solution = [generateSolution()];

const Hint = ({ hintColor }) => (
    <div
        className={`board__hint${
            hintColor ? ` board__hint--${hintColor}` : ""
        }`}
    ></div>
);

const Hints = ({ guess }) => {
    const _solution = [...solution[0]];
    const rightPlace = guess.reduce((arr, piece, i) => {
        if (_solution[i] === piece) {
            _solution[i] = 0;
            return arr.concat(2);
        } else {
            return arr.concat(0);
        }
    }, []);
    const rightColor = guess.reduce((arr, piece) => {
        if (_solution.includes(piece)) {
            _solution[_solution.indexOf(piece)] = 0;
            return arr.concat(1);
        } else {
            return arr.concat(0);
        }
    }, []);
    const hints =
        guess.filter((piece) => piece !== null).length === 4
            ? rightPlace
                  .reduce(
                      (arr, x, i) =>
                          x ? arr.concat(x) : arr.concat(rightColor[i]),
                      [],
                  )
                  .sort()
                  .reverse()
            : [];
    const hintColors = { 1: "white", 2: "black" };

    return (
        <div className="board__hints">
            {guess.map((piece, i) => (
                <Hint key={i} hintColor={hintColors[hints[i]]} />
            ))}
        </div>
    );
};

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

                    if (
                        _guesses[active.row].filter((piece) => piece !== null)
                            .length === 4
                    ) {
                        setActive({
                            column: 0,
                            row: active.row + 1,
                        });
                    } else {
                        setActive({
                            column: guesses[active.row].indexOf(null),
                            row: active.row,
                        });
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
                active={
                    active && active.row === row && active.column === column
                }
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
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ]);
    const [active, setActive] = useState({ column: 0, row: 0 });

    return (
        <div className="board">
            <div className="board__score">score</div>
            <Pieces guesses={solution} guess={solution[0]} row={0} />
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
                {Array.from(Array(guessColors.length).keys()).map((k) => (
                    <Piece
                        active={active}
                        color={guessColors[k]}
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
