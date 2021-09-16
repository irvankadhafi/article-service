const request = require("supertest");
const chai = require('chai')
const expect = chai.expect;
chai.use(require('chai-things'));

describe('POST /articles', () => {
    it('it should POST the article', (done) => {
        const body = {
            author : 'Irvan Kadhafi',
            title : 'Judul dari integration testing kedua',
            body : 'Node.js adalah platform perangkat lunak pada sisi peladen dan aplikasi jaringan. Ditulis dengan bahasa JavaScript dan dijalankan pada Windows, Mac OS X, dan Linux tanpa perubahan kode program.',
        }
        request('localhost:3001')
            .post('/articles')
            .send(body)
            .end((err, res) => {
                if(err){
                    done(err)
                } else {
                    expect(res.statusCode).equal(200);
                    expect(typeof res.body).equal("object");
                    done()
                }
            })
    });

    it('it should not POST the article', (done) => {
        const body = {
            author : '',
            title : '',
            body : '',
        }
        request('localhost:3001')
            .post('/articles')
            .send(body)
            .end((err, res) => {
                if(err){
                    done(err)
                } else {
                    expect(res.statusCode).equal(422);
                    expect(typeof res.body).equal("object");
                    expect(res.body.errors).have.property('author')
                    expect(res.body.errors.author).have.property('msg','Nama author tidak boleh kosong.')

                    expect(res.body.errors).have.property('title')
                    expect(res.body.errors.title).have.property('msg','Judul artikel tidak boleh kosong.')

                    expect(res.body.errors).have.property('body')
                    expect(res.body.errors.body).have.property('msg','Body artikel tidak boleh kosong.')
                    done()
                }
            })
    });
});

describe('GET /articles', () => {
    it('it should GET all the articles', (done) => {
        request('localhost:3002')
            .get('/articles') //
            .end((err, res) => {
                expect(res.statusCode).equal(200);
                expect(typeof res.body.data).equal("object");
                expect(res.body.data[0]).have.property('id')
                expect(res.body.data[0]).have.property('author')
                expect(res.body.data[0]).have.property('title')
                expect(res.body.data[0]).have.property('body')
                expect(res.body.data[0]).have.property('created')
                done();
            });
    });
    it('it should GET all searched by query & author in articles', (done) => {
        const data = {
            query: 'Jokowi',
            author: 'Wahyu'
        }
        request('localhost:3002')
            .get('/articles')
            .query(data)
            .end((err, res) => {
                expect(res.statusCode).equal(200);
                expect(typeof res.body.data).equal("object");
                expect(res.body.data[0]).have.property('id')

                expect(res.body.data[0]).have.property('author')
                expect(res.body.data[0].author).to.contain(data.author)

                expect(res.body.data[0]).have.property('title')
                expect(res.body.data[0].title).to.contain(data.query)

                expect(res.body.data[0]).have.property('body')
                expect(res.body.data[0].body).to.contain(data.query)

                expect(res.body.data[0]).have.property('created')
                done();
            });
    });
    it('it should GET all searched by author in articles', (done) => {
        const data = {
            author: 'Wahyu'
        }
        request('localhost:3002')
            .get('/articles')
            .query(data)
            .end((err, res) => {
                expect(res.statusCode).equal(200);
                expect(typeof res.body.data).equal("object");
                expect(res.body.data[0]).have.property('id')

                expect(res.body.data[0]).have.property('author')
                expect(res.body.data[0].author).to.contain(data.author)

                expect(res.body.data[0]).have.property('title')

                expect(res.body.data[0]).have.property('body')

                expect(res.body.data[0]).have.property('created')
                done();
            });
    });
    it('it should GET all searched by query in articles', (done) => {
        const data = {
            query: 'Jokowi'
        }
        request('localhost:3002')
            .get('/articles')
            .query(data)
            .end((err, res) => {
                expect(res.statusCode).equal(200);
                expect(typeof res.body.data).equal("object");
                expect(res.body.data[0]).have.property('id')

                expect(res.body.data[0]).have.property('author')

                expect(res.body.data[0]).have.property('title')
                expect(res.body.data[0].title).to.contain(data.query)

                expect(res.body.data[0]).have.property('body')
                expect(res.body.data[0].body).to.contain(data.query)

                expect(res.body.data[0]).have.property('created')
                done();
            });
    });
    it('it should GET article by id', (done) => {
        let id = 12
        request('localhost:3002')
            .get(`/articles/${id}`)
            .end((err, res) => {
                expect(res.statusCode).equal(200);
                expect(typeof res.body.data).equal("object");
                expect(res.body.data[0]).have.property('id')
                expect(res.body.data[0].id).equal(id)

                expect(res.body.data[0]).have.property('author')

                expect(res.body.data[0]).have.property('title')

                expect(res.body.data[0]).have.property('body')

                expect(res.body.data[0]).have.property('created')
                done();
            });
    });
});
