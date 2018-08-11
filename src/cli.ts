import { Lexer } from './lexer/index';
// import { Parser } from './parser/index';

const lexer = new Lexer();
// const parser = new Parser();

const tokens = lexer.tokenize(`const i = 0;
function b(param) {
     return param;
}`);
// const ast = parser.transform(tokens);

// process.stdout.write(ast.toString());
// console.log(tokens);

tokens.forEach(token => {
    console.log(`${token.type}:${token.value}`);
});
