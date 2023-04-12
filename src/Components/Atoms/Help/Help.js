import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import "./Help.scss";

const Help = () => (
    <>
        <div className="help" data-tooltip-place="bottom">
            <FontAwesomeIcon icon={faQuestion} />
        </div>

        <Tooltip anchorSelect=".help" className="help__tooltip">
            <p>
                This top row hides a code of 4 randomly chosen colors. Your goal
                is to break the code in the fewest guesses.
            </p>
            <p>
                After each guess you will receive hints for correctly guessed
                colors. Each black hint means you have a correct color in the
                correct position. Each white hint means you have a correct color
                in the wrong position.
            </p>
        </Tooltip>
    </>
);

export default Help;
