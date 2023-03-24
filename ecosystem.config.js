module.exports = {
  apps: [
    {
      name: 'frontarfan',
      port: 3000,
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
