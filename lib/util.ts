export default class Util {
    private static _instance: Util;
    public static get instance() {
        return this._instance || (this._instance = new Util());
    }

    //prevent using new Constructor();
    private constructor() {}

    getOS() {
        const agent = window.navigator.userAgent;

        if (/Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh/.test(agent)) {
            return 'MacOS';
        }

        if (/Windows|Win16|Win32|Win64|WinCE/.test(agent)) {
            return 'Windows';
        }

        if (/Android/.test(agent)) {
            return 'Android';
        }

        if (/Linux/.test(agent)) {
            return 'Linux';
        }

        if (/iPhone|iPad|iPod/.test(agent)) {
            return 'iOS';
        }
    }
}
