import type { PluginOptions } from "../plugin-options-schema";

function processRegExps(
  regexpInclusive: RegExp,
  regexpExclusive: RegExp,
  content: string,
  nameToSlugMap: Map<string, string>,
  pluginOptions: PluginOptions,
) {
  const matches = content.match(regexpInclusive);
  if (matches === null) {
    return content;
  }
  console.log("estoy procesando");

  const { rootPath } = pluginOptions;
  console.log("rootPath es ", { rootPath });
  let newContent = content;
  matches
    .filter((a, b) => matches.indexOf(a) === b)
    .forEach((match) => {
      const textMatch = match.match(regexpExclusive);
      if (textMatch === null) {
        return;
      }

      const text = textMatch[0];
      const name = text.toLowerCase();
      if (nameToSlugMap.has(name)) {
        const link = nameToSlugMap.get(name);
        const linkPath = rootPath + link;
        const linkified = `[${text}](${linkPath})`;
        newContent = newContent.split(match).join(linkified);
      }
    });

  return newContent;
}

export default function linkify(
  content: string,
  nameToSlugMap: Map<string, string>,
  pluginOptions: PluginOptions,
): string {
  // Find matches for content between double brackets
  // e.g. [[Example]] -> Example
  console.log("content es ", { content });
  const bracketRegexExclusive = /(?<=\[\[).*?(?=\]\])/g;

  // Find matches for content between double brackets including the brackets
  // e.g. [[Example]] -> [[Example]]
  const bracketRegexInclusive = /\[\[.*?\]\]/g;

  return processRegExps(bracketRegexInclusive, bracketRegexExclusive, content, nameToSlugMap, pluginOptions);
}
