import IToken from './IToken';

export default interface ILexer {
    tokenize(code: string): IToken[];
}
