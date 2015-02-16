'use strict';

require('../frameworktest');
var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');

chai.use(chaihttp);

var expect = chai.expect;

function checkForExistingJSON() { 
  try {
    fs.unlinkSync('./unicorns/josh.json');
    return 'deleted old data';
  } catch(e) {
    return 'no such file';
  }
}

checkForExistingJSON();

describe('the server', function() {

 it('should POST', function(done) {
   chai.request('localhost:3000')
     .post('/unicorns/josh')
     .send({"data":"oh honey"})
     .end(function(err, res) {
       expect(err).to.eql(null);
       expect(res).to.have.status(200);
       expect(res.text).to.eql('{"data":"oh honey","system_says":"this shit was posted."}');
       done();
     });
 });

  it('should PUT', function(done) {
   chai.request('localhost:3000')
     .put('/unicorns/josh')
     .send({"data":"oh money","system_says":"this shit was put."})
     .end(function(err, res) {
       expect(err).to.eql(null);
       expect(res).to.have.status(200);
       expect(res.text).to.eql('{"data":"oh money","system_says":"this shit was put"}');
       done();
     });
 });

 it('should PATCH ', function(done) {
   chai.request('localhost:3000')
     .patch('/unicorns/josh')
     .send({"useless_key":"unused","data":"patched key"})
     .end(function(err, res) {
       expect(err).to.eql(null);
       expect(res).to.have.status(200);
       expect(res.text).to.eql('{"keys_patched":"data,system_says"}');
       done();
     });
 });

  it('should GET ', function(done) {
   chai.request('localhost:3000')
     .get('/unicorns/josh')
     .end(function(err, res) {
       expect(err).to.eql(null);
       expect(res).to.have.status(200);
       expect(res.text).to.eql('{"data":"patched key","system_says":"this shit was patched"}');
       done();
     });
 });

 it('should DELETE ', function(done) {
   chai.request('localhost:3000')
     .del('/unicorns/josh')
     .end(function(err, res) {
       expect(err).to.eql(null);
       expect(res).to.have.status(200);
       expect(res.text).to.eql('{"system_says":"Your file deleted, master"}');
       done();
     });
 });

 it('should give a 404 message for any unspecified routes', function(done) {
   chai.request('localhost:3000')
     .get('/unspecified routes/')
     .end(function(err, res) {
       expect(err).to.eql(null);
       expect(res).to.have.status(404);
       expect(res.text).to.eql('file not found');
       done();
     });
 });

});