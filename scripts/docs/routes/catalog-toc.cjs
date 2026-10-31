/*
 * Copyright 2020 Adobe. All rights reserved.
 * Licensed under the Apache License, Version 2.0.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
// Extracted after terminal-copying the actual frozen MDXTransformer.js.
// Source findLink/treeConverter logic; no replacement Markdown traversal.
function findLink(node) {
  if (node.type === 'link') return node;
  if (node.children) {
    for (let child of node.children) {
      let link = findLink(child);
      if (link) return link;
    }
  }
}

function treeConverter(tree, levels, first = false) {
  let newTree = {};
  if (tree.type === 'list') {
    return tree.children.map(treeNode => treeConverter(treeNode, levels));
  } else if (tree.type === 'listItem') {
    let [name, nodes] = tree.children;
    newTree.children = [];
    if (nodes) newTree.children = treeConverter(nodes, levels);
    let link = findLink(name);
    if (!link || typeof link.children?.[0]?.value !== 'string') {
      throw new Error('Unsupported source TOC link/title shape.');
    }
    newTree.id = link.url.split('#').pop();
    newTree.title = link.children[0].value;
    newTree.level = levels.get(newTree.id);
    if (!newTree.level) throw new Error('Source TOC ID has no parsed heading level: ' + newTree.id);
    return newTree;
  }
  throw new Error('Unsupported source TOC structure: ' + tree.type);
}
module.exports = treeConverter;
