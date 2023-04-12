import React from "react";
import { render } from "@testing-library/react";

import { buildPieces } from "../../../utility";

import Pieces from ".";

const pieces = buildPieces("yellow", "green", "blue", "blue");

describe(`<Pieces row={[...]} />`, () => {
    it("renders component", () => {
        render(<Pieces {...{ pieces }} />);

        expect(document.querySelector(".pieces")).toBeInTheDocument();
        expect(document.querySelectorAll(".piece")).toHaveLength(pieces.length);
        expect(
            document.querySelector(".piece--active"),
        ).not.toBeInTheDocument();
    });
});

describe(`<Pieces active={...} row={[...]} />`, () => {
    it("renders active piece", () => {
        const active = 1;

        render(<Pieces {...{ active, pieces }} />);

        expect(document.querySelector(".piece--active")).toHaveClass(
            `piece--${pieces[active].color}`,
        );
    });
});
