const detox = require("detox");
const { device } = require('detox');
const config = require("../package.json").detox;
const adapter = require("detox/runners/jest/adapter");

jest.setTimeout(60000);
// eslint-disable-next-line no-undef
jasmine.getEnv().addReporter(adapter);

beforeAll(async () => {
    await detox.init(config, { launchApp: false });
    await device.launchApp({ newInstance: true, permissions: { notifications: 'YES' } });
});

beforeEach(async () => {
    await adapter.beforeEach();
});

afterAll(async () => {
    await adapter.afterAll();
    await detox.cleanup();
});