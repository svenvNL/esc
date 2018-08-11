import ILexer from './ILexer';
import IToken from './IToken';
import Token from './Token';
import { TokenType } from './TokenType';
import Grammar from './Grammar';

export class Lexer implements ILexer {
    private tokens: IToken[] = [];
    private currentToken: IToken | null;
    private currentLine: number = 1;
    private currentColumn: number = 0;

    constructor() {
        const length = this.tokens.push(new Token(this.currentLine, this.currentColumn));
        this.currentToken = this.tokens[length - 1];
    }

    private closeToken() {
        this.currentToken = null;
    }

    private createToken() {
        const length = this.tokens.push(new Token(this.currentLine, this.currentColumn));
        this.currentToken = this.tokens[length - 1];
    }

    private newLine() {
        this.currentLine += 1;
        this.currentColumn = 0;
    }

    private incrementColumn() {
        this.currentColumn += 1;
    }

    tokenize(code: string): IToken[] {
        code.split('').forEach(sign => {
            if (sign === "\n\r" || sign === "\n") {
                this.closeToken();
                this.newLine();
                return;
            }

            this.incrementColumn();

            if (sign === ' ') {
                this.closeToken();
                return;
            }

            if (!this.currentToken) {
                const length = this.tokens.push(new Token(this.currentLine, this.currentColumn));
                this.currentToken = this.tokens[length - 1];
            }

            if (
                this.currentToken.type === TokenType.Identifier &&
                Grammar.punctuators.includes(sign)
            ) {
                this.createToken();
            }

            this.currentToken.pushChar(sign);
        });

        return this.tokens;
    }
}
