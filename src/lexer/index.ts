import ILexer from "./ILexer";
import IToken from "./IToken";
import Token from "./Token";
import { TokenType } from "./TokenType";
import Sign from "./Sign";

export class Lexer implements ILexer {
    private tokens: IToken[] = [];
    private currentToken: IToken | null = null;
    private currentLine: number = 1;
    private currentColumn: number = 0;

    private closeToken() {
        if (this.currentToken) {
            this.currentToken.locEnd = {
                column: this.currentColumn,
                line: this.currentLine
            };
        }
        this.currentToken = null;
    }

    private closeAndNewLine() {
        this.closeToken();
        this.newLine();
    }

    private closeAndCreateToken() {
        this.closeToken();
        this.createToken();
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

    public tokenize(code: string): IToken[] {
        code.split("").forEach(sign => {
            const signObj = new Sign(sign);

            if (this.currentToken) {
                const literal = this.currentToken.literal;
                if (literal && literal.isOneLineLiteral && signObj.isNewLine() ||
                    !literal && signObj.isNewLine()) {
                    return this.closeAndNewLine();
                }
            }

            if (signObj.isNewLine()) return this.closeAndNewLine();
            this.incrementColumn();
            if (signObj.isEmptyValue()) return this.closeToken();

            if (!this.currentToken) {
                const length = this.tokens.push(new Token(this.currentLine, this.currentColumn));
                this.currentToken = this.tokens[length - 1];
                this.currentToken.pushSign(new Sign(sign));
                return;
            }

            const tmpToken = new Token();
            tmpToken.pushSign(new Sign(sign));
            if (
                this.currentToken.type !== TokenType.Punctuator && tmpToken.type === TokenType.Punctuator ||
                this.currentToken.type === TokenType.Punctuator && tmpToken.type !== TokenType.Punctuator
            ) {
                this.closeAndCreateToken();
                this.currentToken.pushSign(new Sign(sign));
                return;
            }

            const tmpMergeToken = new Token();
            tmpMergeToken.pushSign(new Sign(this.currentToken.value + tmpToken.value));
            if (
                this.currentToken.type === TokenType.Punctuator &&
                tmpToken.type == TokenType.Punctuator &&
                tmpMergeToken.type !== TokenType.Punctuator
            ) {
                this.closeAndCreateToken();
                this.currentToken.pushSign(new Sign(sign));
                return;
            }

            if (this.currentToken.type === TokenType.Identifier &&
                signObj.isPunctuator()) {
                this.createToken();
            }

            this.currentToken.pushSign(new Sign(sign));
        });

        this.closeToken();
        return this.tokens;
    }
}
