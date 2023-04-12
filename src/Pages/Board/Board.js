import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { guessColors } from "../../utility";

import { Pieces } from "../../Components/Molecules";
import { ConnectedPlayField, Row } from "../../Components/Organisms";

import "./Board.scss";

const Board = ({ onClick, solution, isSolved }) => (
    <div className={cx("board", isSolved && "board--is-solved")}>
        <Row className="row--solution" pieces={solution} />
        <ConnectedPlayField />
        <Pieces
            pieces={guessColors.map((color) => ({ color, id: color }))}
            {...{ onClick }}
        />
    </div>
);

Board.defaultProps = {
    onClick: undefined,
    solution: undefined,
};

Board.propTypes = {
    onClick: PropTypes.func,
    solution: PropTypes.arrayOf(PropTypes.shape({})),
    isSolved: PropTypes.bool.isRequired,
};

export default Board;
