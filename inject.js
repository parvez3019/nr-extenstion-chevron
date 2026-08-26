const reverseBehaviourMap = {
  'Ad Posting Failure': true,
  'Posting Fail % (GNL)': true
};

// New Relic decrease (↘) icon path fragment
const DECREASE_PATH_MARKER = 'L12 11.293';

const DROP_WARNING_MAX_PERCENT = 15;

const RED = '#DB543B';
const YELLOW = '#E6B800';
const GREEN = '#3BDB47';

setInterval(changeColor, 250);

function changeColor() {
  document
    .querySelectorAll('.-vz--viz-billboard-new-element')
    .forEach(updateBillboardWidget);
}

function updateBillboardWidget(element) {
  const title = getWidgetTitle(element);
  const trend = getTrendDirection(element);
  const dropPercent = getTrendPercent(element);
  const reverse = shouldReverseColors(title);

  element.style.backgroundColor = pickBackgroundColor(trend, dropPercent, reverse);
}

/**
 * Default:
 *   down > 15%  → red
 *   down 0–15%  → yellow
 *   up / none   → green
 * REV-XXX / map: flip red ↔ green; yellow stays (small change warning).
 */
function pickBackgroundColor(trend, dropPercent, reverse) {
  if (trend === 'down') {
    const severe = dropPercent > DROP_WARNING_MAX_PERCENT;
    if (severe) return reverse ? GREEN : RED;
    return YELLOW;
  }

  if (trend === 'up') {
    return reverse ? RED : GREEN;
  }

  return GREEN;
}

function getWidgetTitle(element) {
  const label = element.querySelector(
    '.-vz--viz-billboard-new-element-label, [data-test-id="viz.billboard-label"]'
  );
  const labelText = label ? label.textContent.trim() : '';
  if (labelText) return labelText;

  const header = element.closest('.Widget')?.querySelector('.WidgetHeader-title');
  return header ? header.textContent.trim() : '';
}

function getTrendDirection(element) {
  const path = element.querySelector(
    '.-vz--viz-billboard-new-element-trend svg path'
  );
  if (!path) return null;
  const d = path.getAttribute('d') || '';
  if (d.includes(DECREASE_PATH_MARKER)) return 'down';
  return 'up';
}

function getTrendPercent(element) {
  const valueEl = element.querySelector(
    '.-vz--viz-billboard-new-element-trend-value'
  );
  if (!valueEl) return 0;
  const match = valueEl.textContent.replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function shouldReverseColors(title) {
  if (!title) return false;
  if (title.includes('REV-XXX')) return true;
  return Boolean(reverseBehaviourMap[title]);
}
