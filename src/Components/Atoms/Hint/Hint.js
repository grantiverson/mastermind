import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { hintColors } from "../../../utility";

import "./Hint.scss";

const Hint = ({ color }) => (
    <div className={cx("hint", color && `hint--${color}`)} />
);

Hint.defaultProps = {
    color: undefined,
};

Hint.propTypes = {
    color: PropTypes.oneOf(Object.values(hintColors)),
};

export default Hint;
