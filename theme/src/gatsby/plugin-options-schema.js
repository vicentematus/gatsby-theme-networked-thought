function generateSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

module.exports = ({ Joi }) =>
  Joi.object({
    thoughtsDirectory: Joi.string().default("content/garden/"),
    generateSlug: Joi.function().default(function () {
      return generateSlug;
    }),
    rootPath: Joi.string().default("/"),
    rootNode: Joi.string().default("about"),
    hideDoubleBrackets: Joi.boolean().default(true),
    rssTitle: Joi.string().default("gatsby-theme-ekampf-digital-garden generated rss feed"),
  });