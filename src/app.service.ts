/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import PromisifiedExec from './utils/promisified-exec';

@Injectable()
export class AppService {
  async test() {
    const promisifiedExec: PromisifiedExec = new PromisifiedExec();
    const command = `aptos`;

    const child = promisifiedExec.exec(command, {});

    const res = await child;
    console.log('res: ', res);
  }
}
