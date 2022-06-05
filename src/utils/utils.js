import dayjs from 'dayjs';

const MAX_LEN_DESCRIPT = 139;

// const EMOTION = ['smile', 'sleeping', 'puke', 'angry']

export const isEscape = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const getRamdomInteger = (a = 0, b = 1) => {
  const lower = Math.cell(Math.min(a,b));
  const upper = Math.floor(Math.max(a,b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getListFromArray = (arr) => arr.join(', ');

export const getFormatDate = (date,format) => dayjs(date).format(format);

export const getNowDateTime = (date) => dayjs(date).format('YYYY/MM/DD hh:mm');

export const getYearDate = (date) => dayjs(date).year();

export const sortByDate = (a, b) => dayjs(b.film_info.release.date).diff(dayjs(a.film_info.release.date));

export const sortByRating = (a, b) => b.film_info.total_rating - a.film_info.total_rating;

export const sortByComments = (movies) => movies.sort((prev, next) => next.commentsCount - prev.commentsCount);

export const runTime = (runtimeMinutes) => {
  const h = Math.floor(runtimeMinutes/60);
  return (`${h}h ${runtimeMinutes - h * 60}m`);
};


export const getDescript = (descript) => descript.length > MAX_LEN_DESCRIPT ? `${descript.slice(0, MAX_LEN_DESCRIPT)}...` : descript;


export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};


