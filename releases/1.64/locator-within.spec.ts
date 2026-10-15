/**
 * Author:   Rex Jones II
 * Date:     2026-10-14
 * Walkthrough: https://rexjones2.com
 * Verified: https://ui.rexjones2.com/webtables (no login required)
 *
 * Playwright 1.64 added locator.within(). This file shows BEFORE and AFTER
 * for the same goal: grab the Email cell (4th column) of every row.
 * The first two tests return the same column. The third makes it survive a
 * column reorder by finding the column from its header instead of a fixed index.
 */

import { test, expect } from '@playwright/test';

const EMAILS = ['user1@example.com', 'user2@example.com', 'user3@example.com'];

test('column - before (CSS)', async ({ page }) => {
  await page.goto('https://ui.rexjones2.com/webtables');

  // Pre-1.64 (Before within()): drop out of the locator API and lean on a CSS selector.
  const emailColumn = page.locator('tbody tr td:nth-child(4)');

  await expect(emailColumn).toHaveText(EMAILS);
});

test('column - after (within)', async ({ page }) => {
  await page.goto('https://ui.rexjones2.com/webtables');

  // 1.64: nth() resolves inside each parent row on its own.
  // Reads as one column, top to bottom. No CSS, no loop.
  const rows = page.getByRole('row');
  const emailColumn = page.getByRole('cell').nth(3).within(rows);

  await expect(emailColumn).toHaveText(EMAILS);
});

test('column - stable (survives a reorder)', async ({ page }) => {
  await page.goto('https://ui.rexjones2.com/webtables');

  // nth(3) is positional, so a column reorder would break it. Find the column
  // by its header instead. The header renders UPPERCASE via CSS text-transform,
  // so match case-insensitive.
  //
  // The stability comes from the header-derived index, NOT from within().
  // within() only scopes nth() to each row. The two are independent.
  const headers = await page.getByRole('columnheader').allInnerTexts();
  const emailIndex = headers.findIndex((t) => t.trim().toLowerCase() === 'email');
  expect(emailIndex).toBeGreaterThanOrEqual(0);

  const rows = page.getByRole('row');
  const emailColumn = page.getByRole('cell').nth(emailIndex).within(rows);

  await expect(emailColumn).toHaveText(EMAILS);
});
