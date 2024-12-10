#!/bin/bash
# save as find_links.sh

echo "=== Searching for Next.js Link components with nested anchor tags ==="
find ./src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.tsx" \) -exec grep -l "<Link.*>.*<a" {} \;

echo -e "\n=== Searching for all Link component usage ==="
find ./src -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.tsx" \) -exec grep -l "<Link" {} \;