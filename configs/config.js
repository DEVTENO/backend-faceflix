import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const configs = {
    PORT: process.env.PORT || 8080,
    DATABASEURL: process.env.DATABASE_URL
};

export default configs;