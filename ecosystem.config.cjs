module.exports = {
  apps: [
    {
      script: "npm run start",
    },
  ],

  deploy: {
    production: {
      key: "nykn.pem",
      user: "ubuntu",
      host: "3.133.162.32",
      ref: "origin/main",
      repo: "https://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@github.com/DigniteStudios/NYKN-Admin.git",
      path: "/home/ubuntu",
      "pre-deploy-local": "",
      "post-deploy":
        "source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.cjs --env production",
      "pre-setup": "",
      ssh_options: "ForwardAgent=yes",
    },
  },
};
