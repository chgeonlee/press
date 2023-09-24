import Palette from './palette';
import Path from './path';
import Device from './device';

class Press {
    private static _instance: Press;
    public static get instance() {
        return this._instance || ( this._instance = new Press() );
    }

    public get device() {
        return Device.instance;
    }

    public get palette() {
        return Palette.instance;
    }

    public path(x: number, y: number) {
        return new Path(x, y);
    }
}

export default Press.instance;

