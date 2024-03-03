// pm2 start pm2.conf.js (ecosystem.config.js)
module.exports = {
  apps: [
    {
      name: 'mongo-express-api', // Change this to your app's name
      script: 'npm', // Change this to the entry point of your application (e.g., server>
      args: 'start',
      instances: 1, // Automatically scale based on available CPU cores
      autorestart: true, // Restart the app if it crashes
      watch: true, // Enable file watch for automatic restart on file changes
      max_memory_restart: '1G', // Restart the app if it exceeds 1GB memory usage
      env: {
        NODE_ENV: 'production', // Set the environment to production
        PORT: 3000, // Set the port to 3000
        MONGO_URI: 'mongodb://user:user@127.0.0.1:27017/test', // MongoDB URI
        SECRET_KEY: 'secret-key', // Secret key for your application
        S3_REGION: 'eu-central-1', // S3 region e.g., us-east-1
        AWS_ACCESS_KEY_ID: '...', // AWS Access Key ID
        AWS_SECRET_ACCESS_KEY: '...', // AWS Secret>
        S3_BUCKET: '...', // S3 bucket name
      },
    },
  ],
};
