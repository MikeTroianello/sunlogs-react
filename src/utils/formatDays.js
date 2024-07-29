export const getYear = () => {
  let today = new Date();
  let dateArray = today.toString().split(' ');
  let year = dateArray[3];
  return year;
};

export const getDay = () => {
  let today = new Date();
  let start = new Date(today.getFullYear(), 0, 0);
  let diff =
    today -
    start +
    (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
  let oneDay = 1000 * 60 * 60 * 24;
  let day = Math.floor(diff / oneDay);
  return day;
};

export const getAllDayInfo = () => {
  let today = new Date();
  var start = new Date(today.getFullYear(), 0, 0);
  var diff =
    today -
    start +
    (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
  var oneDay = 1000 * 60 * 60 * 24;
  let todayString = today.toString().split(' ');
  var day = Math.floor(diff / oneDay);
  let year = Number(todayString[3]);
  const month = Number(todayString[2]);
  const dayOfWeek = todayString[0];

  return {
    day,
    month,
    year,
    dayOfWeek,
  };
};
