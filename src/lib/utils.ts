import { createCn } from "cn/config";

/* `cn` merges class names, and a later class wins over an earlier one of the
 * same kind. It knows Tailwind's own font sizes, so the site's type ramp in
 * globals.css is named here: without it, `text-note text-prose` reads as two
 * colours and the size is dropped. */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "headline",
            "figure",
            "quote",
            "lede",
            "title",
            "body",
            "note",
            "small",
            "caption",
            "label",
            "label-sm",
          ],
        },
      ],
    },
  },
});
