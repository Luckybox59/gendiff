const render = ast => `{\n${ast.join('\n').toString()}\n}`;

export default render;
