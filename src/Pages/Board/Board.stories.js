import React, { useState } from "react";
import { Provider } from "react-redux";

import store from "../../redux";

import Board from "./ConnectedBoard";

export default {
    component: Board,
    title: "Pages/Board",
};

export const _Board = ({ active, ...args }) => {
    const [_active, setActive] = useState(active);
    const onClick = (newActive) => setActive(newActive);

    return (
        <Provider {...{ store }}>
            <Board {...args} active={_active} onClick={onClick} />
        </Provider>
    );
};
