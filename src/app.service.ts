import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

function execPromise(
  command: string,
): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

@Injectable()
export class AppService {
  async aptos() {
    console.log('aptos');
    const command = 'aptos --version';
    console.log(`Executing command: ${command}`);

    const result = await execPromise(command);

    console.log('--- STDOUT ---');
    console.log(result.stdout);

    if (result.stderr) {
      console.log('--- STDERR ---');
      console.log(result.stderr);
    }

    return result;
  }
}
