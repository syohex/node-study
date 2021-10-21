import React from 'react';

export function Instructions({ title, steps }) {
    return (
        <section className="instructions">
            <h2>{title}</h2>
            {steps.map((s, i) => (
                <p key={i}>{s}</p>
            ))}
        </section>
    );
}