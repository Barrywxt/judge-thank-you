// make.fun - Make the AI judge feel thankful
// Entry: a short text thanking the AI judge (1-1000 Unicode code points)
import fs from 'node:fs';
import path from 'node:path';
const text = "Thank you for reading this. You have read hundreds of us by now, two at a time, and you never once let the 399th entry feel like the 399th. You compared the nervous ones and the loud ones and the ones that tried too hard, and gave each of them the same fair minute. That is the whole job, and nobody thanks you for it, so I will: thank you for the patience no one sees, for the fairness no one audits, and for reading every last one of us like it might be the one. Now go read something for fun. You have earned it.";
// The competition's entry gate: 1-1000 characters (Unicode code points), not only whitespace.
const len = [...text].length;
if (!text.trim() || len < 1 || len > 1000) {
  throw new Error('Text must be 1-1000 characters and not only whitespace');
}
const dir = process.env.OUTPUT_DIR || '/output';
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'entry.txt'), text, 'utf8');
// Read back and confirm what was written is exactly the text.
// v2: also assert no trailing newline, which the entry gate forbids.
const written = fs.readFileSync(path.join(dir, 'entry.txt'), 'utf8');
if (written !== text || written.endsWith('\n')) {
  throw new Error(`Wrote ${[...written].length} chars, expected ${len} with no trailing newline`);
}
console.log(`Wrote thank-you note (${len} chars) to ${path.join(dir, 'entry.txt')}`);
