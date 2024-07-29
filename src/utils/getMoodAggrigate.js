export const getMoodAggrigate = (moodArr) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  return Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;
};
