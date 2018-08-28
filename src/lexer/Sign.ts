import ILiteral from "./Literal/ILiteral";
import LiteralFactory from "./Literal/LiteralFactory";
import Grammar from "./Grammar";

export default class Sign {
    value: string;
    literal: ILiteral | null;

    constructor(char: string) {
        this.value = char;
        this.literal = LiteralFactory.getLiteral(char);
    }

    isNewLine(): boolean {
        return this.value === "\n\r" || this.value === "\n";
    }

    isEmptyValue(): boolean {
        return this.value === " ";
    }

    isPunctuator(): boolean {
        return Grammar.punctuators.includes(this.value);
    }
}
