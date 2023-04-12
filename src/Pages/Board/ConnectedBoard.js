import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setActive, setHints, setRow } from "../../redux/boardSlice";
import { checkGuess } from "../../utility";

import Board from "./Board";

const ConnectedBoard = () => {
    const { active, rows, solution } = useSelector((state) => state.board);
    const dispatch = useDispatch();
    const isSolved =
        // a row has all "black" hints (solved)
        !!rows.find((row) =>
            row.hints.every((hint) => hint.color === "black"),
        ) ||
        // all rows have pieces (ran out of guesses)
        !rows.some((row) => row.pieces.some((hint) => hint.color === null)) ||
        false;

    const onClick = ({ color }) => {
        if (active.row === -1) return;

        // update new row color
        const newPieces = [...rows[active.row].pieces];
        const newPiece = { ...newPieces[active.piece], color };
        newPieces[active.piece] = newPiece;

        // set next piece as active
        const newActive = {
            ...active,
            piece: active.piece + 1,
        };

        // get hints from guess
        const newHints = checkGuess(solution, newPieces);

        dispatch(setRow({ active, pieces: newPieces }));

        // all pieces in row have been placed, move to the first piece in the
        // next row active
        if (newPieces.every((piece) => piece.color)) {
            newActive.piece = 0;
            newActive.row = active.row - 1;

            dispatch(setHints({ active, hints: newHints }));
        }

        // if every hint is black, the player has won
        if (newHints.every((piece) => piece.color === "black")) {
            newActive.row = -1;
        }

        // If we get here, not all pieces in the row have been placed. If the
        // last piece in the row is active, make the first open slot active.
        if (newActive.piece > 3) {
            newActive.piece = newPieces.indexOf(
                newPieces.find((piece) => !piece.color),
            );
        }

        dispatch(setActive(newActive));
    };

    return <Board {...{ onClick, solution, isSolved }} />;
};

export default ConnectedBoard;
