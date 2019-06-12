const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('Express Server App', () => {
  it('should return a response of json', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('should return an array of books', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .then(data => {
        expect(data.body).to.be.an('array');
      });
  });

  it('should return objects with all keys present', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .then(data => {
        const app = data.body[0];
        expect(app).to.include.all.keys('App','Category','Rating','Reviews','Size','Installs','Type','Price','Content Rating','Genres','Last Updated','Current Ver','Android Ver');
      });
  });
  
  it('should accurately limit the expected genres', () => {
    // stuff here, use the .includes
    return request(app)
      .get('/apps')
      .expect(200)
      .then(data => {
        const genreArray = data.body.map(obj => {
          return obj.Genres;
        });
        expect(genreArray).to.include(['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'])
      });
  });

  it('should ensure the comparison between user entry and the playstore Genres are identical', () => {
    // create a dummy genre and import results to ensure the comparison is correct
  });

  it('sorts properly by rating', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'Rating'})
      .expect(200)
      .then(data => {
        expect(data.body).to.be.an('array');
        let i = 0;
        let sorted = true;
        while(sorted && i < data.body.length - 1) {
          sorted = sorted && data.body[i].Rating < data.body[i + 1].Rating;
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});
