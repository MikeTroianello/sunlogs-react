import React from 'react';

export default function StateFilter(props) {
  return (
    <div>
      <select name='state' onChange={props.filter}>
        <option selected>Filter by State:</option>
        {props.states.map((state, key) => {
          return (
            <option key={key} value={state}>
              {state}
            </option>
          );
        })}
      </select>
    </div>
  );
}
