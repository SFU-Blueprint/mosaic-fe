#!/bin/bash
# Setup script to configure Git hooks path

echo "Setting up Git hooks..."
git config core.hooksPath hooks
echo "Git hooks path set to 'hooks' directory."
