export default class Integral {
    constructor(func, a = 0, b = 0) {
        this.a = a;
        this.b = b;
        this.func = x => func(x, this.a, this.b);
    }

    evaluation(n = 10) {
        let tests = [];
        let baDiff = this.b - this.a;
        let sum = 0;
        for (let i = 1; i <= n; ++i) {
            let test = {
                id: i,
                u: Math.random()
            };
            test.x = this.a + baDiff * test.u;
            test.f = this.func(test.x);
            sum += test.f;
            tests.push(test);
        }
        let evaluation = baDiff * sum / n;
        return {
            tests: tests,
            sum: sum,
            evaluation: evaluation
        };
    }

    sigma2(n = 10) {
        const baDiff = this.b - this.a;
        const evaluation2 = new Integral((x, a, b)=> {
            const func = this.func(x);
            return func * func;
        }, this.a, this.b).evaluation(n).evaluation;
        const evaluation = this.evaluation(n).evaluation;
        const sigma2 = baDiff * evaluation2 - evaluation * evaluation;
        return sigma2;
    }
}