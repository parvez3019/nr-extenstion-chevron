# New Relic Chevron Colors Visibility

Chrome extension that colors New Relic dashboard billboard widgets based on trend direction, so increases and decreases are easier to spot at a glance.

## What it does

On New Relic dashboards (`*.newrelic.com`), the extension sets each billboard widget’s **background color** from the trend arrow and drop %:

| Condition | Background |
|-----------|------------|
| Downward trend, drop **> 15%** | Red (`#DB543B`) |
| Downward trend, drop **0–15%** | Yellow / warning (`#E6B800`) |
| Upward trend (↗) | Green (`#3BDB47`) |
| No trend arrow | Green (`#3BDB47`) |

### Reverse logic

If the widget title includes **`REV-XXX`**, or matches a title in `reverseBehaviourMap` in `inject.js` (e.g. `Ad Posting Failure`, `Posting Fail % (GNL)`):

- Downward trend, drop **> 15%** → green  
- Downward trend, drop **0–15%** → yellow (unchanged)  
- Upward trend → red  
- No trend arrow → green  

This applies to single billboards and **group widgets**: if the card title has `REV-XXX`, every row inside is reversed even when row labels do not include that text.

## Project files

| File | Purpose |
|------|---------|
| `manifest.json` | Extension config (MV3), host permissions, content script |
| `inject.js` | Logic that colors billboard widgets |
| `nr-logo.png` | Extension icon |
| `privacy.md` | Privacy policy |

## Test locally

1. Clone or open this repo:

   ```bash
   git clone git@github.com:parvez3019/nr-extenstion-chevron.git
   cd nr-extenstion-chevron
   ```

2. Open Chrome and go to `chrome://extensions`.

3. Turn on **Developer mode** (top right).

4. Click **Load unpacked** and select this project folder (the one that contains `manifest.json`).

5. Open a New Relic dashboard: https://one.newrelic.com (or your account’s `*.newrelic.com` URL).

6. Confirm billboard widgets turn red for downward trends and green otherwise; titles with `REV-XXX` should reverse.

### After code changes

1. Edit `inject.js` (or `manifest.json`).
2. On `chrome://extensions`, click the **reload** icon on this extension.
3. Hard-refresh the New Relic tab (`Cmd+Shift+R` / `Ctrl+Shift+R`).

If colors don’t update, remove the extension and **Load unpacked** again.

## Deploy (Chrome Web Store)

### 1. Bump the version

In `manifest.json`, increase `"version"` (e.g. `1.6` → `1.7`). Chrome requires a new version for each upload.

### 2. Package the extension

From the project root, zip the files the store needs (do **not** include `.git` or unrelated files):

```bash
zip -r nr-chevron-colors-v$(node -p "require('./manifest.json').version").zip \
  manifest.json inject.js nr-logo.png privacy.md readme.md
```

Or zip manually, including at least:

- `manifest.json`
- `inject.js`
- `nr-logo.png`

### 3. Upload to the Chrome Web Store

1. Open the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
2. Sign in with the publisher account.
3. Select **New Relic Chevron Colors Visibility** (or create a new item if publishing for the first time).
4. Click **Package** → **Upload new package** and select the zip.
5. Update the store listing if behavior or screenshots changed.
6. Submit for review.

First-time publishers need a one-time developer registration fee. Reviews usually take from a few hours to several days.

### 4. After publish

Users with the extension installed get the update automatically once the new version is live. For your own machine, you can keep using **Load unpacked** for development, or install from the Web Store for the published build.

## Customize reverse titles

Edit `reverseBehaviourMap` in `inject.js`:

```js
const reverseBehaviourMap = {
  'Ad Posting Failure': true,
  'Posting Fail % (GNL)': true,
  // 'Your Widget Title': true,
};
```

Any title that includes the substring `REV-XXX` is reversed automatically without changing the map.

## Privacy

See [privacy.md](privacy.md). The extension only runs on `*.newrelic.com` and does not collect user data.
