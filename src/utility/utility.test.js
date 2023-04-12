/* eslint-disable no-plusplus */

import {
    buildHints,
    buildPieces,
    checkGuess,
    generateRandomPieceColor,
    generateSolution,
    guessColors,
    hintColors,
} from ".";

const testHintColors = [null].concat(Object.values(hintColors));
const testGuessColors = [null].concat(guessColors);

const getNonMatchingColor = (solution) => {
    const nonMatchingColors = guessColors.filter(
        (color) => !solution.map((piece) => piece.color).includes(color),
    );

    return nonMatchingColors[0];
};

describe(`utility > buildHints(...colors)`, () => {
    it("builds an array of up to 4 hints from the provided colors", () => {
        expect(buildHints()).toStrictEqual([]);

        testHintColors.forEach((color0) => {
            expect(buildHints(color0)).toStrictEqual([
                { color: color0, id: "hint-0" },
            ]);

            testHintColors.forEach((color1) => {
                expect(buildHints(color0, color1)).toStrictEqual([
                    { color: color0, id: "hint-0" },
                    { color: color1, id: "hint-1" },
                ]);

                testHintColors.forEach((color2) => {
                    expect(buildHints(color0, color1, color2)).toStrictEqual([
                        { color: color0, id: "hint-0" },
                        { color: color1, id: "hint-1" },
                        { color: color2, id: "hint-2" },
                    ]);

                    testHintColors.forEach((color3) => {
                        expect(
                            buildHints(color0, color1, color2, color3),
                        ).toStrictEqual([
                            { color: color0, id: "hint-0" },
                            { color: color1, id: "hint-1" },
                            { color: color2, id: "hint-2" },
                            { color: color3, id: "hint-3" },
                        ]);
                    });
                });
            });
        });
    });
});

describe(`utility > buildPieces(...colors)`, () => {
    it("builds an array of up to 6 pieces from the provided colors", () => {
        testGuessColors.forEach((color0) => {
            expect(buildPieces(color0)).toStrictEqual([
                { color: color0, id: "piece-0" },
            ]);

            testGuessColors.forEach((color1) => {
                expect(buildPieces(color0, color1)).toStrictEqual([
                    { color: color0, id: "piece-0" },
                    { color: color1, id: "piece-1" },
                ]);
            });
        });

        // test 250 random color combinations
        for (let i = 0; i < 250; i++) {
            const colors = [
                generateRandomPieceColor(),
                generateRandomPieceColor(),
                generateRandomPieceColor(),
                generateRandomPieceColor(),
                generateRandomPieceColor(),
                generateRandomPieceColor(),
            ];
            expect(buildPieces(...colors)).toStrictEqual(
                colors.map((color, j) => ({ color, id: `piece-${j}` })),
            );
        }
    });
});

