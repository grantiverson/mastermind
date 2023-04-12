export const guessColors = ["red", "yellow", "green", "blue", "black", "white"];
export const hintColors = { 1: "white", 2: "black" };

/**
 * @function buildHints
 * @description Generate an array from the provided hint colors.
 * @param {string} colors Arbitrary number of strings. Each must be one of the
 *      following options: "black", "white"
 * @returns {Array.<object>} Array of hint color objects
 */
export const buildHints = (...colors) =>
    colors.reduce(
        // eslint-disable-next-line default-param-last
        (arr, color, i) => arr.concat({ color, id: `hint-${i}` }),
        [],
    );

/**
 * @function buildPieces
 * @description Generate an array from the provided piece colors.
 * @param {string} colors Arbitrary number of strings. Each must be one of the
 *      following options: "red", "yellow", "green", "blue", "black", "white"
 * @returns {Array.<object>} Array of piece color objects
 */
export const buildPieces = (...colors) =>
    colors.reduce(
        (arr, color, i) => arr.concat({ color, id: `piece-${i}` }),
        [],
    );

/**
 * @function checkGuess
 * @description Compare a row's guess pieces to the solution.
 * @param {Array.<object>} solution Array of piece color objects representing
 *      the game solution
 * @param {Array.<object>} guess Array of piece color objects for the row the
 *      player is currently on
 * @returns {Array.<object>} Array of hint color objects
 */
export const checkGuess = (solution, guess) => {
    const solutionColors = solution.map((piece) => piece.color);
    const guessedColors = guess.map((piece) => piece.color);
    const hints = [null, null, null, null];

    if (solutionColors.length !== 4 || guessedColors.length !== 4) {
        return undefined;
    }

    // add black hints (piece matches and is in the right place)
    hints.forEach((_, i) => {
        if (guessedColors[i] === solutionColors[i]) {
            hints[i] = "black";
            // replace guess and solution color to avoid double matching
            guessedColors[i] = "matched";
            solutionColors[i] = "matched";
        }
    });

    // add white hints (piece matches, but is in the wrong place)
    guessedColors.forEach((_, i) => {
        solutionColors.forEach((__, j) => {
            if (
                guessedColors[i] === solutionColors[j] &&
                guessedColors[i] !== "matched"
            ) {
                hints[i] = "white";
                // replace guess and solution color to avoid double matching
                guessedColors[i] = "matched";
                solutionColors[j] = "matched";
            }
        });
    });

    return buildHints(...hints);
};

/**
 * @function generateRandomPieceColor
 * @description Get a random color string from `guessColors` array
 * @returns {string} Piece color string
 */
export const generateRandomPieceColor = () =>
    guessColors[Math.floor(Math.random() * 6)];

/**
 * @function generateSolution
 * @description Build a random solution
 * @returns {Array.<object>} Array of piece color objects
 */
export const generateSolution = () =>
    buildPieces(
        generateRandomPieceColor(),
        generateRandomPieceColor(),
        generateRandomPieceColor(),
        generateRandomPieceColor(),
    );
