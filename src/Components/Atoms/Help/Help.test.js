import React from "react";
import { render, screen } from "@testing-library/react";

import Help from ".";

describe(`<Help />`, () => {
    it("renders component", () => {
        render(<Help />);

        expect(document.querySelector(".help")).toBeInTheDocument();
        expect(document.querySelector("svg")).toHaveClass(
            "svg-inline--fa fa-question",
        );
        expect(screen.queryByRole("tooltip")).toBeNull();
    });
});
