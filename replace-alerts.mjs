import fs from 'fs/promises';
import path from 'path';

const files = [
  'app/admin/testimonials/page.tsx',
  'app/admin/settings/page.tsx',
  'app/admin/skills/page.tsx',
  'app/admin/services/page.tsx',
  'app/admin/problems/page.tsx',
  'app/admin/hero/page.tsx',
  'app/admin/blogs/page.tsx',
  'app/admin/ai-rag/page.tsx',
];

async function run() {
  for (const file of files) {
    const fullPath = path.resolve('c:/Users/naim dev/Desktop/naim_s_project/portfolio_version2.0/frontend', file);
    let content = await fs.readFile(fullPath, 'utf8');

    // Add import if not present
    if (content.includes('alert(') && !content.includes("import { toast } from 'react-hot-toast';")) {
      content = content.replace(/(import .* from '.*';\n)/, "$1import { toast } from 'react-hot-toast';\n");
    }

    // Replace alerts based on string content
    content = content.replace(/alert\('([^']+)'\)/g, (match, p1) => {
      if (p1.toLowerCase().includes('failed') || p1.toLowerCase().includes('error')) {
        return `toast.error('${p1}')`;
      }
      return `toast.success('${p1}')`;
    });

    await fs.writeFile(fullPath, content);
    console.log(`Updated ${file}`);
  }
}

run().catch(console.error);
