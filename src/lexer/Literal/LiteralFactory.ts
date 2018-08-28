import ILiteral from "./ILiteral";
import StringLiteral from "./StringLiteral";

export default class LiteralFactory {
    private constructor() {}

    static getLiteral(char: string): ILiteral | null {
        switch(char) {
            case "\"":
                return new StringLiteral();
        }
        return null;
    }
}
