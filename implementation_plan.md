# Redesign Publications, News & Legal Updates Pages

Create three premium Insights pages that feel cohesive and professional, matching the existing Kian brand system (navy/gold palette, Playfair Display + Inter fonts, subpage hero pattern).

## Proposed Changes

### Design Approach

All three pages share the same core layout structure but differ in content and category focus:

| Page | Focus | Key Content Types |
|------|-------|-------------------|
| **Publications** | Long-form articles, white papers, research | Featured article + article grid with category filters |
| **News** | Firm news, events, press releases, awards | Highlighted latest story + news timeline grid |
| **Legal Updates** | Legislative changes, case law, regulatory alerts | Alert-style cards grouped by practice area |

Each page will have:
1. **Subpage Hero** — existing pattern with unique descriptions
2. **Category Filter Bar** — clickable pill tabs to filter articles by topic
3. **Featured / Highlighted Article** — large hero card at the top
4. **Article Grid** — responsive 2- or 3-column cards with image, date, category tag, title, excerpt
5. **Newsletter CTA Strip** — a band encouraging email subscription
6. **Footer + Mobile Nav** — reuse existing patterns (with corrected nav links for News & Legal Updates)

---

### Component: CSS Styles

#### [MODIFY] [styles.css](file:///home/darknight/Desktop/Law%20Firm%20Site/KIAN%20ADVOCAATES/Kian%20Associated%20Advocates%20Officical%20site/css/styles.css)

Add new CSS block `/* Insights Pages — Publications, News, Legal Updates */` with styles for:

- `.insights-filter` — horizontal scrollable pill filter bar
- `.insights-filter__btn` — filter pill buttons (active state with gold underline)
- `.insights-featured` — large featured article hero card (image left, content right on desktop)
- `.insights-grid` — responsive 3-column article card grid
- `.insights-card` — article card (image, category badge, title, excerpt, date, read-more link)
- `.insights-card__badge` — colored category tag pill
- `.insights-card__meta` — date + reading time row
- `.insights-newsletter` — navy background CTA strip with email input + subscribe button

---

### Component: Publications Page

#### [MODIFY] [Documentation.html](file:///home/darknight/Desktop/Law%20Firm%20Site/KIAN%20ADVOCAATES/Kian%20Associated%20Advocates%20Officical%20site/Documentation.html)

Complete redesign of main content. The hero section stays the same pattern but updated title/description. Sections:

1. **Hero**: Title = "Publications", description about legal insights & thought leadership
2. **Filter Bar**: All, Corporate & M&A, Banking & Finance, Tax, Employment, Dispute Resolution
3. **Featured Publication**: Large card — "2025 East African Investment Climate Report" with image + excerpt
4. **Publications Grid**: 6 article cards across practice areas with:
   - Unsplash legal/business images
   - Category badges
   - Titles like "Transfer Pricing Compliance Guide", "New Data Protection Regulations", etc.
   - Dates, read times, brief excerpts
5. **Newsletter CTA**: "Stay Informed" subscription prompt
6. **Existing CTA Section**: Kept as-is
7. **Footer & Mobile Nav**: Kept as-is, nav links updated to point to new pages

---

### Component: News Page

#### [NEW] [News.html](file:///home/darknight/Desktop/Law%20Firm%20Site/KIAN%20ADVOCAATES/Kian%20Associated%20Advocates%20Officical%20site/News.html)

New page with same structure:

1. **Hero**: Title = "News", description about firm updates and industry events
2. **Filter Bar**: All, Firm News, Awards, Events, Press Releases
3. **Featured News**: "Kian Advocates Recognized as Top Tier Firm by Legal 500 East Africa"
4. **News Grid**: 6 cards — firm award announcements, partner profiles, community events, new office, seminar, pro bono work
5. **Newsletter CTA**
6. **CTA Section + Footer + Mobile Nav**

---

### Component: Legal Updates Page

#### [NEW] [Legal Updates.html](file:///home/darknight/Desktop/Law%20Firm%20Site/KIAN%20ADVOCAATES/Kian%20Associated%20Advocates%20Officical%20site/Legal%20Updates.html)

New page with same structure:

1. **Hero**: Title = "Legal Updates", description about regulatory changes and case law developments
2. **Filter Bar**: All, Tax, Banking & Finance, Employment, Corporate, IP
3. **Featured Update**: "Uganda's New Income Tax Amendment Act 2025 — What Businesses Need to Know"
4. **Updates Grid**: 6 cards — regulatory briefings, court rulings, legislative changes
5. **Newsletter CTA**
6. **CTA Section + Footer + Mobile Nav**

---

### Component: Navigation Link Updates

All pages across the site currently link News and Legal Updates to `#`. These need to be updated to point to the new pages.

> [!IMPORTANT]
> The nav links for News (`href="#"`) and Legal Updates (`href="#"`) exist in every HTML file's header, footer, and mobile nav. I will update them in **all** existing HTML files using a script, not just the new pages.

---

## Open Questions

> [!NOTE]
> **Content**: I'll use realistic placeholder content relevant to a Ugandan law firm. If you have actual article titles, dates, or images you'd like used, let me know before I start.

> [!NOTE]
> **Photo Documentation Section**: The current Documentation.html has a Video Documentation and Photo Documentation section. These will be **removed** in the redesign since the page is being repurposed as a proper Publications/Insights page. Should I preserve these sections on a separate page, or is removing them fine?

## Verification Plan

### Manual Verification
- Open all 3 pages at `localhost:8080` and verify responsive layouts at desktop/tablet/mobile
- Confirm filter tabs toggle card visibility
- Verify all nav links (desktop mega-menu + mobile accordion) point to the correct new pages
- Verify brand consistency (colors, typography, spacing)
