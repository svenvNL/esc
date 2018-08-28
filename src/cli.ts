import { Lexer } from './lexer';
// import { Parser } from './parser/index';

const lexer = new Lexer();
// const parser = new Parser();

const tokens = lexer.tokenize(`const a = "tralala";const i = 0;
function b(param) {
    i++;
    return param;
}`);
// const ast = parser.transform(tokens);

// process.stdout.write(ast.toString());

process.stdin.read();

// tokens.forEach(token => {
//     console.log(`[${token.loc.start.line},${token.loc.start.column}] [${token.loc.end.line},${token.loc.end.column}] : ${token.type} - ${token.value}`);
// });

console.table(tokens)
console.log(tokens)
