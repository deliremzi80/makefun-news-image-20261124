import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// Output directory defaults to /output inside the grader's container
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outputDir, { recursive: true });

const destination = join(outputDir, 'entry.png');
const source = new URL('./entry.png', import.meta.url);

// Copy the news summary image for 24 November 2026 to the target output directory
copyFileSync(source, destination);
