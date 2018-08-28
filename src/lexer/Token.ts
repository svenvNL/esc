import IToken from './IToken';
import { TokenType } from './TokenType';
import Grammar from "./Grammar";
import ILiteral from './Literal/ILiteral';
import Sign from './Sign';
import { LiteralType } from './Literal/LiteralType';

export default class Token implements IToken {
    public literal: ILiteral | null = null;
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

    constructor(startLine: number = 0, startColumn: number = 0) {
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

    public pushSign(sign: Sign) {
        if(this.value === "") {
            this.literal = sign.literal;
        }

        this.value += sign.value;
    }

    public set locEnd(loc: { line: number, column: number }) {
        this.loc.end = loc;
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
        if (this.literal && this.literal.type === LiteralType.String) {
            return TokenType.String;
        }

        // Numeric
        if (/^[0-9]+$/g.test(this.value)) {
            return TokenType.Numeric;
        }

        return TokenType.Identifier;
    }
}
