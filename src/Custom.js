import React from "react";
import Node from "./Node";
import Surface from "./Surface";

export default (props) => (
    <Node {...props}>
        <Surface color='tomato'/>
    </Node>
);
