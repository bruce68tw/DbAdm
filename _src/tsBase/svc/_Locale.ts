//import _Ajax from "./_Ajax";

export default class _Locale {
    static async setLocaleA(code: string) {
        const module = await import(
            `/locale/${code}/_BR.js`
        );

        window._BR = module.default;
    }

    /*
    static async setLocale(code: string) {
        await _Ajax.getStrA('../Fun/SetLocale', { code: code }, function (msg: string) {
            location.reload();
        });

        const module = await import(
            `/locale/${code}/_BR`
        );
        window._BR = module.default;            
    }
    */
}
