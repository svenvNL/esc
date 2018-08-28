import { TokenType } from './TokenType';
import Sign from './Sign';
import ILiteral from './Literal/ILiteral';

export default interface IToken {
    literal: ILiteral | null;
    type: TokenType,
    value: string,
    range: number[],
    loc: {
        start: {
            line: number,
            column: number
        },
        end: {
            line: number,
            column: number
        }
    }

    pushSign(sign: Sign): void;
    locEnd: { line: number, column: number };
}
