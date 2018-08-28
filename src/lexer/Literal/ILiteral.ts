import { LiteralType } from "./LiteralType";

export default interface ILiteral {
    isOneLineLiteral: boolean;
    type: LiteralType;
}
