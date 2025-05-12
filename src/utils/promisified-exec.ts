import { exec } from 'child_process';

export const kResult = Symbol('kResult');
// Promisifies a function and saves the promisifed function result on the returned promise
const promisify =
  (func) =>
  (...args) => {
    let resolve;
    let reject;
    return Object.assign(
      new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      }),
      {
        [kResult]: func(...args, (err, result) => {
          const f = () => {
            if (!resolve) {
              return setTimeout(f);
            }

            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          };

          f();
        }),
      },
    );
  };
export default class PromisifiedExec {
  private _exec: any;

  constructor() {
    // We use the polyfill defined above so we can receive a reference to the created child process (while still using async/await)
    this._exec = promisify(exec);
  }

  public exec(command: string, options: any) {
    return this._exec(command, options);
  }
}
