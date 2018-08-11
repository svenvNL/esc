import IToken from '../lexer/IToken';

export interface IAst {

}

export interface IParser {
    transform(tokens: IToken[]): IAst
}

export class Parser implements IParser {
    transform(tokens: IToken[]): IAst {
        throw new Error("Method not implemented.");
    }
}
