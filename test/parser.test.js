var expect = require('chai').expect;
const { parse } = require('../helpers/parser')
const fs = require('fs');
const file = fs.readFileSync(`${__dirname}/sample/test_sample_movies_valid.txt`);

let testedObject = {
    Title:"Blazing Saddles",
    ReleaseYear:"1974",
    Format: "VHS",
    Stars: ['Mel Brooks', 'Clevon Little', 'Harvey Korman', 'Gene Wilder', 'Slim Pickens', 'Madeline Kahn']
}

describe("#Test parser from file", () => {
;
    it("Length of", () => {
        expect(parse(file.toString())).to.have.lengthOf(3);
    })

    it("TypeDef object", () => {
        let parsedFile = parse(file.toString());
        parsedFile.forEach(e=>{
            expect(e).to.be.an('object');
        })     
    })

    it("Valid data", ()=>{
        let parsedFile = parse(file.toString());
        expect(parsedFile[0]).to.eql(testedObject);
    })

})

// expect(parse(file.toString())).to.have.lengthOf(3);