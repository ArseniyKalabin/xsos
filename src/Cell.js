import React from 'react';

const cell = props => <div className="cell" onClick={() => props.click(props.id)}>{props.value}</div>;

export default cell;