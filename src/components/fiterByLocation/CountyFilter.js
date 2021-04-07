import React from 'react';

export default function CountyFilter(props) {
  return (
    <div>
      <select name='county' onChange={props.filter}>
        <option selected>Filter by County:</option>
        {props.counties.map((county, key) => {
          return (
            <option key={key} value={county}>
              {county}
            </option>
          );
        })}
      </select>
    </div>
  );
}
