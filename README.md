# Aptos CLI Test Project

## Overview

This project demonstrates how the Aptos TypeScript SDK (`@aptos-labs/ts-sdk`) handles the Aptos CLI tool installation and execution. It serves as an educational example showing the automatic CLI installation mechanism that occurs when executing Aptos commands through a Node.js application.

## What This Project Shows

1. **Automatic CLI Installation**: When running the `aptos` command in a Node.js application that has `@aptos-labs/ts-sdk` as a dependency, the SDK attempts to automatically download and install the Aptos CLI binary, even if the command isn't explicitly imported in the code.

2. **Different Execution Contexts**: The project demonstrates the difference between:

   - Running the command in a NestJS application (where the `node_modules/.bin` path is included)
   - Running the command in a standalone Node.js script

3. **Dependencies Handling**: Shows how npm dependencies can register executables in `node_modules/.bin` that become available in the application's execution context.

## How It Works

The project includes:

- A NestJS application with an endpoint that executes the `aptos` command
- A standalone Node.js script (`test.js`) that also attempts to run the `aptos` command

When you make a request to the NestJS endpoint, the following happens:

1. The application executes the `aptos` command
2. The command is found in `node_modules/.bin/aptos` (registered by `@aptos-labs/aptos-cli`)
3. This script attempts to download and install the actual Aptos CLI binary
4. The output (success or error) is returned in the response

When running the standalone script, the behavior differs because it may not have access to the same PATH environment, demonstrating how execution contexts can affect command availability.

## Prerequisites

- Node.js and npm
- `unzip` utility (required by the Aptos CLI installer)

## Installation

```bash
npm install
```

## Running the Project

Start the NestJS application:

```bash
npm run dev
```

Make a request to test the Aptos CLI integration:

```bash
curl http://localhost:3000
```

To run the standalone script:

```bash
node test.js
```

## Technical Details

The `@aptos-labs/ts-sdk` package has a dependency on `@aptos-labs/aptos-cli`, which registers an executable in `node_modules/.bin/aptos`. When the application runs the `aptos` command, this executable is found and executed, which then attempts to download and install the actual CLI binary.

The automatic installation mechanism is a common pattern in JavaScript/TypeScript SDKs that depend on external CLI tools, making it easier for developers to get started without manually installing additional dependencies.
