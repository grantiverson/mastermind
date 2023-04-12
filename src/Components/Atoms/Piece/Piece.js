import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./Piece.scss";

const Piece = (props) => {
    const { color, isActive, onClick } = props;

    return (
        <button
            aria-label={cx(color, "piece")}
            className={cx(
                "piece",
                isActive && "piece--active",
                color && `piece--${color}`,
            )}
            onClick={() => onClick?.call(null, props)}
            type="button"
        />
    );
};

Piece.defaultProps = {
    color: undefined,
    isActive: false,
    onClick: undefined,
};

Piece.propTypes = {
    color: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Piece;
