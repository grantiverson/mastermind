import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { _PlayField } from "./PlayField.stories";
import { PlayField } from ".";

const { rows } = _PlayField.args;

describe(`<PlayField rows={[...]} />`, () => {
    it("renders component", () => {
        render(<PlayField {...{ rows }} />);

        expect(document.querySelectorAll(".row")).toHaveLength(rows.length);
        expect(
            document.querySelector(".piece--active"),
        ).not.toBeInTheDocument();
    });
});

describe(`<PlayField active={[...]} row={[...]} />`, () => {
    it("renders active piece", () => {
        let active = { row: 7, piece: 1 };

        const { rerender } = render(<PlayField {...{ active, rows }} />);

        expect(document.querySelector(".piece--active")).toHaveClass(
            `piece--${rows[active.row].pieces[active.piece].color}`,
        );

        active = { row: 6, piece: 0 };

        rerender(<PlayField {...{ active, rows }} />);

        expect(document.querySelector(".piece--active").className).toBe(
            "piece piece--active",
        );
    });
});

describe(`<PlayField onClick={() => {}} rows={[...]} />`, () => {
    it("calls `onClick()` when a piece is clicked", async () => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        const clicked = { row: 7, piece: 1 };

        render(<PlayField {...{ onClick, rows }} />);

        expect(onClick).not.toHaveBeenCalled();

        await user.click(
            document.querySelector(
                `[aria-label="${
                    rows[clicked.row].pieces[clicked.piece].color
                } piece"]`,
            ),
        );

        expect(onClick).toHaveBeenCalledWith(clicked);
    });
});
