const BS = require('browser-sync');

const config = {
  server: {
    index: "index.html"
  },
  port: 3001,
  files: [
    'public/**/*'
  ],
  open: false
};

BS(config);