describe(`utility > checkGuess(solution, guess)`, () => {
    it("returns undefined when solution or guess is not formatted correctly", () => {
        const badPiecesObjects = [
            buildPieces("black"),
            buildPieces("black", "black"),
            buildPieces("black", "black", "black"),
            buildPieces("black", "black", "black", "black", "black"),
            buildPieces("black", "black", "black", "black", "black", "black"),
        ];

        badPiecesObjects.forEach((badPiecesObject) => {
            expect(
                checkGuess(
                    badPiecesObject,
                    buildPieces("black", "black", "black", "black"),
                ),
            ).toBe(undefined);
            expect(
                checkGuess(
                    buildPieces("black", "black", "black", "black"),
                    badPiecesObject,
                ),
            ).toBe(undefined);
        });
    });

    it("returns no hints when nothing matches", () => {
        // test 25 random color combinations
        for (let i = 0; i < 25; i++) {
            const solution = generateSolution();
            const guess = [
                { color: getNonMatchingColor(solution), id: "hint-0" },
                { color: getNonMatchingColor(solution), id: "hint-1" },
                { color: getNonMatchingColor(solution), id: "hint-2" },
                { color: getNonMatchingColor(solution), id: "hint-3" },
            ];
            const hints = buildHints(null, null, null, null);

            expect(checkGuess(solution, guess)).toStrictEqual(hints);
        }
    });

    it(`returns hints when one or more colors match`, () => {
        // test solution/guess pairs
        expect(
            checkGuess(
                buildPieces("blue", "black", "white", "yellow"),
                buildPieces("blue", "black", "white", "yellow"),
            ),
        ).toStrictEqual(buildHints("black", "black", "black", "black"));
        expect(
            checkGuess(
                buildPieces("white", "red", "white", "blue"),
                buildPieces("white", "red", "yellow", "blue"),
            ),
        ).toStrictEqual(buildHints("black", "black", null, "black"));
        expect(
            checkGuess(
                buildPieces("yellow", "green", "yellow", "red"),
                buildPieces("yellow", "green", "blue", "red"),
            ),
        ).toStrictEqual(buildHints("black", "black", null, "black"));
        expect(
            checkGuess(
                buildPieces("yellow", "green", "yellow", "red"),
                buildPieces("yellow", "green", "blue", "red"),
            ),
        ).toStrictEqual(buildHints("black", "black", null, "black"));
        expect(
            checkGuess(
                buildPieces("green", "white", "green", "blue"),
                buildPieces("white", "white", "green", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "black", "black", "black"));
        expect(
            checkGuess(
                buildPieces("yellow", "blue", "red", "green"),
                buildPieces("red", "blue", "red", "green"),
            ),
        ).toStrictEqual(buildHints(null, "black", "black", "black"));
        expect(
            checkGuess(
                buildPieces("black", "white", "green", "green"),
                buildPieces("black", "yellow", "green", "green"),
            ),
        ).toStrictEqual(buildHints("black", null, "black", "black"));
        expect(
            checkGuess(
                buildPieces("white", "blue", "yellow", "white"),
                buildPieces("yellow", "blue", "green", "white"),
            ),
        ).toStrictEqual(buildHints("white", "black", null, "black"));
        expect(
            checkGuess(
                buildPieces("blue", "green", "green", "green"),
                buildPieces("white", "green", "green", "white"),
            ),
        ).toStrictEqual(buildHints(null, "black", "black", null));
        expect(
            checkGuess(
                buildPieces("white", "red", "yellow", "white"),
                buildPieces("red", "red", "yellow", "red"),
            ),
        ).toStrictEqual(buildHints(null, "black", "black", null));
        expect(
            checkGuess(
                buildPieces("green", "white", "blue", "red"),
                buildPieces("yellow", "white", "yellow", "red"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, "black"));
        expect(
            checkGuess(
                buildPieces("green", "white", "red", "green"),
                buildPieces("yellow", "white", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, "black", "black", null));
        expect(
            checkGuess(
                buildPieces("red", "black", "white", "black"),
                buildPieces("red", "white", "white", "yellow"),
            ),
        ).toStrictEqual(buildHints("black", null, "black", null));
        expect(
            checkGuess(
                buildPieces("black", "red", "green", "white"),
                buildPieces("white", "yellow", "green", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", "black"));
        expect(
            checkGuess(
                buildPieces("green", "red", "blue", "green"),
                buildPieces("green", "green", "black", "green"),
            ),
        ).toStrictEqual(buildHints("black", null, null, "black"));
        expect(
            checkGuess(
                buildPieces("blue", "black", "blue", "black"),
                buildPieces("black", "black", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints("white", "black", "black", "white"));
        expect(
            checkGuess(
                buildPieces("black", "white", "red", "blue"),
                buildPieces("black", "green", "red", "white"),
            ),
        ).toStrictEqual(buildHints("black", null, "black", "white"));
        expect(
            checkGuess(
                buildPieces("black", "green", "white", "black"),
                buildPieces("white", "red", "white", "black"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", "black"));
        expect(
            checkGuess(
                buildPieces("white", "yellow", "blue", "blue"),
                buildPieces("yellow", "yellow", "black", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, "black"));
        expect(
            checkGuess(
                buildPieces("green", "green", "yellow", "red"),
                buildPieces("green", "red", "green", "red"),
            ),
        ).toStrictEqual(buildHints("black", null, "white", "black"));
        expect(
            checkGuess(
                buildPieces("green", "green", "blue", "yellow"),
                buildPieces("green", "yellow", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints("black", null, null, "black"));
        expect(
            checkGuess(
                buildPieces("red", "black", "white", "blue"),
                buildPieces("red", "black", "red", "red"),
            ),
        ).toStrictEqual(buildHints("black", "black", null, null));
        expect(
            checkGuess(
                buildPieces("white", "yellow", "yellow", "blue"),
                buildPieces("red", "white", "yellow", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "white", "black", "black"));
        expect(
            checkGuess(
                buildPieces("green", "green", "black", "red"),
                buildPieces("green", "yellow", "black", "green"),
            ),
        ).toStrictEqual(buildHints("black", null, "black", "white"));
        expect(
            checkGuess(
                buildPieces("blue", "red", "yellow", "green"),
                buildPieces("blue", "green", "white", "green"),
            ),
        ).toStrictEqual(buildHints("black", null, null, "black"));
        expect(
            checkGuess(
                buildPieces("yellow", "blue", "white", "red"),
                buildPieces("yellow", "blue", "green", "blue"),
            ),
        ).toStrictEqual(buildHints("black", "black", null, null));
        expect(
            checkGuess(
                buildPieces("yellow", "blue", "blue", "white"),
                buildPieces("red", "blue", "red", "white"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, "black"));
        expect(
            checkGuess(
                buildPieces("red", "black", "red", "white"),
                buildPieces("yellow", "blue", "red", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", "black"));
        expect(
            checkGuess(
                buildPieces("red", "blue", "black", "black"),
                buildPieces("red", "red", "white", "black"),
            ),
        ).toStrictEqual(buildHints("black", null, null, "black"));
        expect(
            checkGuess(
                buildPieces("red", "white", "red", "yellow"),
                buildPieces("blue", "white", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, "black"));
        expect(
            checkGuess(
                buildPieces("green", "blue", "red", "red"),
                buildPieces("green", "blue", "blue", "white"),
            ),
        ).toStrictEqual(buildHints("black", "black", null, null));
        expect(
            checkGuess(
                buildPieces("black", "blue", "blue", "black"),
                buildPieces("yellow", "blue", "blue", "white"),
            ),
        ).toStrictEqual(buildHints(null, "black", "black", null));
        expect(
            checkGuess(
                buildPieces("green", "blue", "blue", "red"),
                buildPieces("white", "blue", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, "black"));
        expect(
            checkGuess(
                buildPieces("yellow", "yellow", "yellow", "red"),
                buildPieces("red", "yellow", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints("white", "black", null, null));
        expect(
            checkGuess(
                buildPieces("yellow", "black", "blue", "black"),
                buildPieces("yellow", "blue", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints("black", "white", null, null));
        expect(
            checkGuess(
                buildPieces("green", "black", "blue", "red"),
                buildPieces("yellow", "black", "green", "white"),
            ),
        ).toStrictEqual(buildHints(null, "black", "white", null));
        expect(
            checkGuess(
                buildPieces("black", "white", "white", "green"),
                buildPieces("white", "black", "blue", "green"),
            ),
        ).toStrictEqual(buildHints("white", "white", null, "black"));
        expect(
            checkGuess(
                buildPieces("white", "red", "white", "red"),
                buildPieces("black", "green", "white", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", null));
        expect(
            checkGuess(
                buildPieces("green", "red", "red", "red"),
                buildPieces("black", "black", "green", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", "black"));
        expect(
            checkGuess(
                buildPieces("red", "green", "red", "black"),
                buildPieces("blue", "green", "green", "red"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, "white"));
        expect(
            checkGuess(
                buildPieces("red", "blue", "red", "blue"),
                buildPieces("yellow", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, "white", "black", null));
        expect(
            checkGuess(
                buildPieces("black", "blue", "blue", "red"),
                buildPieces("blue", "blue", "red", "green"),
            ),
        ).toStrictEqual(buildHints("white", "black", "white", null));
        expect(
            checkGuess(
                buildPieces("yellow", "red", "green", "green"),
                buildPieces("green", "green", "blue", "green"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "black"));
        expect(
            checkGuess(
                buildPieces("white", "blue", "green", "black"),
                buildPieces("blue", "blue", "black", "red"),
            ),
        ).toStrictEqual(buildHints(null, "black", "white", null));
        expect(
            checkGuess(
                buildPieces("black", "red", "red", "green"),
                buildPieces("white", "white", "black", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", "black"));
        expect(
            checkGuess(
                buildPieces("white", "yellow", "blue", "red"),
                buildPieces("black", "green", "white", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", "black"));
        expect(
            checkGuess(
                buildPieces("white", "black", "green", "white"),
                buildPieces("blue", "green", "red", "white"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, "black"));
        expect(
            checkGuess(
                buildPieces("yellow", "white", "red", "black"),
                buildPieces("white", "red", "blue", "black"),
            ),
        ).toStrictEqual(buildHints("white", "white", null, "black"));
        expect(
            checkGuess(
                buildPieces("white", "blue", "red", "black"),
                buildPieces("black", "green", "white", "black"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", "black"));
        expect(
            checkGuess(
                buildPieces("red", "red", "red", "yellow"),
                buildPieces("black", "blue", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", "white"));
        expect(
            checkGuess(
                buildPieces("red", "white", "black", "red"),
                buildPieces("black", "white", "red", "blue"),
            ),
        ).toStrictEqual(buildHints("white", "black", "white", null));
        expect(
            checkGuess(
                buildPieces("white", "yellow", "yellow", "red"),
                buildPieces("white", "black", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints("black", null, null, null));
        expect(
            checkGuess(
                buildPieces("white", "white", "black", "blue"),
                buildPieces("blue", "white", "white", "black"),
            ),
        ).toStrictEqual(buildHints("white", "black", "white", "white"));
        expect(
            checkGuess(
                buildPieces("red", "blue", "black", "yellow"),
                buildPieces("blue", "blue", "yellow", "green"),
            ),
        ).toStrictEqual(buildHints(null, "black", "white", null));
        expect(
            checkGuess(
                buildPieces("white", "yellow", "white", "black"),
                buildPieces("red", "yellow", "red", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, null));
        expect(
            checkGuess(
                buildPieces("green", "black", "white", "green"),
                buildPieces("green", "blue", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints("black", null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "red", "black", "blue"),
                buildPieces("red", "yellow", "yellow", "blue"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "black"));
        expect(
            checkGuess(
                buildPieces("green", "black", "blue", "yellow"),
                buildPieces("black", "yellow", "blue", "green"),
            ),
        ).toStrictEqual(buildHints("white", "white", "black", "white"));
        expect(
            checkGuess(
                buildPieces("blue", "white", "yellow", "black"),
                buildPieces("green", "white", "white", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, "white"));
        expect(
            checkGuess(
                buildPieces("blue", "black", "white", "black"),
                buildPieces("blue", "white", "black", "blue"),
            ),
        ).toStrictEqual(buildHints("black", "white", "white", null));
        expect(
            checkGuess(
                buildPieces("red", "red", "black", "red"),
                buildPieces("blue", "red", "blue", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, null));
        expect(
            checkGuess(
                buildPieces("blue", "green", "red", "yellow"),
                buildPieces("green", "red", "red", "green"),
            ),
        ).toStrictEqual(buildHints("white", null, "black", null));
        expect(
            checkGuess(
                buildPieces("yellow", "yellow", "blue", "blue"),
                buildPieces("red", "yellow", "black", "white"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, null));
        expect(
            checkGuess(
                buildPieces("white", "blue", "blue", "black"),
                buildPieces("yellow", "yellow", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", "white"));
        expect(
            checkGuess(
                buildPieces("blue", "green", "blue", "yellow"),
                buildPieces("green", "blue", "blue", "black"),
            ),
        ).toStrictEqual(buildHints("white", "white", "black", null));
        expect(
            checkGuess(
                buildPieces("red", "yellow", "black", "red"),
                buildPieces("red", "green", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints("black", null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "blue", "black", "yellow"),
                buildPieces("white", "black", "black", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", null));
        expect(
            checkGuess(
                buildPieces("black", "red", "yellow", "blue"),
                buildPieces("yellow", "blue", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "black"));
        expect(
            checkGuess(
                buildPieces("black", "green", "red", "red"),
                buildPieces("green", "blue", "blue", "red"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "black"));
        expect(
            checkGuess(
                buildPieces("red", "blue", "yellow", "green"),
                buildPieces("yellow", "red", "green", "green"),
            ),
        ).toStrictEqual(buildHints("white", "white", null, "black"));
        expect(
            checkGuess(
                buildPieces("black", "yellow", "white", "blue"),
                buildPieces("blue", "black", "yellow", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", "black"));
        expect(
            checkGuess(
                buildPieces("red", "blue", "red", "yellow"),
                buildPieces("yellow", "blue", "white", "white"),
            ),
        ).toStrictEqual(buildHints("white", "black", null, null));
        expect(
            checkGuess(
                buildPieces("blue", "white", "black", "green"),
                buildPieces("green", "yellow", "yellow", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "black"));
        expect(
            checkGuess(
                buildPieces("yellow", "green", "white", "white"),
                buildPieces("yellow", "white", "green", "blue"),
            ),
        ).toStrictEqual(buildHints("black", "white", "white", null));
        expect(
            checkGuess(
                buildPieces("green", "white", "green", "red"),
                buildPieces("red", "red", "green", "green"),
            ),
        ).toStrictEqual(buildHints("white", null, "black", "white"));
        expect(
            checkGuess(
                buildPieces("white", "green", "blue", "yellow"),
                buildPieces("blue", "green", "white", "red"),
            ),
        ).toStrictEqual(buildHints("white", "black", "white", null));
        expect(
            checkGuess(
                buildPieces("red", "white", "green", "blue"),
                buildPieces("black", "yellow", "green", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", null));
        expect(
            checkGuess(
                buildPieces("black", "blue", "yellow", "blue"),
                buildPieces("blue", "red", "green", "blue"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "black"));
        expect(
            checkGuess(
                buildPieces("blue", "red", "black", "green"),
                buildPieces("black", "red", "green", "red"),
            ),
        ).toStrictEqual(buildHints("white", "black", "white", null));
        expect(
            checkGuess(
                buildPieces("blue", "red", "red", "green"),
                buildPieces("white", "yellow", "green", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "black"));
        expect(
            checkGuess(
                buildPieces("white", "black", "red", "blue"),
                buildPieces("white", "yellow", "yellow", "green"),
            ),
        ).toStrictEqual(buildHints("black", null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "black", "yellow", "yellow"),
                buildPieces("blue", "blue", "yellow", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", null));
        expect(
            checkGuess(
                buildPieces("blue", "green", "white", "black"),
                buildPieces("red", "blue", "yellow", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, "black"));
        expect(
            checkGuess(
                buildPieces("blue", "red", "red", "yellow"),
                buildPieces("white", "red", "white", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, "white"));
        expect(
            checkGuess(
                buildPieces("blue", "black", "red", "green"),
                buildPieces("black", "white", "black", "green"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "black"));
        expect(
            checkGuess(
                buildPieces("blue", "green", "yellow", "yellow"),
                buildPieces("white", "white", "yellow", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", "white"));
        expect(
            checkGuess(
                buildPieces("green", "black", "blue", "black"),
                buildPieces("yellow", "white", "yellow", "black"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "black"));
        expect(
            checkGuess(
                buildPieces("black", "black", "red", "black"),
                buildPieces("green", "black", "white", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, null));
        expect(
            checkGuess(
                buildPieces("blue", "white", "green", "red"),
                buildPieces("red", "black", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints("white", null, "black", null));
        expect(
            checkGuess(
                buildPieces("green", "blue", "yellow", "green"),
                buildPieces("red", "red", "red", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "black"));
        expect(
            checkGuess(
                buildPieces("white", "yellow", "yellow", "blue"),
                buildPieces("red", "red", "black", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "black"));
        expect(
            checkGuess(
                buildPieces("yellow", "yellow", "white", "green"),
                buildPieces("red", "green", "red", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "black"));
        expect(
            checkGuess(
                buildPieces("yellow", "red", "blue", "yellow"),
                buildPieces("blue", "yellow", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "white", "black", null));
        expect(
            checkGuess(
                buildPieces("black", "black", "white", "black"),
                buildPieces("blue", "red", "green", "black"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "black"));
        expect(
            checkGuess(
                buildPieces("yellow", "yellow", "yellow", "white"),
                buildPieces("green", "yellow", "white", "green"),
            ),
        ).toStrictEqual(buildHints(null, "black", "white", null));
        expect(
            checkGuess(
                buildPieces("blue", "black", "white", "yellow"),
                buildPieces("blue", "blue", "black", "blue"),
            ),
        ).toStrictEqual(buildHints("black", null, "white", null));
        expect(
            checkGuess(
                buildPieces("black", "white", "green", "green"),
                buildPieces("black", "blue", "yellow", "blue"),
            ),
        ).toStrictEqual(buildHints("black", null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "white", "red", "green"),
                buildPieces("black", "white", "yellow", "white"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, null));
        expect(
            checkGuess(
                buildPieces("blue", "green", "black", "blue"),
                buildPieces("red", "white", "yellow", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "black"));
        expect(
            checkGuess(
                buildPieces("black", "green", "white", "yellow"),
                buildPieces("red", "green", "green", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, null));
        expect(
            checkGuess(
                buildPieces("red", "green", "black", "blue"),
                buildPieces("blue", "green", "yellow", "red"),
            ),
        ).toStrictEqual(buildHints("white", "black", null, "white"));
        expect(
            checkGuess(
                buildPieces("white", "red", "red", "red"),
                buildPieces("green", "yellow", "green", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "black"));
        expect(
            checkGuess(
                buildPieces("black", "black", "yellow", "blue"),
                buildPieces("black", "blue", "blue", "black"),
            ),
        ).toStrictEqual(buildHints("black", "white", null, "white"));
        expect(
            checkGuess(
                buildPieces("white", "black", "blue", "white"),
                buildPieces("yellow", "black", "white", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "black", "white", "white"));
        expect(
            checkGuess(
                buildPieces("blue", "red", "blue", "yellow"),
                buildPieces("green", "white", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "black"));
        expect(
            checkGuess(
                buildPieces("black", "yellow", "yellow", "blue"),
                buildPieces("yellow", "green", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints("white", null, "black", null));
        expect(
            checkGuess(
                buildPieces("yellow", "black", "yellow", "yellow"),
                buildPieces("white", "blue", "yellow", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", null));
        expect(
            checkGuess(
                buildPieces("black", "red", "blue", "red"),
                buildPieces("white", "blue", "blue", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", null));
        expect(
            checkGuess(
                buildPieces("blue", "red", "green", "blue"),
                buildPieces("blue", "yellow", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints("black", null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "blue", "red", "blue"),
                buildPieces("green", "green", "black", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "black"));
        expect(
            checkGuess(
                buildPieces("blue", "black", "white", "blue"),
                buildPieces("yellow", "yellow", "white", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", null));
        expect(
            checkGuess(
                buildPieces("black", "blue", "blue", "black"),
                buildPieces("white", "blue", "red", "white"),
            ),
        ).toStrictEqual(buildHints(null, "black", null, null));
        expect(
            checkGuess(
                buildPieces("green", "blue", "yellow", "white"),
                buildPieces("white", "green", "black", "white"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, "black"));
        expect(
            checkGuess(
                buildPieces("red", "green", "white", "red"),
                buildPieces("blue", "red", "yellow", "red"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, "black"));
        expect(
            checkGuess(
                buildPieces("white", "green", "red", "black"),
                buildPieces("yellow", "red", "red", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, "black", null));
        expect(
            checkGuess(
                buildPieces("red", "green", "green", "white"),
                buildPieces("red", "white", "blue", "yellow"),
            ),
        ).toStrictEqual(buildHints("black", "white", null, null));
        expect(
            checkGuess(
                buildPieces("green", "green", "black", "black"),
                buildPieces("black", "green", "red", "green"),
            ),
        ).toStrictEqual(buildHints("white", "black", null, "white"));
        expect(
            checkGuess(
                buildPieces("black", "blue", "blue", "yellow"),
                buildPieces("yellow", "yellow", "blue", "black"),
            ),
        ).toStrictEqual(buildHints("white", null, "black", "white"));
        expect(
            checkGuess(
                buildPieces("red", "green", "black", "green"),
                buildPieces("red", "yellow", "yellow", "white"),
            ),
        ).toStrictEqual(buildHints("black", null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "red", "white", "black"),
                buildPieces("green", "green", "green", "red"),
            ),
        ).toStrictEqual(buildHints("black", null, null, "white"));
        expect(
            checkGuess(
                buildPieces("green", "blue", "blue", "black"),
                buildPieces("red", "blue", "green", "white"),
            ),
        ).toStrictEqual(buildHints(null, "black", "white", null));
        expect(
            checkGuess(
                buildPieces("green", "black", "green", "green"),
                buildPieces("green", "white", "blue", "white"),
            ),
        ).toStrictEqual(buildHints("black", null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "white", "black", "blue"),
                buildPieces("red", "yellow", "red", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "black", "black", "white"),
                buildPieces("yellow", "green", "white", "black"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", "white"));
        expect(
            checkGuess(
                buildPieces("green", "yellow", "red", "white"),
                buildPieces("white", "red", "yellow", "black"),
            ),
        ).toStrictEqual(buildHints("white", "white", "white", null));
        expect(
            checkGuess(
                buildPieces("white", "blue", "white", "green"),
                buildPieces("green", "black", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "green", "yellow", "green"),
                buildPieces("white", "white", "black", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "white", "blue", "black"),
                buildPieces("green", "black", "black", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("green", "blue", "green", "yellow"),
                buildPieces("blue", "white", "black", "black"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "black", "green", "yellow"),
                buildPieces("yellow", "yellow", "white", "red"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("white", "black", "yellow", "yellow"),
                buildPieces("red", "yellow", "black", "red"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("green", "green", "blue", "yellow"),
                buildPieces("white", "red", "black", "black"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("white", "blue", "black", "green"),
                buildPieces("black", "red", "blue", "black"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", null));
        expect(
            checkGuess(
                buildPieces("blue", "black", "yellow", "green"),
                buildPieces("black", "yellow", "green", "blue"),
            ),
        ).toStrictEqual(buildHints("white", "white", "white", "white"));
        expect(
            checkGuess(
                buildPieces("yellow", "red", "green", "green"),
                buildPieces("green", "green", "yellow", "red"),
            ),
        ).toStrictEqual(buildHints("white", "white", "white", "white"));
        expect(
            checkGuess(
                buildPieces("blue", "black", "black", "yellow"),
                buildPieces("white", "red", "red", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("white", "yellow", "yellow", "red"),
                buildPieces("red", "white", "blue", "green"),
            ),
        ).toStrictEqual(buildHints("white", "white", null, null));
        expect(
            checkGuess(
                buildPieces("blue", "black", "green", "blue"),
                buildPieces("white", "white", "yellow", "black"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "white"));
        expect(
            checkGuess(
                buildPieces("blue", "blue", "white", "green"),
                buildPieces("green", "white", "yellow", "white"),
            ),
        ).toStrictEqual(buildHints("white", "white", null, null));
        expect(
            checkGuess(
                buildPieces("black", "yellow", "yellow", "yellow"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "white", "red", "yellow"),
                buildPieces("blue", "blue", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("white", "red", "red", "black"),
                buildPieces("yellow", "yellow", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "white", "red", "green"),
                buildPieces("yellow", "yellow", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "red", "black", "yellow"),
                buildPieces("green", "green", "green", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "yellow", "yellow", "red"),
                buildPieces("green", "green", "green", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "green", "green", "yellow"),
                buildPieces("blue", "blue", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "yellow", "black", "red"),
                buildPieces("green", "green", "green", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "blue", "green", "black"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "white", "black", "yellow"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("white", "green", "black", "red"),
                buildPieces("yellow", "yellow", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "green", "green", "white"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "black", "blue", "green"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("white", "red", "green", "white"),
                buildPieces("yellow", "yellow", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "blue", "white", "green"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "white", "blue", "white"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "black", "blue", "black"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "black", "black", "blue"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "red", "yellow", "green"),
                buildPieces("blue", "blue", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "red", "blue", "yellow"),
                buildPieces("green", "green", "green", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "green", "red", "red"),
                buildPieces("yellow", "yellow", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("white", "green", "white", "black"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "blue", "black", "red"),
                buildPieces("yellow", "yellow", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "blue", "black", "yellow"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "black", "black", "red"),
                buildPieces("yellow", "yellow", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "white", "black", "green"),
                buildPieces("green", "yellow", "blue", "red"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "white"));
        expect(
            checkGuess(
                buildPieces("blue", "white", "white", "yellow"),
                buildPieces("red", "black", "yellow", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", "white"));
        expect(
            checkGuess(
                buildPieces("red", "green", "yellow", "blue"),
                buildPieces("white", "blue", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", "white"));
        expect(
            checkGuess(
                buildPieces("green", "blue", "black", "blue"),
                buildPieces("yellow", "green", "blue", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", "white"));
        expect(
            checkGuess(
                buildPieces("green", "yellow", "white", "blue"),
                buildPieces("white", "black", "yellow", "black"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", null));
        expect(
            checkGuess(
                buildPieces("blue", "green", "yellow", "white"),
                buildPieces("red", "white", "blue", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("red", "black", "red", "blue"),
                buildPieces("yellow", "yellow", "blue", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", null));
        expect(
            checkGuess(
                buildPieces("yellow", "yellow", "white", "black"),
                buildPieces("white", "blue", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "white"));
        expect(
            checkGuess(
                buildPieces("yellow", "red", "white", "black"),
                buildPieces("red", "blue", "yellow", "blue"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", null));
        expect(
            checkGuess(
                buildPieces("red", "yellow", "black", "black"),
                buildPieces("black", "white", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "green", "white", "red"),
                buildPieces("green", "yellow", "yellow", "green"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "yellow", "yellow", "white"),
                buildPieces("blue", "black", "white", "red"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("black", "white", "yellow", "red"),
                buildPieces("blue", "green", "blue", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("yellow", "white", "yellow", "red"),
                buildPieces("red", "black", "black", "black"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "white", "green", "black"),
                buildPieces("red", "green", "red", "green"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, "white"));
        expect(
            checkGuess(
                buildPieces("green", "green", "white", "red"),
                buildPieces("blue", "white", "yellow", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("black", "blue", "red", "blue"),
                buildPieces("green", "red", "green", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, "white"));
        expect(
            checkGuess(
                buildPieces("black", "white", "yellow", "white"),
                buildPieces("red", "red", "green", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "yellow", "blue", "blue"),
                buildPieces("blue", "white", "black", "green"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("yellow", "red", "red", "blue"),
                buildPieces("green", "blue", "blue", "white"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("white", "black", "blue", "white"),
                buildPieces("black", "red", "white", "black"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", null));
        expect(
            checkGuess(
                buildPieces("green", "red", "red", "blue"),
                buildPieces("black", "white", "green", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", "white"));
        expect(
            checkGuess(
                buildPieces("black", "green", "blue", "blue"),
                buildPieces("white", "blue", "black", "white"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("blue", "black", "black", "blue"),
                buildPieces("white", "blue", "yellow", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("blue", "yellow", "white", "green"),
                buildPieces("green", "red", "blue", "yellow"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", "white"));
        expect(
            checkGuess(
                buildPieces("blue", "green", "red", "green"),
                buildPieces("green", "yellow", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", null));
        expect(
            checkGuess(
                buildPieces("yellow", "red", "green", "yellow"),
                buildPieces("white", "white", "red", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", "white"));
        expect(
            checkGuess(
                buildPieces("white", "blue", "black", "black"),
                buildPieces("yellow", "green", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", null));
        expect(
            checkGuess(
                buildPieces("blue", "yellow", "green", "yellow"),
                buildPieces("red", "red", "black", "black"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "black", "white", "green"),
                buildPieces("yellow", "yellow", "black", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", "white"));
        expect(
            checkGuess(
                buildPieces("yellow", "yellow", "yellow", "yellow"),
                buildPieces("black", "black", "black", "black"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "black", "green", "white"),
                buildPieces("yellow", "green", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("yellow", "black", "red", "yellow"),
                buildPieces("green", "blue", "black", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", null));
        expect(
            checkGuess(
                buildPieces("blue", "blue", "black", "blue"),
                buildPieces("white", "black", "blue", "green"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("yellow", "green", "blue", "blue"),
                buildPieces("red", "black", "white", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "black", "black", "black"),
                buildPieces("red", "blue", "blue", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "black", "red", "white"),
                buildPieces("white", "white", "blue", "green"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "white"));
        expect(
            checkGuess(
                buildPieces("yellow", "white", "red", "green"),
                buildPieces("black", "blue", "black", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "red", "yellow", "green"),
                buildPieces("red", "green", "green", "blue"),
            ),
        ).toStrictEqual(buildHints("white", "white", null, null));
        expect(
            checkGuess(
                buildPieces("black", "yellow", "black", "red"),
                buildPieces("blue", "red", "green", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("white", "black", "green", "green"),
                buildPieces("blue", "green", "red", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, "white"));
        expect(
            checkGuess(
                buildPieces("yellow", "white", "yellow", "red"),
                buildPieces("green", "red", "blue", "green"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("red", "green", "black", "black"),
                buildPieces("blue", "white", "green", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", null));
        expect(
            checkGuess(
                buildPieces("yellow", "blue", "red", "green"),
                buildPieces("green", "red", "blue", "yellow"),
            ),
        ).toStrictEqual(buildHints("white", "white", "white", "white"));
        expect(
            checkGuess(
                buildPieces("white", "black", "red", "black"),
                buildPieces("blue", "yellow", "yellow", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "white"));
        expect(
            checkGuess(
                buildPieces("blue", "green", "blue", "green"),
                buildPieces("white", "yellow", "white", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "green", "red", "black"),
                buildPieces("white", "white", "white", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "white"));
        expect(
            checkGuess(
                buildPieces("yellow", "white", "yellow", "blue"),
                buildPieces("white", "black", "blue", "green"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", null));
        expect(
            checkGuess(
                buildPieces("yellow", "yellow", "white", "black"),
                buildPieces("red", "green", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "white"));
        expect(
            checkGuess(
                buildPieces("white", "green", "white", "black"),
                buildPieces("green", "red", "black", "red"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", null));
        expect(
            checkGuess(
                buildPieces("green", "black", "green", "blue"),
                buildPieces("yellow", "white", "blue", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", null));
        expect(
            checkGuess(
                buildPieces("yellow", "green", "red", "white"),
                buildPieces("black", "red", "white", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("green", "yellow", "blue", "white"),
                buildPieces("yellow", "white", "yellow", "blue"),
            ),
        ).toStrictEqual(buildHints("white", "white", null, "white"));
        expect(
            checkGuess(
                buildPieces("white", "red", "green", "blue"),
                buildPieces("green", "blue", "white", "green"),
            ),
        ).toStrictEqual(buildHints("white", "white", "white", null));
        expect(
            checkGuess(
                buildPieces("green", "green", "yellow", "blue"),
                buildPieces("red", "blue", "green", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("black", "yellow", "yellow", "green"),
                buildPieces("green", "green", "white", "yellow"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "white"));
        expect(
            checkGuess(
                buildPieces("blue", "white", "yellow", "green"),
                buildPieces("white", "green", "red", "white"),
            ),
        ).toStrictEqual(buildHints("white", "white", null, null));
        expect(
            checkGuess(
                buildPieces("black", "black", "black", "white"),
                buildPieces("blue", "green", "red", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "green", "red", "green"),
                buildPieces("yellow", "red", "white", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("red", "black", "blue", "blue"),
                buildPieces("blue", "blue", "red", "green"),
            ),
        ).toStrictEqual(buildHints("white", "white", "white", null));
        expect(
            checkGuess(
                buildPieces("black", "black", "yellow", "red"),
                buildPieces("yellow", "yellow", "white", "black"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "white"));
        expect(
            checkGuess(
                buildPieces("blue", "black", "black", "black"),
                buildPieces("green", "red", "yellow", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("yellow", "red", "red", "white"),
                buildPieces("white", "blue", "green", "green"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "red", "black", "white"),
                buildPieces("blue", "white", "red", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", "white"));
        expect(
            checkGuess(
                buildPieces("red", "blue", "white", "green"),
                buildPieces("black", "white", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("blue", "green", "yellow", "black"),
                buildPieces("white", "black", "black", "red"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("green", "yellow", "yellow", "white"),
                buildPieces("white", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "green", "white", "black"),
                buildPieces("blue", "yellow", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", null));
        expect(
            checkGuess(
                buildPieces("yellow", "black", "red", "blue"),
                buildPieces("green", "yellow", "green", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, "white"));
        expect(
            checkGuess(
                buildPieces("blue", "green", "green", "white"),
                buildPieces("white", "yellow", "red", "black"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("white", "yellow", "black", "yellow"),
                buildPieces("yellow", "black", "white", "red"),
            ),
        ).toStrictEqual(buildHints("white", "white", "white", null));
        expect(
            checkGuess(
                buildPieces("green", "black", "black", "blue"),
                buildPieces("red", "blue", "yellow", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, "white"));
        expect(
            checkGuess(
                buildPieces("green", "black", "green", "green"),
                buildPieces("yellow", "white", "black", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", null));
        expect(
            checkGuess(
                buildPieces("yellow", "white", "black", "green"),
                buildPieces("black", "blue", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", "white"));
        expect(
            checkGuess(
                buildPieces("red", "green", "white", "yellow"),
                buildPieces("yellow", "red", "green", "red"),
            ),
        ).toStrictEqual(buildHints("white", "white", "white", null));
        expect(
            checkGuess(
                buildPieces("yellow", "blue", "red", "green"),
                buildPieces("red", "white", "white", "yellow"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "white"));
        expect(
            checkGuess(
                buildPieces("green", "blue", "red", "blue"),
                buildPieces("blue", "white", "blue", "white"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", null));
        expect(
            checkGuess(
                buildPieces("white", "white", "white", "white"),
                buildPieces("yellow", "yellow", "black", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("yellow", "white", "yellow", "yellow"),
                buildPieces("white", "black", "blue", "blue"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "yellow", "black", "green"),
                buildPieces("white", "green", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("red", "blue", "green", "red"),
                buildPieces("yellow", "yellow", "red", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", "white"));
        expect(
            checkGuess(
                buildPieces("blue", "white", "white", "blue"),
                buildPieces("black", "red", "black", "black"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "blue", "blue", "white"),
                buildPieces("red", "red", "white", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, "white", "white"));
        expect(
            checkGuess(
                buildPieces("white", "white", "black", "yellow"),
                buildPieces("black", "red", "yellow", "red"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", null));
        expect(
            checkGuess(
                buildPieces("white", "red", "red", "red"),
                buildPieces("green", "green", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("yellow", "white", "green", "black"),
                buildPieces("green", "blue", "red", "red"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "blue", "yellow", "red"),
                buildPieces("white", "black", "blue", "white"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("white", "blue", "blue", "red"),
                buildPieces("red", "green", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "black", "white", "white"),
                buildPieces("green", "yellow", "red", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "blue", "blue", "red"),
                buildPieces("yellow", "black", "black", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("black", "white", "black", "white"),
                buildPieces("white", "red", "blue", "green"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "red", "green", "yellow"),
                buildPieces("yellow", "blue", "blue", "red"),
            ),
        ).toStrictEqual(buildHints("white", "white", null, "white"));
        expect(
            checkGuess(
                buildPieces("black", "red", "red", "green"),
                buildPieces("green", "white", "blue", "red"),
            ),
        ).toStrictEqual(buildHints("white", null, null, "white"));
        expect(
            checkGuess(
                buildPieces("blue", "black", "red", "blue"),
                buildPieces("black", "green", "blue", "black"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", null));
        expect(
            checkGuess(
                buildPieces("green", "yellow", "yellow", "red"),
                buildPieces("black", "red", "red", "black"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("red", "green", "black", "white"),
                buildPieces("green", "yellow", "green", "green"),
            ),
        ).toStrictEqual(buildHints("white", null, null, null));
        expect(
            checkGuess(
                buildPieces("green", "yellow", "red", "yellow"),
                buildPieces("black", "green", "black", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("black", "blue", "white", "red"),
                buildPieces("green", "red", "green", "green"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("red", "yellow", "yellow", "red"),
                buildPieces("green", "black", "black", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "yellow", "green", "blue"),
                buildPieces("black", "black", "white", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "white"));
        expect(
            checkGuess(
                buildPieces("red", "white", "black", "red"),
                buildPieces("green", "yellow", "blue", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("blue", "black", "green", "green"),
                buildPieces("red", "red", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("white", "green", "black", "green"),
                buildPieces("yellow", "white", "green", "blue"),
            ),
        ).toStrictEqual(buildHints(null, "white", "white", null));
        expect(
            checkGuess(
                buildPieces("red", "black", "yellow", "blue"),
                buildPieces("white", "green", "green", "white"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("yellow", "red", "white", "white"),
                buildPieces("green", "black", "black", "green"),
            ),
        ).toStrictEqual(buildHints(null, null, null, null));
        expect(
            checkGuess(
                buildPieces("red", "green", "yellow", "red"),
                buildPieces("green", "red", "white", "black"),
            ),
        ).toStrictEqual(buildHints("white", "white", null, null));
        expect(
            checkGuess(
                buildPieces("yellow", "black", "blue", "yellow"),
                buildPieces("red", "green", "red", "blue"),
            ),
        ).toStrictEqual(buildHints(null, null, null, "white"));
        expect(
            checkGuess(
                buildPieces("blue", "white", "green", "green"),
                buildPieces("green", "red", "white", "blue"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", "white"));
        expect(
            checkGuess(
                buildPieces("red", "red", "black", "blue"),
                buildPieces("black", "white", "blue", "black"),
            ),
        ).toStrictEqual(buildHints("white", null, "white", null));
        expect(
            checkGuess(
                buildPieces("red", "black", "yellow", "green"),
                buildPieces("green", "yellow", "green", "yellow"),
            ),
        ).toStrictEqual(buildHints("white", "white", null, null));
        expect(
            checkGuess(
                buildPieces("blue", "green", "black", "white"),
                buildPieces("red", "white", "red", "red"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, null));
        expect(
            checkGuess(
                buildPieces("black", "yellow", "white", "blue"),
                buildPieces("red", "blue", "blue", "white"),
            ),
        ).toStrictEqual(buildHints(null, "white", null, "white"));
    });
});
