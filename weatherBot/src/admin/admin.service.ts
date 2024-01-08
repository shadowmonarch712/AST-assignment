import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
const config = require('../../src/config.json');

@Injectable()
export class AdminService {
    private apiKey = config.apiKey;

    getApiKey(): string {
        return this.apiKey;
    }

    setApi(key: string): string {
        this.apiKey = key;
        writeFileSync('config.json', JSON.stringify({ apiKey: key }));
        return 'API key updated successfully';
    }
} 