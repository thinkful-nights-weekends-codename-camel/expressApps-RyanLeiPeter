const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');
const allGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

describe('Express Server App', () => {
  it('accurately limits the expected genres', () => {
    // stuff here, use the .includes
    return request(app)
      .get('/apps')
      .expect(200)
      .then(data => {
        const genreArray = data.body.map(obj => {
          return obj.Genres;
        });
        expect(genreArray).to.include(allGenres)
      })
  });

  it('ensures the comparison between user entry and the store value are identical', () => {
    // create a dummy genre and import results to ensure the comparison is correct
  });

  it('sorts properly by rating', () => {
    // 
  });

  it('', () => {
    // 
  });

});