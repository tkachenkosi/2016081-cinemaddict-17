import dayjs from 'dayjs';

const MAX_LEN_DESCRIPT = 139;

// const EMOTION = ['smile', 'sleeping', 'puke', 'angry']

export const getRamdomInteger = (a = 0, b = 1) => {
  const lower = Math.cell(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getListFromArray = (arr) => arr.join(', ');

export const getFormatDate = (date,format) => dayjs(date).format(format);

export const getNowDateTime = (date) => dayjs(date).format('YYYY/MM/DD hh:mm');

export const getYearDate = (date) => dayjs(date).year();

export const runTime = (runtimeMinutes) => {
  const h = Math.floor(runtimeMinutes/60);
  return (`${h}h ${runtimeMinutes - h * 60}m`);
};

export const getDescript = (descript) => descript.length > MAX_LEN_DESCRIPT ? `${descript.slice(0, MAX_LEN_DESCRIPT)}...` : descript;

