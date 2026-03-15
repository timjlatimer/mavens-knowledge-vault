#!/usr/bin/env python3
"""
Pearl's Brain Search & Index Tool
==================================
Searches across all files in Pearl's Brain for any keyword or phrase.
Returns matching files, context snippets, and relevance ranking.

Usage:
    python3 brain_search.py "search term"
    python3 brain_search.py "search term" --type contacts
    python3 brain_search.py --index
    python3 brain_search.py --health
    python3 brain_search.py --stubs
"""

import os
import sys
import re
import json
from datetime import datetime
from collections import defaultdict

BRAIN_ROOT = "/home/ubuntu/pearls_brain"
VAULT_ROOT = "/home/ubuntu/recovered_docs"

BRAIN_SECTIONS = {
    "contacts": os.path.join(BRAIN_ROOT, "contacts"),
    "portfolio": os.path.join(BRAIN_ROOT, "portfolio"),
    "knowledge_base": os.path.join(BRAIN_ROOT, "knowledge_base"),
    "session_logs": os.path.join(BRAIN_ROOT, "session_logs"),
    "core": BRAIN_ROOT,
}


def search_brain(query, section=None, include_vault=False):
    """Search across all brain files for a query string."""
    query_lower = query.lower()
    results = []

    # Determine which directories to search
    if section and section in BRAIN_SECTIONS:
        search_dirs = {section: BRAIN_SECTIONS[section]}
    else:
        search_dirs = BRAIN_SECTIONS.copy()

    if include_vault:
        search_dirs["gmail_vault"] = os.path.join(VAULT_ROOT, "gmail_emails")

    for section_name, dir_path in search_dirs.items():
        if not os.path.exists(dir_path):
            continue

        for filename in os.listdir(dir_path):
            if not filename.endswith(".md"):
                continue

            filepath = os.path.join(dir_path, filename)

            # Skip directories
            if os.path.isdir(filepath):
                continue

            try:
                with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
            except Exception:
                continue

            # Count matches
            matches = len(re.findall(re.escape(query_lower), content.lower()))
            if matches == 0:
                continue

            # Extract context snippets (up to 3)
            snippets = []
            for match in re.finditer(re.escape(query_lower), content.lower()):
                start = max(0, match.start() - 80)
                end = min(len(content), match.end() + 80)
                snippet = content[start:end].replace("\n", " ").strip()
                if start > 0:
                    snippet = "..." + snippet
                if end < len(content):
                    snippet = snippet + "..."
                snippets.append(snippet)
                if len(snippets) >= 3:
                    break

            # Get file title (first heading)
            title_match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
            title = title_match.group(1) if title_match else filename

            # Get last updated date
            date_match = re.search(r"\*\*Last Updated:\*\*\s*(.+)", content)
            last_updated = date_match.group(1).strip() if date_match else "Unknown"

            results.append({
                "file": filename,
                "path": filepath,
                "section": section_name,
                "title": title,
                "matches": matches,
                "last_updated": last_updated,
                "snippets": snippets,
            })

    # Sort by match count (relevance)
    results.sort(key=lambda x: x["matches"], reverse=True)
    return results


def build_index():
    """Build a complete index of Pearl's Brain."""
    index = {
        "generated": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "sections": {},
        "total_files": 0,
        "total_words": 0,
    }

    for section_name, dir_path in BRAIN_SECTIONS.items():
        if not os.path.exists(dir_path):
            continue

        section_data = {"files": [], "file_count": 0, "word_count": 0}

        for filename in sorted(os.listdir(dir_path)):
            if not filename.endswith(".md"):
                continue

            filepath = os.path.join(dir_path, filename)
            if os.path.isdir(filepath):
                continue

            try:
                with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
            except Exception:
                continue

            word_count = len(content.split())

            # Get title
            title_match = re.search(r"^#\s+(.+)$", content, re.MULTILINE)
            title = title_match.group(1) if title_match else filename

            # Get last updated
            date_match = re.search(r"\*\*Last Updated:\*\*\s*(.+)", content)
            last_updated = date_match.group(1).strip() if date_match else "Unknown"

            # Check if stub
            is_stub = "stub" in content.lower() and "enrichment" in content.lower()

            section_data["files"].append({
                "filename": filename,
                "title": title,
                "words": word_count,
                "last_updated": last_updated,
                "is_stub": is_stub,
            })
            section_data["file_count"] += 1
            section_data["word_count"] += word_count

        index["sections"][section_name] = section_data
        index["total_files"] += section_data["file_count"]
        index["total_words"] += section_data["word_count"]

    return index


