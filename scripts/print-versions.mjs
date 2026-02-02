import { execSync } from 'child_process';

console.log('=== Runtime Versions ===');
console.log(`Node.js: ${process.version}`);
console.log(`pnpm: ${execSync('pnpm -v').toString().trim()}`);

console.log('\n=== Installed Dependencies ===');
const output = execSync('pnpm list --depth=0').toString();
console.log(output);
