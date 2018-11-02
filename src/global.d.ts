// Type definitions for cordova-plugin-shake 0.6.0
// Project: https://github.com/leecrossley/cordova-plugin-shake/
// Definitions by: Tim Bond <https://github.com/cookieguru>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace ShakePlugin {

    interface ShakePluginStatic {

        /**
         * Start watching for shake gestures
         *
         * @param {function} onShake The success callback for this asynchronous function.
         * @param {string} [sensitivity=30] Shake sensitivity
         * @param {function} onError The failure callback for this asynchronous function; receives an error string.
         */
        startWatch(onShake: () => void, sensitivity?: number, onError?: (error: string) => void): void;

        /**
         * Stop watching for shake gestures
         */
        stopWatch(): void;
    }
}

declare var shake: ShakePlugin.ShakePluginStatic;
