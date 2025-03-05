// tests/performance/validator.performance.test.js

const Validator = require('../../utils/validator');
const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

suite
    .add('Validator.isValidTransactionId', {
        defer: true,
        fn: (deferred) => {
            Validator.isValidTransactionId('tx1234567890abcdef');
            deferred.resolve();
        }
    })
    .add('Validator.isValidAddress', {
        defer: true,
        fn: (deferred) => {
            Validator.isValidAddress('0x1234567890abcdef1234567890abcdef12345678');
            deferred.resolve();
        }
    })
    .add('Validator.isPositiveNumber', {
        defer: true,
        fn: (deferred) => {
            Validator.isPositiveNumber(100);
            deferred.resolve();
        }
    })
    .on('cycle', (event) => {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ async: true });
