import React, { useState } from "react";

import { buildHints, buildPieces } from "../../../utility";

import PlayField from "./PlayField";

export default {
    argTypes: {
        active: { control: "object" },
        onClick: { action: "click" },
        rows: { control: "object" },
    },
    component: PlayField,
    title: "Components/Organisms/PlayField",
};

const hints = buildHints(null, null, null, null);
const pieces = buildPieces(null, null, null, null);
const rows = [
    { hints, id: "row-0", pieces },
    { hints, id: "row-1", pieces },
    { hints, id: "row-2", pieces },
    { hints, id: "row-3", pieces },
    { hints, id: "row-4", pieces },
    { hints, id: "row-5", pieces },
    { hints, id: "row-6", pieces },
    {
        hints: buildHints("black", "white", null, null),
        id: "row-7",
        pieces: buildPieces("yellow", "green", "blue", "blue"),
    },
];

const Template = ({ active, ...args }) => {
    const [_active, setActive] = useState(active);
    const onClick = (newActive) => setActive(newActive);

    return <PlayField {...args} active={_active} onClick={onClick} />;
};

Template.propTypes = PlayField.propTypes;

export const _PlayField = Template.bind({});
_PlayField.args = {
    active: { row: 7, piece: 0 },
    rows,
};
