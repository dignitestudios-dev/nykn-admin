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
      host: "18.118.34.24",
      ref: "origin/main",
      repo: "https://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@github.com/JackAnderson01/admin_nykn.git",
      path: "/home/ubuntu/admin",
      "pre-deploy-local": "",
      "post-deploy":
        "source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
      ssh_options: "ForwardAgent=yes",
    },
  },
};
