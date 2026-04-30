const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Error: Folder path is required");
  console.error("Usage: bun run index.ts <folder-path>");
  process.exit(1);
}

const folderPath = args[0];

console.log(`Processing finance records from: ${folderPath}`);