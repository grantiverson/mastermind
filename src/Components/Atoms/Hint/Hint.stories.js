import React from "react";

import { hintColors } from "../../../utility";

import Hint from ".";

export default {
    argTypes: {
        color: { control: "select", options: Object.values(hintColors) },
    },
    component: Hint,
    title: "Components/Atoms/Hint",
};

const Template = (args) => <Hint {...args} />;

export const _Hint = Template.bind({});
_Hint.args = {
    color: undefined,
};
