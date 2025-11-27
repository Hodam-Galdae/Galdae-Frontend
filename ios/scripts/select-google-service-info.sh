#!/bin/bash

# Script to copy Firebase config based on build configuration
# Supports: Debug, Release, DevDebug, DevRelease, ProdDebug, ProdRelease

set -e

PLIST_DESTINATION="${SRCROOT}/Galdae/GoogleService-Info.plist"

# Determine which Firebase config to use based on configuration name
if [[ "${CONFIGURATION}" == *"Dev"* ]] || [[ "${CONFIGURATION}" == "Debug" ]]; then
    PLIST_SOURCE="${SRCROOT}/GoogleService-Info.dev.plist"
    echo "📱 Using Dev Firebase (Configuration: ${CONFIGURATION})"
elif [[ "${CONFIGURATION}" == *"Prod"* ]] || [[ "${CONFIGURATION}" == "Release" ]]; then
    PLIST_SOURCE="${SRCROOT}/GoogleService-Info.prod.plist"
    echo "📱 Using Prod Firebase (Configuration: ${CONFIGURATION})"
else
    echo "⚠️  Unknown configuration: ${CONFIGURATION}, defaulting to Dev"
    PLIST_SOURCE="${SRCROOT}/GoogleService-Info.dev.plist"
fi

# Check if source exists
if [ ! -f "$PLIST_SOURCE" ]; then
    echo "❌ Error: $PLIST_SOURCE not found!"
    exit 1
fi

# Copy the file
cp "$PLIST_SOURCE" "$PLIST_DESTINATION"
echo "✅ Copied $(basename $PLIST_SOURCE) to Galdae/"
