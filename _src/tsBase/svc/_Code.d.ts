import IdStrDto from '../dto/IdStrDto';
import IdStrExtDto from '../dto/IdStrExtDto';
export default class _Code {
    static addEmptyOpt(rows?: IdStrDto[]): IdStrDto[];
    /**
     * filter json array
     * @param addEmpty {bool} default true
     */
    static filterRows(rows: IdStrExtDto[], value: any, addEmpty?: boolean): IdStrDto[];
}
