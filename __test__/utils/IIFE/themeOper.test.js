import { themeOper } from '../../../src/utils/IIFE';

function initialize() {
  // mock
  ['__theme', '__setPreferredTheme', '__subOnThemeChange', '__unsubOnThemeChange'].forEach(key => {
    Reflect.deleteProperty(window, key);
  });
  window.matchMedia = () => ({ addListener() {} });
  localStorage.clear();
}

beforeEach(() => {
  initialize();
});

test('should be able to set theme to window', () => {
  themeOper();
  window.__setPreferredTheme('light');
  expect(window.__theme).toEqual('light');

  window.__setPreferredTheme('dark');
  expect(window.__theme).toEqual('dark');
});

test('should be able to read theme from localStorage', () => {
  localStorage.setItem('theme', 'dark');
  themeOper();
  expect(window.__theme).toEqual('dark');
});

test('subscribe funcs', () => {
  themeOper();

  const mockFunc1 = jest.fn();
  const mockFunc2 = jest.fn();

  window.__subOnThemeChange('func1', mockFunc1);
  window.__subOnThemeChange('func2', mockFunc2);

  window.__setPreferredTheme('dark');

  expect(window.__theme).toEqual('dark');
  // get theme string
  expect(mockFunc1.mock.calls[0][0]).toEqual('dark');
  expect(mockFunc2.mock.calls[0][0]).toEqual('dark');
});

test('unsubscribe funcs', () => {
  themeOper();

  const mockFunc1 = jest.fn();
  const mockFunc2 = jest.fn();

  window.__subOnThemeChange('func1', mockFunc1);
  window.__subOnThemeChange('func2', mockFunc2);

  window.__setPreferredTheme('dark');

  expect(window.__theme).toEqual('dark');
  expect(mockFunc1.mock.calls[0][0]).toEqual('dark');
  expect(mockFunc2.mock.calls[0][0]).toEqual('dark');

  window.__unsubOnThemeChange('func1');
  window.__setPreferredTheme('light');

  // mockFunc1 will not be called as it was unsubscribed
  expect(window.__theme).toEqual('light');
  expect(mockFunc1.mock.calls.length).toEqual(1);
  expect(mockFunc2.mock.calls.length).toEqual(2);
  expect(mockFunc2.mock.calls[1][0]).toEqual('light');
});
