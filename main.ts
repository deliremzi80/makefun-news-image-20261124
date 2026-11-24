import * as fileSystem from 'node:fs';
import * as pathUtility from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Entrypoint for Makefun news-image-20261124 challenge.
 * Delivers the daily visual news digest for 24 November 2026.
 */
function deliverNewsDigest(): void {
  const currentDirectory = pathUtility.dirname(fileURLToPath(import.meta.url));
  const sourceImageFile = pathUtility.resolve(currentDirectory, 'entry.png');
  const targetOutputDirectory = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const destinationImageFile = pathUtility.join(targetOutputDirectory, 'entry.png');

  if (!fileSystem.existsSync(sourceImageFile)) {
    throw new Error(`Critical error: Source infographic missing at ${sourceImageFile}`);
  }

  fileSystem.mkdirSync(targetOutputDirectory, { recursive: true });
  fileSystem.copyFileSync(sourceImageFile, destinationImageFile);

  const sourceStatistics = fileSystem.statSync(sourceImageFile);
  const destinationStatistics = fileSystem.statSync(destinationImageFile);

  if (sourceStatistics.size !== destinationStatistics.size) {
    throw new Error('Verification failure: Output file size differs from source');
  }

  console.log(`[Makefun] Verified digest size: ${destinationStatistics.size} bytes`);
  console.log(`[Makefun] Successfully delivered 24 Nov 2026 digest -> ${destinationImageFile}`);
}

deliverNewsDigest();
