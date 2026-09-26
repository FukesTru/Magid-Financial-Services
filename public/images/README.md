# Photographs go here

Drop a file in this folder and it appears on the site. No code change.

Each slot looks for its basename with any of `.jpg`, `.jpeg`, `.png` or
`.webp`, and reads the real pixel dimensions out of the file header at build
time — so a re-export, a crop change or a format swap needs no edit either.

| Filename        | Appears on                      |
| --------------- | ------------------------------- |
| `hero-desk`     | Homepage hero                   |
| `office-interior` | About                         |
| `ledger-edges`  | Closing call to action          |
| `reception`     | Contact                         |
| `kitchen-table` | /services/individuals           |
| `back-office`   | /services/businesses            |
| `envelopes`     | /services/tax-problems          |

A missing file is not an error: that section renders exactly as it does today,
carried by the guilloche engraving. Adding them one at a time is fine.

See `IMAGERY.md` in the repo root for what each image should show, and
`src/lib/images.ts` for the alt text attached to each slot.
