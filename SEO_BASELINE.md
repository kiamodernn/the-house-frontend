# SEO baseline

The frontend is HTML-first and multi-page. Primary content does not depend on client-side rendering.

## Required before production
- Replace `https://thehouse.example` via `SITE_URL` with the real canonical origin before building.
- Connect verified CMS data for operator facts, offers, licences, slot data and tipster performance. Do not publish demo metrics as factual claims.
- Keep utility pages (`/search/`, `/profile/`, `/notifications/`, `/coin/`) noindex unless product requirements materially change.
- Keep internal navigation as real `<a href>` links.
- Generate unique title, meta description, canonical, Open Graph and one descriptive H1 per indexable page.
- Maintain robots.txt and XML sitemap from the same canonical URL registry.
- Structured data must match visible page content. Do not add unsupported review/rating schema solely to chase rich results.
- Article templates should expose author, published/modified dates, editorial sourcing and useful internal links.
- Images must use explicit dimensions, responsive sources and meaningful alt text when content-bearing.
- Performance targets at p75: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- Avoid JS for primary content; progressive enhancement only for filters, drawers and account UI.
- Validate with Search Console URL Inspection, Rich Results Test where applicable, Lighthouse and field Core Web Vitals after deployment.

## Gambling-content guardrails
Legal age, responsible-gaming resources, affiliate disclosures, operator availability and marketing restrictions are jurisdiction-specific. Production copy and product logic need market-specific compliance review.
