import React from "react";
import { render } from "@testing-library/react";

import { buildHints, buildPieces } from "../../../utility";

import Row from ".";

describe(`<Row rows={[...]} />`, () => {
    it("renders component", () => {
        const hints = buildHints("black", "white", null, null);
        const pieces = buildPieces("yellow", "green", "blue", "blue");

        render(<Row {...{ hints, pieces }} />);

        expect(document.querySelector(".row")).toBeInTheDocument();
        expect(document.querySelectorAll(".hint")).toHaveLength(hints.length);
        expect(document.querySelectorAll(".piece")).toHaveLength(pieces.length);
    });
});
