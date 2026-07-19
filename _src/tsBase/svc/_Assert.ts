class _Assert {
    static echo(msg: string): void {
        _Error.log('_assert.js ' + msg);
    }

    //find array
    //return index
    static inArray(value: StrNum, ary: StrNum[]): void {
        let find = false;
        for (const item in ary) {
            if (item == value) {
                find = true;
                break;
            }
        }
        if (!find)
            _Assert.echo('inArray failed: ' + value);
    }
}
window._Assert = _Assert;