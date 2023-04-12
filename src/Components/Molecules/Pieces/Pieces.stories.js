import React, { useState } from "react";

import { buildPieces } from "../../../utility";

import Pieces from "./Pieces";

export default {
    argTypes: {
        active: { control: "number" },
        pieces: { control: "object" },
    },
    component: Pieces,
    title: "Components/Molecules/Pieces",
};

const Template = ({ active, ...args }) => {
    const [_active, setActive] = useState(active);
    const onClick = ({ piece }) => setActive(piece);

    return <Pieces {...args} active={_active} onClick={onClick} />;
};

Template.propTypes = Pieces.propTypes;

export const _Pieces = Template.bind({});
_Pieces.args = {
    active: 1,
    pieces: buildPieces("yellow", "green", "blue", "blue"),
};
