import { createHash } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

const url = 'https://uc86e40249ec469801fa412e711a.dl.dropboxusercontent.com/cd/0/get/DH6eLj4GjixTm2Q2xzxi51slOrhCpr4dgMtAiErzE9lw7thbOr25-e8U6xFPmkdaLeAZI4YzMALuXRtbohll3GbI1SJIJCPVPZW2GO1lR0wc-ZPRmG2-TpKuK_6b_PEi-rJ_-np7qscTfC9dcwKMDdtnvrUE1cbpxsXJ2HYbXYk_IQ/file?c_luid=7f9d419c';
const expected = '7624edac507c1abf4257207b475133575a5239f41a09fbc150ca1a552b3dbd09';
const output = new URL('../public/tatiana-babanova-project-manager.pdf', import.meta.url);

const response = await fetch(url, { redirect: 'follow' });
if (!response.ok) throw new Error(`PDF download failed: ${response.status}`);
const bytes = Buffer.from(await response.arrayBuffer());
const actual = createHash('sha256').update(bytes).digest('hex');
if (actual !== expected) throw new Error(`PDF checksum mismatch: ${actual}`);
await writeFile(output, bytes);
console.log(`Installed latest portfolio PDF: ${bytes.length} bytes`);