def health_check():
    """Run a health check on Pearl's Brain."""
    index = build_index()

    total_files = index["total_files"]
    total_stubs = sum(
        1
        for section in index["sections"].values()
        for f in section["files"]
        if f.get("is_stub")
    )

    completeness = ((total_files - total_stubs) / total_files * 100) if total_files > 0 else 0

    print("=" * 60)
    print("  PEARL'S BRAIN — HEALTH CHECK")
    print(f"  Generated: {index['generated']}")
    print("=" * 60)
    print()
    print(f"  Total Files:      {total_files}")
    print(f"  Total Words:      {index['total_words']:,}")
    print(f"  Stub Entries:     {total_stubs}")
    print(f"  Completeness:     {completeness:.0f}%")
    print()

    for section_name, section_data in index["sections"].items():
        stubs = sum(1 for f in section_data["files"] if f.get("is_stub"))
        print(f"  [{section_name}] {section_data['file_count']} files, "
              f"{section_data['word_count']:,} words"
              f"{f', {stubs} stubs' if stubs > 0 else ''}")

    print()

    # List stubs
    if total_stubs > 0:
        print("  STUBS AWAITING ENRICHMENT:")
        for section_name, section_data in index["sections"].items():
            for f in section_data["files"]:
                if f.get("is_stub"):
                    print(f"    - [{section_name}] {f['title']}")
    print()
    print("=" * 60)


def list_stubs():
    """List all stub entries that need enrichment."""
    index = build_index()
    stubs = []
    for section_name, section_data in index["sections"].items():
        for f in section_data["files"]:
            if f.get("is_stub"):
                stubs.append((section_name, f["filename"], f["title"]))

    if not stubs:
        print("No stubs found. All entries are complete.")
    else:
        print(f"Found {len(stubs)} stub(s) awaiting enrichment:\n")
        for section, filename, title in stubs:
            print(f"  [{section}] {title}")
            print(f"    File: {filename}")
            print()


def print_results(results, query):
    """Pretty-print search results."""
    if not results:
        print(f'\nNo results found for "{query}"')
        return

    print(f'\n{"=" * 60}')
    print(f'  SEARCH RESULTS: "{query}"')
    print(f"  Found {len(results)} matching file(s)")
    print(f'{"=" * 60}\n')

    for i, r in enumerate(results, 1):
        print(f"  {i}. [{r['section']}] {r['title']}")
        print(f"     File: {r['file']} | Matches: {r['matches']} | Updated: {r['last_updated']}")
        for snippet in r["snippets"][:2]:
            print(f"     > {snippet}")
        print()


def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print('  python3 brain_search.py "search term"        # Search all brain files')
        print('  python3 brain_search.py "term" --type contacts  # Search specific section')
        print('  python3 brain_search.py "term" --vault       # Include Gmail vault')
        print("  python3 brain_search.py --index              # Build full index")
        print("  python3 brain_search.py --health             # Run health check")
        print("  python3 brain_search.py --stubs              # List stub entries")
        sys.exit(1)

    if sys.argv[1] == "--index":
        index = build_index()
        output_path = os.path.join(BRAIN_ROOT, "brain_index.json")
        with open(output_path, "w") as f:
            json.dump(index, f, indent=2)
        print(f"Index built: {index['total_files']} files, {index['total_words']:,} words")
        print(f"Saved to: {output_path}")
        return

    if sys.argv[1] == "--health":
        health_check()
        return

    if sys.argv[1] == "--stubs":
        list_stubs()
        return

    query = sys.argv[1]
    section = None
    include_vault = False

    # Parse optional flags
    for i, arg in enumerate(sys.argv[2:], 2):
        if arg == "--type" and i + 1 < len(sys.argv):
            section = sys.argv[i + 1]
        if arg == "--vault":
            include_vault = True

    results = search_brain(query, section=section, include_vault=include_vault)
    print_results(results, query)


if __name__ == "__main__":
    main()
