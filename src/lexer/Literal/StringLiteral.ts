import ILiteral from "./ILiteral";
import { LiteralType } from "./LiteralType";

export default class StringLiteral implements ILiteral {
    public readonly type = LiteralType.String;
    public readonly isOneLineLiteral = true;
}
