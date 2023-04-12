import React, { useState } from "react";

import { buildHints, buildPieces } from "../../../utility";

import Row from "./Row";

export default {
    argTypes: {
        active: { control: "number" },
        hints: { control: "object" },
        pieces: { control: "object" },
    },
    component: Row,
    title: "Components/Organisms/Row",
};

const Template = ({ active, ...args }) => {
    const [_active, setActive] = useState(active);
    const onClick = ({ piece }) => setActive(piece);

    return <Row {...args} active={_active} onClick={onClick} />;
};

Template.propTypes = Row.propTypes;

export const _Row = Template.bind({});
_Row.args = {
    active: 1,
    hints: buildHints("black", "white", null, null),
    pieces: buildPieces("yellow", "green", "blue", "blue"),
};
