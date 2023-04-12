import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Piece from ".";

describe(`<Piece />`, () => {
    it("renders component", () => {
        render(<Piece />);

        expect(screen.queryByRole("button")).toBeInTheDocument();
    });
});

describe(`<Piece color="..." />`, () => {
    it("renders piece with color", () => {
        render(<Piece color="red" />);

        expect(screen.queryByRole("button")).toHaveClass("piece--red");
    });
});

describe(`<Piece isActive />`, () => {
    it("renders piece with color", () => {
        render(<Piece isActive />);

        expect(screen.queryByRole("button")).toHaveClass("piece--active");
    });
});

describe(`<Piece onClick={() => {}} />`, () => {
    it("calls `onClick()` on click", async () => {
        const onClick = jest.fn();
        const user = userEvent.setup();

        render(<Piece {...{ onClick }} />);

        await user.click(screen.queryByRole("button"));

        expect(onClick).toHaveBeenCalledWith({
            ...Piece.defaultProps,
            onClick,
        });
    });
});
