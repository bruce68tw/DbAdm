import ErrorRowDto from './ErrorRowDto';
export default class ResultDto {
    Value: string;
    Code: string;
    _ErrorMsg: string;
    ErrorRows: ErrorRowDto[];
}
