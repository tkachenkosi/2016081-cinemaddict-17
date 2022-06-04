function selectFn() {
  let ok = false;
  return function() {
    return (ok = !ok);
  };
}

function genId() {
  let i = 1;
  return function() {
    return i++;
  };
}

const select = selectFn();
const id = genId();

const generateMove = () => {
  if (select()) {
    return {
      id: id(),
      comments: [21, 22, 23, 24, 25],
      'film_info': {
        title: 'The Dance of Life',
        'alternative_title': 'Laziness Who Sold Themselves',
        'total_rating': 5.3,
        poster: 'images/posters/the-dance-of-life.jpg',
        ageRating: 0,
        director: 'Tom Ford',
        writers: [
          'Takeshi Kitano'
        ],
        actors: [
          'Morgan Freeman'
        ],
        release: {
          date: '1925-05-11T00:00:00.000Z',
          'release_country': 'Finland'
        },
        runtime: 77,
        genre: [
          'Musical'
        ],
        description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic \'Nu, Pogodi!\' and \'Alice in Wonderland\', with the best fight scenes since Bruce Lee.'
      },
      userDetails: {
        watchlist: false,
        'already_watched': true,
        'watching_date': '2019-04-12T16:12:32.554Z',
        favorite: false
      }
    };
  } else {
    return {
      id: id(),
      comments: [31, 32, 33],
      'film_info': {
        title: 'Sagebrush Trail',
        'alternative_title': 'Laziness Who Sold Themselves',
        'total_rating': 3.2,
        poster: 'images/posters/sagebrush-trail.jpg',
        ageRating: 0,
        director: 'Игорь Апасян',
        writers: [
          'Валерий Тодоровский'
        ],
        actors: [
          'Любомирас Лауцявичюс'
        ],
        release: {
          date: '1990-08-19T00:00:00.000Z',
          'release_country': 'Россия'
        },
        runtime: 102,
        genre: [
          'Western'
        ],
        description: 'Приключенческий фильм по мотивам одноименного романа Джека Лондона. Капитан Ларсен носил прозвище "Волк", но явно считал себя и Богом, и Дьяволом на своем рыболовном судне "Призрак". На борт "Призрака" однажды был поднят из воды молодой человек по имени Хэмфри Ван-Вейден, уцелевший после одного довольно странного кораблекрушения. Хэмфри не один раз стал свидетелем жестокости капитана Ларсена, прежде чем пришел к мысли о необходимости бунта. Хотя бы ради того, чтобы остаться в живых...'
      },
      userDetails: {
        watchlist: false,
        'already_watched': true,
        'watching_date': '2019-06-12T16:12:32.554Z',
        favorite: false
      }
    };
  }

};


export {generateMove};

