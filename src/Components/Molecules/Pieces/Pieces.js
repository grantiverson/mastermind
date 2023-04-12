import React from "react";
import PropTypes from "prop-types";

import Piece from "../../Atoms/Piece";

import "./Pieces.scss";

const Pieces = ({ active, pieces, ...rest }) => (
    <div className="pieces">
        {pieces.map(({ color, id }, i) => (
            <Piece
                piece={i}
                isActive={active === i}
                key={id}
                {...{ color }}
                {...rest}
            />
        ))}

        <div className="hide-solution" />
    </div>
);

Pieces.defaultProps = {
    active: undefined,
};

Pieces.propTypes = {
    active: PropTypes.number,
    pieces: PropTypes.arrayOf(
        PropTypes.shape({ color: PropTypes.string, id: PropTypes.string }),
    ).isRequired,
};

export default Pieces;
