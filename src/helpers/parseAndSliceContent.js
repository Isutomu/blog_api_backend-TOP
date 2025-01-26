const { JSDOM } = require("jsdom");

/**
 * Removes HTML tags from a stringified HTML and slices the resulting string.
 *
 * @param {String} sanitizedHTML A stringified HTML.
 * @param {Number} targetSize Base size of the resulting sliced string. It will be slightly bigger to avoid cutting words and to insert the ellipsis. In case the extra characters necessary to complete the word are above a certain length the word will be shown cut.
 *
 * @return {String} A tag-free HTML string version of 'sanitizedHTML', sliced to a size close to 'targetSize'.
 */

module.exports.sliceContent = (sanitizedHTML, targetSize) => {
  const doc = new JSDOM(`<body>${sanitizedHTML}</body>`).window;
  const textContent = doc.document
    .getElementsByTagName("body")[0]
    .textContent.trim();

  const acceptableExtraLength = targetSize * 0.1;
  let slicedContent = textContent.slice(0, targetSize);
  if (textContent.charAt(targetSize) !== " ") {
    const subStr = textContent.slice(targetSize).split(" ");
    slicedContent =
      slicedContent +
      (subStr[0].length <= acceptableExtraLength ? subStr[0] : "");
  }
  slicedContent = slicedContent + (slicedContent.at(-1) === "." ? ".." : "...");

  return slicedContent;
};
