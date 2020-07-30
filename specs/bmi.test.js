const bmi = require('./../api/functions/bmi');

describe('BMI', ()=>{    
    it('bmi when success', () => {
        const height=1.8;
        const weight=80;
        const result = 24.691358024691358;
        expect(bmi(weight, height)).toBe(result);
    });
    it('bmi when error', () => {
        const height=0;
        const weight=80;
        const result = -1;
        expect(bmi(weight, height)).toBe(result);
    });
});