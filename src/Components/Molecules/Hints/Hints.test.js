import React from "react";
import { render } from "@testing-library/react";

import { buildHints } from "../../../utility";

import Hints from ".";

describe(`<Hints />`, () => {
    it("renders component with no hints", () => {
        render(<Hints />);

        expect(document.querySelector(".hints")).toBeInTheDocument();
        expect(document.querySelector(".hint")).not.toBeInTheDocument();
    });
});

describe(`<Hints hints={[...]} />`, () => {
    it("renders with `hints`", () => {
        const _null = "hint";
        const white = "hint hint--white";
        const black = "hint hint--black";

        const oneWhite = [white, _null, _null, _null]; // *4
        const twoWhite = [white, white, _null, _null]; // *6
        const threeWhite = [white, white, white, _null]; // *4
        const fourWhite = [white, white, white, white]; // *1
        const oneBlack = [black, _null, _null, _null]; // *4
        const twoBlack = [black, black, _null, _null]; // *6
        const threeBlack = [black, black, black, _null]; // *4
        const fourBlack = [black, black, black, black]; // *1
        const oneBlackOneWhite = [black, white, _null, _null]; // *12
        const oneBlackTwoWhite = [black, white, white, _null]; // *12
        const oneBlackThreeWhite = [black, white, white, white]; // *4
        const twoBlackOneWhite = [black, black, white, _null]; // *12
        const twoBlackTwoWhite = [black, black, white, white]; // *6
        const threeBlackOneWhite = [black, black, black, white]; // *4

        const { rerender } = render(<Hints hints={buildHints(null, null)} />);

        let hintElements = document.querySelectorAll(".hint");

        expect(hintElements).toHaveLength(4);
        hintElements.forEach((hintElement) => {
            expect(hintElement.className).toBe(_null);
        });

        const testHints = (hintColorsArray, expectedClasses) => {
            rerender(<Hints hints={buildHints(...hintColorsArray)} />);

            hintElements = document.querySelectorAll(".hint");

            expect(hintElements).toHaveLength(4);
            hintElements.forEach((hintElement, i) => {
                expect(hintElement.className).toBe(expectedClasses[i]);
            });
        };

        /**
         * null, {color}, {color}, {color}
         */

        // null, null, {color}, {color} ----------------------------------------

        // null, null, null, {color}
        // testHints([null, null, null, null], [_null, _null, _null, _null]);
        testHints([null, null, null, "white"], oneWhite);
        testHints([null, null, null, "black"], oneBlack);

        // null, null, "white", {color}
        testHints([null, null, "white", null], oneWhite);
        testHints([null, null, "white", "white"], twoWhite);
        testHints([null, null, "white", "black"], oneBlackOneWhite);

        // null, null, "black", {color}
        testHints([null, null, "black", null], oneBlack);
        testHints([null, null, "black", "white"], oneBlackOneWhite);
        testHints([null, null, "black", "black"], twoBlack);

        // null, "white", {color}, {color} ----------------------------------------

        // null, "white", null, {color}
        testHints([null, "white", null, null], oneWhite);
        testHints([null, "white", null, "white"], twoWhite);
        testHints([null, "white", null, "black"], oneBlackOneWhite);

        // null, "white", "white", {color}
        testHints([null, "white", "white", null], twoWhite);
        testHints([null, "white", "white", "white"], threeWhite);
        testHints([null, "white", "white", "black"], oneBlackTwoWhite);

        // null, "white", "black", {color}
        testHints([null, "white", "black", null], oneBlackOneWhite);
        testHints([null, "white", "black", "white"], oneBlackTwoWhite);
        testHints([null, "white", "black", "black"], twoBlackOneWhite);

        // null, "black", {color}, {color} ----------------------------------------

        // null, "black", null, {color}
        testHints([null, "black", null, null], oneBlack);
        testHints([null, "black", null, "white"], oneBlackOneWhite);
        testHints([null, "black", null, "black"], twoBlack);

        // null, "black", "white", {color}
        testHints([null, "black", "white", null], oneBlackOneWhite);
        testHints([null, "black", "white", "white"], oneBlackTwoWhite);
        testHints([null, "black", "white", "black"], twoBlackOneWhite);

        // null, "black", "black", {color}
        testHints([null, "black", "black", null], twoBlack);
        testHints([null, "black", "black", "white"], twoBlackOneWhite);
        testHints([null, "black", "black", "black"], threeBlack);

        /**
         * "white", {color}, {color}, {color}
         */

        // "white", null, {color}, {color} ----------------------------------------

        // "white", null, null, {color}
        testHints(["white", null, null, null], oneWhite);
        testHints(["white", null, null, "white"], twoWhite);
        testHints(["white", null, null, "black"], oneBlackOneWhite);

        // "white", null, "white", {color}
        testHints(["white", null, "white", null], twoWhite);
        testHints(["white", null, "white", "white"], threeWhite);
        testHints(["white", null, "white", "black"], oneBlackTwoWhite);

        // "white", null, "black", {color}
        testHints(["white", null, "black", null], oneBlackOneWhite);
        testHints(["white", null, "black", "white"], oneBlackTwoWhite);
        testHints(["white", null, "black", "black"], twoBlackOneWhite);

        // "white", "white", {color}, {color} ----------------------------------------

        // "white", "white", null, {color}
        testHints(["white", "white", null, null], twoWhite);
        testHints(["white", "white", null, "white"], threeWhite);
        testHints(["white", "white", null, "black"], oneBlackTwoWhite);

        // "white", "white", "white", {color}
        testHints(["white", "white", "white", null], threeWhite);
        testHints(["white", "white", "white", "white"], fourWhite);
        testHints(["white", "white", "white", "black"], oneBlackThreeWhite);

        // "white", "white", "black", {color}
        testHints(["white", "white", "black", null], oneBlackTwoWhite);
        testHints(["white", "white", "black", "white"], oneBlackThreeWhite);
        testHints(["white", "white", "black", "black"], twoBlackTwoWhite);

        // "white", "black", {color}, {color} ----------------------------------------

        // "white", "black", null, {color}
        testHints(["white", "black", null, null], oneBlackOneWhite);
        testHints(["white", "black", null, "white"], oneBlackTwoWhite);
        testHints(["white", "black", null, "black"], twoBlackOneWhite);

        // "white", "black", "white", {color}
        testHints(["white", "black", "white", null], oneBlackTwoWhite);
        testHints(["white", "black", "white", "white"], oneBlackThreeWhite);
        testHints(["white", "black", "white", "black"], twoBlackTwoWhite);

        // "white", "black", "black", {color}
        testHints(["white", "black", "black", null], twoBlackOneWhite);
        testHints(["white", "black", "black", "white"], twoBlackTwoWhite);
        testHints(["white", "black", "black", "black"], threeBlackOneWhite);

        /**
         * "black", {color}, {color}, {color}
         */

        // "black", null, {color}, {color} ----------------------------------------

        // "black", null, null, {color}
        testHints(["black", null, null, null], oneBlack);
        testHints(["black", null, null, "white"], oneBlackOneWhite);
        testHints(["black", null, null, "black"], twoBlack);

        // "black", null, "white", {color}
        testHints(["black", null, "white", null], oneBlackOneWhite);
        testHints(["black", null, "white", "white"], oneBlackTwoWhite);
        testHints(["black", null, "white", "black"], twoBlackOneWhite);

        // "black", null, "black", {color}
        testHints(["black", null, "black", null], twoBlack);
        testHints(["black", null, "black", "white"], twoBlackOneWhite);
        testHints(["black", null, "black", "black"], threeBlack);

        // "black", "white", {color}, {color} ----------------------------------------

        // "black", "white", null, {color}
        testHints(["black", "white", null, null], oneBlackOneWhite);
        testHints(["black", "white", null, "white"], oneBlackTwoWhite);
        testHints(["black", "white", null, "black"], twoBlackOneWhite);

        // "black", "white", "white", {color}
        testHints(["black", "white", "white", null], oneBlackTwoWhite);
        testHints(["black", "white", "white", "white"], oneBlackThreeWhite);
        testHints(["black", "white", "white", "black"], twoBlackTwoWhite);

        // "black", "white", "black", {color}
        testHints(["black", "white", "black", null], twoBlackOneWhite);
        testHints(["black", "white", "black", "white"], twoBlackTwoWhite);
        testHints(["black", "white", "black", "black"], threeBlackOneWhite);

        // "black", "black", {color}, {color} ----------------------------------------

        // "black", "black", null, {color}
        testHints(["black", "black", null, null], twoBlack);
        testHints(["black", "black", null, "white"], twoBlackOneWhite);
        testHints(["black", "black", null, "black"], threeBlack);

        // "black", "black", "white", {color}
        testHints(["black", "black", "white", null], twoBlackOneWhite);
        testHints(["black", "black", "white", "white"], twoBlackTwoWhite);
        testHints(["black", "black", "white", "black"], threeBlackOneWhite);

        // "black", "black", "black", {color}
        testHints(["black", "black", "black", null], threeBlack);
        testHints(["black", "black", "black", "white"], threeBlackOneWhite);
        testHints(["black", "black", "black", "black"], fourBlack);
    });
});
