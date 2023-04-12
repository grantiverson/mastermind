import React from "react";
import { render } from "@testing-library/react";

import Hint from ".";

describe(`<Hint />`, () => {
    it("renders component", () => {
        render(<Hint />);

        expect(document.querySelector(".hint")).toBeInTheDocument();
    });
});

describe(`<Hint color="..." />`, () => {
    it("renders component", () => {
        render(<Hint color="white" />);

        expect(document.querySelector(".hint")).toHaveClass("hint--white");
    });
});
