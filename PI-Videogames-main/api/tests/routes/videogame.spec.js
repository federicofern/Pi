/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    );
  });
});
 

/* var supertest = require("supertest-as-promised")(require("../../src/app"));
var expect = require("chai").expect;
var model = require("../../src/controllers/findAll.controllers");

describe("Routes", function () {
   beforeEach(function () {
    model.reset();
  }); 

  describe("/videogames", async function () {
    it("POST agrega una nueva casa y devuelve el nombre de la casa agregada", function () {
      return await supertest
        .post("/videogame")
        .send({
          name: "La Mancha",
          rating: "4.00",
          background_image: "www.lamancha.com/juego.jpg",
          description: 'un juego mas',
          platforms: ['Wii', 'Wii2'],
          released: '01.01.22'
        })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (done) {
           expect(model.createGame()).to.have.length(1);
        });
    });
  })
}) */