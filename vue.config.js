module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/Global.scss";
        `,
      },
    },
  },
};
