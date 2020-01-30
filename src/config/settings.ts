export const config = {
  mongodb: {
    db: process.env.DB_NAME || 'v-api-local',
    host: process.env.MONGO_HOST || 'mongodb://localhost',
    port: process.env.MONGO_PORT || 27017,
  },
}
