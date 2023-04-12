import React from "react";

import { buildHints } from "../../../utility";

import Hints from ".";

export default {
    argTypes: {
        hints: { control: "object" },
    },
    component: Hints,
    title: "Components/Molecules/Hints",
};

const Template = (args) => <Hints {...args} />;

export const _Hints = Template.bind({});
_Hints.args = {
    hints: buildHints(null, "white", "black", null),
};
