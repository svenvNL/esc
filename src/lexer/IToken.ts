import { TokenType } from './TokenType';

export default interface IToken {
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

    pushChar(char: string): void;
}
