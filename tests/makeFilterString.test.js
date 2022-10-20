const {makeFilterString}  = require("../main");




describe("testing  output of filter string method based on different path values",function(){


    test("throws an error when no path argument is provided",() => {
        const field = "extended_family";
    
        expect(()=>makeFilterString(field)).toThrow();
    });




    test("throws an error when empty path list  argument is provided",() => {
        const field = "extended_family";
        const path = [];
    
        expect(()=>makeFilterString(field,path)).toThrow(Error);
    });




    test("returns correct string with path [2,4,5]",() => {
        const field = "extended_family";
        const path = [2,4,5];
        const result = "extended_family.2.extended_family.4.extended_family.5.extended_family"
    
        expect(makeFilterString(field,path)).toMatch(result);
    });




    test("returns correct string with path [0]",() => {
        const field = "extended_family";
        const path = [0];
        const result = "extended_family.0.extended_family"
    
        expect(makeFilterString(field,path)).toMatch(result);
    });



    
    test("returns correct string with path [4,6]",() => {
        const field = "extended_family";
        const path = [4,6];
        const result = "extended_family.4.extended_family.6.extended_family"
    
        expect(makeFilterString(field,path)).toMatch(result);
    });







});