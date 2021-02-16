const unified = require("unified");
const stringifyMd = require("remark-stringify");

function findDeepestChildForPosition(parent, tree, position) {
  if (!tree.children || tree.children.length == 0) {
    return {
      parent: parent,
      child: tree,
    };
  }

  for (child of tree.children) {
    if (child.position.start.offset <= position && child.position.end.offset >= position) {
      return findDeepestChildForPosition(
        {
          parent: parent,
          node: tree,
        },
        child,
        position,
      );
    }
  }
  return {
    parent: parent,
    child: tree,
  };
}

function textNoEscaping() {
  var Compiler = this.Compiler;
  var visitors = Compiler.prototype.visitors;

  visitors.text = text;

  function text(node, parent) {
    return this.encode(node, node).value;
  }
}

function generatePreviewMarkdown(tree, position) {
  let { parent } = findDeepestChildForPosition(null, tree, position);

  // Adding this logic to avoid including too large an amount of content. May need additional heuristics to improve this
  // Right now it essentially will just capture the bullet point or paragraph where it is mentioned.
  let maxDepth = 2;
  for (let i = 0; i < maxDepth && parent.parent != null && parent.parent.node.type !== "root"; i++) {
    parent = parent.parent;
  }

  let processor = unified().use(stringifyMd, { commonmark: true }).use(textNoEscaping).freeze();
  return processor.stringify(parent.node);
}

module.exports = generatePreviewMarkdown;