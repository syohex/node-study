import React from 'react';

export function Ingredient({ amount, measurement, name }) {
    return (
        <li>
            {amount} {measurement} {name}
        </li>
    );
}