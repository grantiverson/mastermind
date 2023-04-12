/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

import { buildHints, buildPieces, generateSolution } from "../utility";

const hints = buildHints(null, null, null, null);
const pieces = buildPieces(null, null, null, null);
const initialRows = [
    { hints, id: "row-0", pieces },
    { hints, id: "row-1", pieces },
    { hints, id: "row-2", pieces },
    { hints, id: "row-3", pieces },
    { hints, id: "row-4", pieces },
    { hints, id: "row-5", pieces },
    { hints, id: "row-6", pieces },
    { hints, id: "row-7", pieces },
    { hints, id: "row-8", pieces },
];

export const boardSlice = createSlice({
    name: "board",
    initialState: {
        active: { row: initialRows.length - 1, piece: 0 },
        rows: initialRows,
        solution: generateSolution(),
    },
    reducers: {
        setActive: (state, action) => {
            state.active = action.payload;
        },
        setHints: (state, action) => {
            const { active, hints: newHints } = action.payload;

            state.rows[active.row].hints = newHints;
        },
        setRow: (state, action) => {
            const { active, pieces: newPieces } = action.payload;

            state.rows[active.row].pieces = newPieces;
        },
    },
});

export const { setActive, setHints, setRow } = boardSlice.actions;

export default boardSlice.reducer;
