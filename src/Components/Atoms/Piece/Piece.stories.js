import React from "react";

import { guessColors } from "../../../utility";

import Piece from "./Piece";

export default {
    argTypes: {
        color: { control: "select", options: guessColors },
        isActive: { control: "boolean" },
        onClick: { action: "clicked" },
    },
    component: Piece,
    title: "Components/Atoms/Piece",
};

const Template = (args) => <Piece {...args} />;

export const _Piece = Template.bind({});
_Piece.args = {
    isActive: false,
    color: undefined,
};
