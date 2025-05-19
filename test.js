const { exec } = require('child_process');

/**
 * Function to execute a command in a Promise
 * @param {string} command - The command to execute
 * @returns {Promise<{stdout: string, stderr: string}>} - Promise with stdout and stderr
 */
function execPromise(command) {
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

// Self-executing async function to use await
(async function () {
  try {
    const command = 'aptos';
    console.log(`Executing command: ${command}`);

    const result = await execPromise(command);

    console.log('--- STDOUT ---');
    console.log(result.stdout);

    if (result.stderr) {
      console.log('--- STDERR ---');
      console.log(result.stderr);
    }
  } catch (error) {
    console.error('Error executing command:', error.message);
  }
})();
