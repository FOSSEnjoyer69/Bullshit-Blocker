#!/bin/bash
# Get the directory where this script is located
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FOLDER_NAME="$(basename "$DIR")"
ZIP_FILE="$DIR/${FOLDER_NAME}.zip"

# List of files and folders to ignore (patterns relative to the folder)
IGNORE_LIST=(
  "${FOLDER_NAME}.zip"  # the zip file itself
  ".git/*"              # ignore the .git folder (if present)
  "node_modules/*"      # ignore node_modules folder
  "tmp/*"               # ignore tmp folder
  "*.log"               # ignore log files
  "README.MD"
  "zip.sh"
)

# Remove any existing zip file with the same name to avoid including it in the new archive
if [ -f "$ZIP_FILE" ]; then
  echo "Removing existing zip file: $ZIP_FILE"
  rm "$ZIP_FILE"
fi

echo "Creating zip archive of $DIR..."
# Change to the target directory so that the zip archive paths are relative
cd "$DIR"

# Build the exclude arguments for the zip command
EXCLUDES=()
for pattern in "${IGNORE_LIST[@]}"; do
    EXCLUDES+=(-x "$pattern")
done

# Create the zip archive including the excludes
zip -r "$ZIP_FILE" . "${EXCLUDES[@]}"

echo "Zip archive created: $ZIP_FILE"
