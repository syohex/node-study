import React from 'react';
import { Color } from './Color';

export function ColorList({ colors = [] }) {
    if (colors.length == 0) {
        return <div>No Color Listed.</div>
    }

    return (
        <div>
            {
                colors.map(color => <Color key={color.id} {...color} />)
            }
        </div>
    );
}