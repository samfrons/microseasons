#!/bin/bash

# Microseasons Project Health Check Script
# Run this before committing or creating a PR

set -e

echo "🏥 Microseasons Project Health Check"
echo "======================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track overall status
ERRORS=0
WARNINGS=0

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
        ERRORS=$((ERRORS + 1))
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    WARNINGS=$((WARNINGS + 1))
}

print_info() {
    echo -e "ℹ  $1"
}

# 1. Check Node.js version
echo "1. Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    print_status 0 "Node.js version $(node -v)"
else
    print_status 1 "Node.js version $(node -v) - Require v18 or higher"
fi
echo ""

# 2. Check if node_modules exists
echo "2. Checking dependencies..."
if [ -d "node_modules" ]; then
    print_status 0 "Dependencies installed"
else
    print_status 1 "Dependencies not installed - Run 'npm install'"
fi
echo ""

# 3. Check for TypeScript errors
echo "3. Checking TypeScript..."
if npx tsc --noEmit > /dev/null 2>&1; then
    print_status 0 "No TypeScript errors"
else
    print_status 1 "TypeScript errors found - Run 'npx tsc --noEmit' for details"
fi
echo ""

# 4. Check linting
echo "4. Checking ESLint..."
if npm run lint > /dev/null 2>&1; then
    print_status 0 "No linting errors"
else
    print_status 1 "Linting errors found - Run 'npm run lint' for details"
fi
echo ""

# 5. Check for common issues
echo "5. Checking for common issues..."

# Check for console.log in src
if grep -r "console\.log" src/ --include="*.tsx" --include="*.ts" > /dev/null 2>&1; then
    print_warning "Found console.log statements in src/"
fi

# Check for debugger statements
if grep -r "debugger" src/ --include="*.tsx" --include="*.ts" > /dev/null 2>&1; then
    print_warning "Found debugger statements in src/"
fi

# Check for .only in tests
if grep -r "\.only" src/ e2e/ --include="*.test.tsx" --include="*.spec.ts" > /dev/null 2>&1; then
    print_warning "Found .only in tests - Remove before committing"
fi

# Check for TODO comments
TODO_COUNT=$(grep -r "TODO" src/ --include="*.tsx" --include="*.ts" | wc -l | tr -d ' ')
if [ "$TODO_COUNT" -gt 0 ]; then
    print_info "Found $TODO_COUNT TODO comments"
fi

echo ""

# 6. Check Git status
echo "6. Checking Git status..."
if [ -d ".git" ]; then
    MODIFIED=$(git status --porcelain | grep "^ M" | wc -l | tr -d ' ')
    UNTRACKED=$(git status --porcelain | grep "^??" | wc -l | tr -d ' ')
    STAGED=$(git status --porcelain | grep "^M " | wc -l | tr -d ' ')

    print_info "Modified: $MODIFIED, Staged: $STAGED, Untracked: $UNTRACKED"

    # Check current branch
    BRANCH=$(git branch --show-current)
    print_info "Current branch: $BRANCH"

    if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
        print_warning "You're on the $BRANCH branch - Consider using a feature branch"
    fi
fi
echo ""

# 7. Check for large files
echo "7. Checking for large files..."
LARGE_FILES=$(find src public -type f -size +500k 2>/dev/null | wc -l | tr -d ' ')
if [ "$LARGE_FILES" -gt 0 ]; then
    print_warning "Found $LARGE_FILES files larger than 500KB - Consider optimization"
    find src public -type f -size +500k 2>/dev/null | head -5
fi
echo ""

# 8. Component count
echo "8. Project Statistics..."
COMPONENTS=$(find src/components -name "*.tsx" -not -path "*/node_modules/*" -not -path "*/__tests__/*" | wc -l | tr -d ' ')
TESTS=$(find src -name "*.test.tsx" -o -name "*.spec.ts" | wc -l | tr -d ' ')
E2E_TESTS=$(find e2e -name "*.spec.ts" 2>/dev/null | wc -l | tr -d ' ')

print_info "Components: $COMPONENTS"
print_info "Unit Tests: $TESTS"
print_info "E2E Tests: $E2E_TESTS"
echo ""

# Summary
echo "======================================"
echo "Summary"
echo "======================================"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! Project is healthy.${NC}"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ $WARNINGS warning(s) found.${NC}"
    echo "  Consider addressing these before committing."
    exit 0
else
    echo -e "${RED}✗ $ERRORS error(s) and $WARNINGS warning(s) found.${NC}"
    echo "  Please fix errors before committing."
    exit 1
fi
