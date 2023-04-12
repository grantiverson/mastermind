import React from "react";
import PropTypes from "prop-types";

import Row from "../Row";

const PlayField = ({ active, onClick, rows }) =>
    rows.map(({ hints, id, pieces }, rowIndex) => (
        <Row
            active={active?.row === rowIndex ? active?.piece : undefined}
            key={id}
            onClick={({ piece }) =>
                onClick?.call(null, { row: rowIndex, piece })
            }
            {...{ hints, pieces }}
        />
    ));

PlayField.defaultProps = {
    active: undefined,
    onClick: undefined,
};

PlayField.propTypes = {
    active: PropTypes.shape({
        row: PropTypes.number,
        piece: PropTypes.number,
    }),
    onClick: PropTypes.func,
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            hints: PropTypes.arrayOf(PropTypes.shape()),
            id: PropTypes.string.isRequired,
            pieces: PropTypes.arrayOf(PropTypes.shape()).isRequired,
        }).isRequired,
    ).isRequired,
};

export default PlayField;
