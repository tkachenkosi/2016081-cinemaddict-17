const generateMove = () => (
  {
    id: 0,
    comments: [42, 43],
    'film_info': {
      title: 'A Little Pony Without The Carpet',
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
        date: '2019-05-11T00:00:00.000Z',
        'release_country': 'Finland'
      },
      runtime: 77,
      genre: [
        'Comedy'
      ],
      description: 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic \'Nu, Pogodi!\' and \'Alice in Wonderland\', with the best fight scenes since Bruce Lee.'
    },
    userDetails: {
      watchlist: false,
      'already_watched': true,
      'watching_date': '2019-04-12T16:12:32.554Z',
      favorite: false
    }
  });


export {generateMove};

