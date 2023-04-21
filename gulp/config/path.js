import path from 'path';

const rootFolderName = path.basename(path.resolve());
const buildFolder = `./build`;
const sourceFolder = `./source`;

export default {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/images/`,
    files: `${buildFolder}/files/`,
    fonts: `${buildFolder}/fonts/`,
    favicons: `${buildFolder}/`
  },
  source: {
    pug: `${sourceFolder}/templates/pages/*.pug`,
    scss: `${sourceFolder}/styles/*.scss`,
    js: `${sourceFolder}/js/scripts.js`,
    images: `${sourceFolder}/assets/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${sourceFolder}/assets/images/**/*.svg`,
    files: `${sourceFolder}/assets/files/**/*.*`,
    fonts: `${sourceFolder}/assets/fonts/`,
    fontStyle: `${sourceFolder}/styles/base/fonts.scss`,
    favicons: `${sourceFolder}/assets/favicons/*.{png,xml,ico,svg,webmanifest}`
  },
  watch: {
    pug: `${sourceFolder}/**/*.pug`,
    scss: `${sourceFolder}/**/*.scss`,
    js: `${sourceFolder}/**/*.js`,
    images: `${sourceFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    files: `${sourceFolder}/assets/files/**/*.*`
  },
  buildFolder,
  sourceFolder,
  rootFolderName
};
