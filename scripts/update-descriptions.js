import { query, ensureSchema } from '../lib/db';
import { updateDescriptionsData as descriptions } from './update-descriptions-data.js';

async function updateDescriptions() {
  await ensureSchema();
  const { rows: universities } = await query('SELECT id, name FROM universities');

  let updated = 0;
  for (const uni of universities) {
    const info = descriptions[uni.name];
    if (info) {
      await query('UPDATE universities SET description = $1, short_code = $2 WHERE id = $3', [info.desc, info.code, uni.id]);
      updated++;
    }
  }

  console.log(`Updated descriptions for ${updated} universities out of ${universities.length}`);
}

updateDescriptions().catch(console.error);
