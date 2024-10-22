import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import moment from 'moment';

@Injectable()
export class AppService {
  constructor() {}

  uuid = crypto.randomUUID();
  timestamp = Math.floor(Date.now() / 1000);
  requestUri = `/sessions?sdkId=79250caf-f0c8-43a9-abd1-c5bcad64a578&nonce=${this.uuid}&timestamp=${this.timestamp}&ew0KImlkIiA6IDEsDQoibmFtZSIgOiBpdGVtDQoNCn0=`;
  requestBody = {
    redirect_uri: 'https://www.bhavithatech.com',
    user_identifier: 'example_user',
  };

  async createSession(xYAuthDigest: string) {
    const headers = {
      // 'X-Yoti-API-Key': '4729c5e6-0055-4fbf-b771-269c09ce9a6d',
      'X-Yoti-Auth-Digest': xYAuthDigest,
      'X-Yoti-Timestamp': this.timestamp,
      'Content-Type': 'application/json',
    };
    console.log(headers);
    try {
      console.log('request uri', this.requestUri);
      const response = await axios.post(
        `https://api.yoti.com/sandbox/idverify/v1${this.requestUri}`,
        this.requestBody,
        { headers },
      );
      return response.data; // Return session details, including the `session_id`
    } catch (error) {
      console.log(error);
      console.error(
        'Error during session creation:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  }

  generateYotiAuthDigest(
    httpMethod: string,
    requestUri: string,
    timestamp: any,
    requestBody: any,
    privateKeyPath: string,
  ): string {
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

    const requestString = `${httpMethod}${requestUri}${timestamp}${requestBody}`;

    const sha256Hash = crypto
      .createHash('sha256')
      .update(requestString)
      .digest();

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(sha256Hash);
    const signature = sign.sign(privateKey, 'base64');

    return signature;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getResponse() {
    const httpMethod = 'POST';
    const requestUri = this.requestUri;
    const timestamp = this.timestamp;
    const requestBody = this.requestBody;
    const privateKeyPath = path.join(__dirname, '../src/privateKey.pem');
    console.log('Private Key Path:', privateKeyPath);

    const xYotiAuthDigest = this.generateYotiAuthDigest(
      httpMethod,
      requestUri,
      timestamp,
      requestBody,
      privateKeyPath,
    );

    console.log('X-Yoti-Auth-Digest:', xYotiAuthDigest);

    const result = await this.createSession(xYotiAuthDigest);

    return { xYotiAuthDigest, session: result };
  }
}
