import React from 'react';
import WeatherAvg from './WeatherAvg';

export default function WeatherAudit(props) {
  let clear = [];
  let clouds = [];
  let rain = [];
  let snow = [];
  let outlier = [];

  props.logs.map(log => {
    switch (log.weatherType) {
      case 'Clear':
        clear.push(log);
        break;
      case 'Clouds':
      case 'Mist':
        clouds.push(log);
        break;
      case 'Snow':
        snow.push(log);
        break;
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
        rain.push(log);
        break;
      default:
        outlier.push(log);
        break;
    }
    return log;
  });

  return (
    <div className='weather-audit'>
      <span className='header'>
        <span>Weather</span>
        <span>Mood Average</span>
        <span className='header-productivity'>Productivity Average</span>
      </span>
      <div className='weather-avg'>
        <WeatherAvg weather={'Clear'} logs={clear} />
        <WeatherAvg weather={'Clouds'} logs={clouds} />
        <WeatherAvg weather={'Rain'} logs={rain} />
        <WeatherAvg weather={'Snow'} logs={snow} />
      </div>
    </div>
  );
}
