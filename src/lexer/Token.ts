import IToken from './IToken';
import { TokenType } from './TokenType';
import Grammar from "./Grammar";

export default class Token implements IToken {
    public value: string;
    public range: number[];
    public loc: {
        start: {
            line: number,
            column: number
        },
        end: {
            line: number,
            column: number
        }
    }

    constructor(startLine: number, startColumn: number) {
        this.value = "";
        this.range = [0, 0];
        this.loc = {
            start: {
                line: startLine,
                column: startColumn
            },
            end: {
                line: 0,
                column: 0
            }
        }
    }

    public pushChar(char: string) {
        this.value += char;
    }

    public get type(): TokenType {
        // Keyword
        if (Grammar.keywords.includes(this.value)) {
            return TokenType.Keyword;
        }

        // Punctuator
        if (Grammar.punctuators.includes(this.value)) {
            return TokenType.Punctuator;
        }

        // String
        if (this.value[0] === "\"") {
            return TokenType.String;
        }

        // Numeric
        if (/^[0-9]+$/g.test(this.value)) {
            return TokenType.Numeric;
        }

        return TokenType.Identifier;
    }
}
