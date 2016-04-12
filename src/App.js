import React, { Component } from 'react';
import Integral from './Integral'

export class App extends Component {

    state = {
        a: 0,
        b: 20,
        evaluationNum: 10,
        sigma2EvaluationNum: 1000,
        calculated: 0,
        evaluation: 0,
        tests: [],
        sum: 0,
        sigma2: 0,
        func: 'Math.sqrt(b * x) - (x * x / b)',
        answer: 'b * b / 3'
    };

    componentWillMount() {
        this.calculate();
    }

    render() {
        let {evaluation, tests, sum, sigma2} = this.state;
        return (
            <div>
                <h1>Компьютерное моделирование. Лабораторная работа №1.</h1>
                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <div className="pure-g">
                            <div className="pure-u-2">
                                <label>a</label>
                                <input type="text" defaultValue={this.state.a}
                                       onChange={e=>this.setState({a: Number(e.target.value)}, this.calculate)}
                                       className="pure-u-23-24"/>
                            </div>
                            <div className="pure-u-2">
                                <label>b</label>
                                <input type="text" defaultValue={this.state.b}
                                       onChange={e=>this.setState({b: Number(e.target.value)}, this.calculate)}
                                       className="pure-u-23-24"/>
                            </div>
                        </div>
                        <div className="pure-control-group">
                            <label>g(x)</label>
                            <input type="text" defaultValue={this.state.func}
                                   onChange={e=>this.setState({func: e.target.value}, this.calculate)}
                                   className="pure-u-1"/>
                        </div>
                        <div className="pure-control-group">
                            <label>Ответ</label>
                            <input type="text" defaultValue={this.state.answer}
                                   onChange={e=>this.setState({answer: e.target.value}, this.calculate)}
                                   className="pure-u-1"/>
                        </div>
                        <div className="pure-control-group">
                            <label>Количество испытаний</label>
                            <input type="text" defaultValue={this.state.evaluationNum}
                                   onChange={e=>this.setState({evaluationNum: e.target.value}, this.calculate)}/>
                        </div>
                        <div className="pure-control-group">
                            <label>Количество испытаний для &sigma;<sup>2</sup></label>
                            <input type="text" defaultValue={this.state.sigma2EvaluationNum}
                                   onChange={e=>this.setState({sigma2EvaluationNum: e.target.value}, this.calculate)}/>
                        </div>
                    </fieldset>
                </form>
                <p>I = {this.state.answer} = {this.state.calculated.toFixed(3)}</p>
                <ol>
                    <li>
                        <table className="pure-table pure-table-bordered">
                            <tbody>
                            <tr>
                                <td>Номер испытания i</td>
                                {tests.map(test=> {
                                    return <td key={test.id}>{test.id}</td>;
                                })}
                            </tr>
                            <tr>
                                <td>u<sub>i</sub></td>
                                {tests.map(test=> {
                                    return <td key={test.id}>{test.u.toFixed(3)}</td>;
                                })}
                            </tr>
                            <tr>
                                <td>x<sub>i</sub></td>
                                {tests.map(test=> {
                                    return <td key={test.id}>{test.x.toFixed(3)}</td>;
                                })}
                            </tr>
                            <tr>
                                <td>g(x<sub>i</sub>)</td>
                                {tests.map(test=> {
                                    return <td key={test.id}>{test.f.toFixed(3)}</td>;
                                })}
                            </tr>
                            </tbody>
                        </table>
                        <p>&Sigma;g(x<sub>i</sub>) = {sum.toFixed(3)}</p>
                        <p>I* = {evaluation.toFixed(3)}</p>
                    </li>
                    <li>
                        <p>Абсолютная пограешность |I-I*|
                            = {Math.abs(this.state.calculated - evaluation).toFixed(3)}</p>
                    </li>
                    <li>
                        <p>Дисперсия усредняемой функции &sigma;<sup>2</sup> = {sigma2.toFixed(3)}</p>
                    </li>
                </ol>
                <button className="pure-button pure-button-primary" onClick={this.calculate}>Новые числа</button>
            </div>
        );
    }

    calculate = () => {
        const calculated = ((a, b)=> {
            return eval(this.state.answer);
        })(this.state.a, this.state.b);
        const integral = new Integral(
            (x, a, b) => {
                return eval(this.state.func);
            }, this.state.a, this.state.b
        );
        const {evaluation, tests, sum} = integral.evaluation(this.state.evaluationNum);
        this.setState({
            evaluation: evaluation || 0,
            tests: tests,
            sum: sum || 0,
            sigma2: integral.sigma2(this.state.sigma2EvaluationNum) || 0,
            calculated: calculated || 0
        });
    }
}