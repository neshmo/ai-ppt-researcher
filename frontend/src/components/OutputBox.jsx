import React from "react";

const OutputBox = ({ events }) => {
    if (!events.length) return null;

    return (
        <div className="bg-white shadow-md p-5 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-3">Progress</h2>

            <ul className="space-y-2">
                {events.map((e, i) => (
                    <li key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <strong>{e.event.toUpperCase()}</strong>
                        <div>{e.message}</div>
                        {e.step && <div>Step {e.step}</div>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OutputBox;
