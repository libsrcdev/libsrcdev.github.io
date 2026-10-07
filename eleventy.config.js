export default function (eleventyConfig) {
  const previewFonts = process.env.ELEVENTY_RUN_MODE === "serve";
  eleventyConfig.addGlobalData("previewFonts", () => process.env.ELEVENTY_RUN_MODE === "serve");
  if (previewFonts) {
    eleventyConfig.addPassthroughCopy({ ".local/fonts": "assets/fonts" });
  }
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  return { dir: { input: "src", output: "_site" } };
}
