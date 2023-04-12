import React from "react";
import { render } from "@testing-library/react";

import Help from ".";

describe(`<Help />`, () => {
    it("renders component", () => {
        render(<Help />);

        expect(document.querySelector(".help")).toBeInTheDocument();
    });
});
