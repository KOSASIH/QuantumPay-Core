// tests/performance/logger.performance.test.js

const Logger = require('../../utils/logger');
const Benchmark = require('benchmark');

const logger = new Logger();

const suite = new Benchmark.Suite();

suite
    .add('Logger.info', {
        defer: true,
        fn: (deferred) => {
            logger.info('Performance test for info logging');
            deferred.resolve();
        }
    })
    .add('Logger.warn', {
        defer: true,
        fn: (deferred) => {
            logger.warn('Performance test for warning logging');
            deferred.resolve();
        }
    })
    .add('Logger.error', {
        defer: true,
        fn: (deferred) => {
            logger.error('Performance test for error logging');
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
