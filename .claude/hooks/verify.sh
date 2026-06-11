#!/usr/bin/env bash
# PostToolUse hook — incremental compile scoped to the edited module.
#
# No formatter is configured in this project (no Spotless/Checkstyle); the
# format step is skipped. Add `./gradlew spotlessApply -q` here once a
# formatter plugin is wired into build.gradle.kts.
#
# For the React Native / Next.js surfaces (deferred — see CLAUDE.md §1):
# add `npx prettier --write` + `npx tsc --noEmit` scoped to the edited
# package once those modules are scaffolded.
#
# On compile failure: last 40 lines → stderr, exit 2.
# On success: exit 0.
set -euo pipefail

INPUT=$(cat)

# Determine which Gradle subproject to compile based on the edited file path.
# The hook input JSON contains the tool_input.file_path field.
if echo "$INPUT" | grep -qi "kindred.domain"; then
  TASKS=":kindred-domain:classes :kindred-domain:testClasses"
elif echo "$INPUT" | grep -qi "kindred.app"; then
  TASKS=":kindred-app:classes :kindred-app:testClasses"
else
  # Fallback: compile everything (e.g. root-level config changes)
  TASKS="classes testClasses"
fi

cd "$CLAUDE_PROJECT_DIR"

if OUTPUT=$(./gradlew $TASKS -q 2>&1); then
  exit 0
else
  printf '%s\n' "$OUTPUT" | tail -40 >&2
  exit 2
fi
