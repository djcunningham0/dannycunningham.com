#!/bin/bash
# Check for image <figcaption> tags that are not wrapped in <figure> tags.
# These will not display correctly in the lightbox.
#
# Only checks figcaptions that follow an <img> tag (ignores code block captions).

set -e

CONTENT_DIR="${1:-content/posts}"
found_issues=0

while IFS= read -r line; do
    file=$(echo "$line" | cut -d: -f1)
    linenum=$(echo "$line" | cut -d: -f2)

    # Look back up to 15 lines
    start=$((linenum > 15 ? linenum - 15 : 1))
    context=$(sed -n "${start},${linenum}p" "$file")

    # Only check if there's an <img> tag nearby (skip code block captions)
    if echo "$context" | grep -q '<img'; then
        if ! echo "$context" | grep -q '<figure>'; then
            echo "$file:$linenum - image figcaption without figure tag"
            found_issues=1
        fi
    fi
done < <(grep -rn '<figcaption>' "$CONTENT_DIR" 2>/dev/null || true)

if [ $found_issues -eq 0 ]; then
    echo "All image figcaptions are properly wrapped in figure tags."
    exit 0
else
    exit 1
fi
