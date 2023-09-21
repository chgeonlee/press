import press from '../lib';

describe('press.util', () => {
    
    test('Singleton instance creation', () => {
        const util1 = press.util;
        const util2 = press.util;

        expect(util1).toBe(util2);
    });

    test('Detect MacOS', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
            value: 'Mac OS X',
            writable: true,
        });
        expect(press.util.getOS()).toBe('MacOS');
    });
  
    test('Detect Android', () => {
        Object.defineProperty(window.navigator, 'userAgent', {
            value: 'Android',
            writable: true,
        });
        expect(press.util.getOS()).toBe('Android');
    });
});
