export const config = {
    mongodb: {
        host: process.env.MONGO_HOST || 'mongodb://localhost',
        port: process.env.MONGO_PORT || 27017,
        db: process.env.DB_NAME || 'v-api-local'
    }
};