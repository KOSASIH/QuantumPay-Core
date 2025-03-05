// tests/performance/formatter.performance.test.js

const Formatter = require('../../utils/formatter');
const Benchmark = require('benchmark');

const suite = new Benchmark.Suite();

suite
    .add('Formatter.formatTransaction', {
        defer: true,
        fn: (deferred) => {
            const transaction = {
                id: 'tx1234567890abcdef',
                status: 'confirmed',
                amount: 1234.56789,
                timestamp: Date.now(),
                from: '0x1234567890abcdef1234567890abcdef12345678',
                to: '0x1234567890abcdef1234567890abcdef12345678',
            };
            Formatter.formatTransaction(transaction);
            deferred.resolve();
        }
    })
    .add('Formatter.formatAmount', {
        defer: true,
        fn: (deferred) => {
            Formatter.formatAmount(1234.56789);
            deferred.resolve();
        }
    })
    .add('Formatter.formatAddress', {
        defer: true,
        fn: (deferred) => {
            Formatter.formatAddress('0x1234567890abcdef1234567890abcdef12345678');
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
