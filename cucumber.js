module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['features/**/*.ts'],
        format: ['progress', 'html:reports/cucumber-report.html'],
        paths: ['features/**/*.feature']
    }
};