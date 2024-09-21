import React from 'react';

const StateFilter = ({ filter, states = [] }) => {
  return (
    <div>
      <select name='state' onChange={filter}>
        <option selected>Filter by State:</option>
        {states.map((state, key) => {
          return (
            <option key={key} value={state}>
              {state}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default StateFilter;
