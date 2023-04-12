import React from "react";
import PropTypes from "prop-types";

import { Hint } from "../../Atoms";

import "./Hints.scss";

const Hints = ({ hints = [] }) => {
    const _hints = [...hints].sort(({ color: a }, { color: b }) => {
        if (a === null) return 1;
        if (b === null) return -1;
        return a.localeCompare(b);
    });
    const displayedHints = [
        _hints[0] || { color: null, id: "missing-hint-0" },
        _hints[1] || { color: null, id: "missing-hint-1" },
        _hints[2] || { color: null, id: "missing-hint-2" },
        _hints[3] || { color: null, id: "missing-hint-3" },
    ];

    return (
        <div className="hints">
            {!!hints.length &&
                displayedHints.map(({ color, id }) => (
                    <Hint key={id} {...{ color }} />
                ))}
        </div>
    );
};

Hints.defaultProps = {
    hints: undefined,
};

Hints.propTypes = {
    hints: PropTypes.arrayOf(
        PropTypes.shape({ id: PropTypes.string, value: PropTypes.string }),
    ),
};

export default Hints;
