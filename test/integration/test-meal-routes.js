process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var knex = require('../../db/knex')
var should = chai.should();


chai.use(chaiHttp);

describe('API routes', function(){

  beforeEach(function(done) {
    knex.migrate.rollback.then(function() {
        knex.migrate.latest()
          .then(function() {
              return knex.seed.run().then(function() {
                  done()
               });
          })
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback().then(function() {
        done();
    });
  });

  describe('Get all meals', function() {

      it('should get all meals', function(done){
          chai.request(server)
          .get('/meals')
          .end(function(err, res)  {
            res.status.should.equal(200);
            res.type.should.equal('application/json');
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('data');
            res.body.status.should.equal('success');
            res.body.data.should.be.a('array');
            res.body.data.length.should.equal(2);
            res.body.data[0].base_price.should.equal(25.50);
            res.body.data[0].tax_rate.should.equal(8.25);
            res.body.data[0].tip_rate.should.equal(15);
            done();
          });
      })
  });
    describe('/POST a meal', function() {
      it('should create a new meal', function(done) {
        chai.request(server)
        .post('/addmeal')
        .send({
          base_price: 40.50,
          tax_rate: 8.25,
          tip_rate: 20
        })
        .end(function(err, res) {
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('data');
          res.body.status.should.equal('success');
          res.body.data.should.be.a('object');
          res.body.data.base_price.should.equal(40.50);
          res.body.data.tax_rate.should.equal(8.25);
          res.body.data.tip_rate.should.equal(20);
          done();
         });
      });
    });
});
