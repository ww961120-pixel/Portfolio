# Personal Portfolio Works Redesign

Date: 2026-07-24  
Status: Approved visual direction, ready for implementation planning

## Objective

Rebuild the personal portfolio's `Works` experience using the stronger spatial
rhythm and interaction system developed for the TANOUE LAB website, while
preserving the personal portfolio's existing four-page `Profile` and its much
deeper project-process archive.

The result must remain a personal employment portfolio. No TANOUE LAB branding,
laboratory navigation, research-phase taxonomy, or institutional labels may
appear in the personal site unless they are factual content inside an individual
project.

## Confirmed Direction

The approved structure is a hybrid:

1. Four existing full-screen Profile pages remain the personal introduction.
2. Works opens with a full-screen `Selected Works` presentation.
3. Ten featured projects are presented in a deliberate job-search order.
4. A complete `Project Atlas` preserves access to all other work.
5. Each project opens into a cinematic but information-rich detail page.
6. Existing date-by-date studies, PDF pages, research, site visits, technical
   drawings, and final outputs remain available.

## Featured Project Order

1. 柳川市庁舎プロジェクト
2. 西中洲プロジェクト
3. 宮古島ホテルプロジェクト
4. 室見団地計画
5. 台北集合住宅提案
6. 熊本集合住宅プロジェクト
7. 宇城市キャリアアップ支援センター
8. 御船町アートポリス・コンペ
9. NOT A HOTEL Competition 2024
10. 厦門同文頂・都市更新

The remaining projects continue in the Atlas, including Chinese professional
competitions, Island Competition Series, Chengdu Competition Sites, Breaking
the Wall, Observation Deck Design, Pavilion of the Waves, Japanese student
competitions, Hope Cup, and Master Portfolio 2022.

## Information Architecture

### Global Navigation

- Personal identity: `WANG YINQI`
- Primary destinations: `Profile`, `Works`
- Language behavior stays consistent with the existing personal site.
- Navigation remains minimal and usable over both light and dark media.

### Profile

The existing four full-screen Profile pages remain functionally and visually
intact:

1. Personal cover
2. Identity, education, languages, capability, and suitable roles
3. Software proficiency
4. Project-type experience

Only compatibility adjustments required by the new Works architecture are
allowed. Profile content must not be rewritten or reduced during this phase.

### Works Home

#### Selected Works

- Full-viewport project image.
- Project number, geography, category, and current status.
- Short project-specific statement.
- Direct access to the corresponding project detail page.
- Ten-position navigation rail.
- Hover on desktop and tap/click on touch devices changes the selected project.
- Motion must be restrained: image crossfade, slight scale reset, and text
  transition without decorative animation.

#### Project Atlas

- Complete visual index of every portfolio project.
- Primary filters: `All Projects`, `Japan`, `China`, `Academic`.
- Secondary factual metadata can identify practical work, research, competition,
  or proposal status.
- Taipei remains in the Japan group because it was completed through Japanese
  professional collaboration.
- Cards use real project covers, readable titles, project category, and status.
- The Atlas must not hide less prominent work; filtering only changes visibility.

## Project Detail Template

Every project follows the same top-level rhythm while allowing project-specific
chapters.

1. Full-screen project cover
2. Project overview and personal contribution
3. Process chapter navigation
4. Chapter-specific windows and deep archives
5. Final outcomes
6. Technical drawings, research, publications, or evidence where relevant
7. Previous and next project navigation

### Full-Screen Cover

- Real project image, no abstract placeholder.
- Project title is the first-viewport signal.
- Location, period, status, type, design stage, and personal role are visible.
- The image is framed responsively without destructive cropping.

### Overview and Personal Role

The overview distinguishes:

- factual project information;
- team and design stage;
- the user's contribution;
- evidence available in the page.

Role descriptions must remain accurate. They can include design study,
3D modeling, rendering, presentation editing, research, coordination, project
management, interior study, and technical-drawing support where supported by the
project files.

### Process Chapter Navigation

Each project receives a horizontal chapter rail on desktop and a swipeable rail
on mobile. Example chapters:

- Site and context
- Design studies
- Interior design
- Technical drawings
- Research and investigation
- Construction or mock-up study
- Final outcome

The chapter rail summarizes content; it never replaces the existing detailed
archive.

### Deep Process Windows

Date-specific folders and proposal alternatives remain individually accessible.
For projects with many study periods, a visual overview shows the scale of work
before the user opens a specific period.

Examples:

- Nishinakasu: 2025.06 through 2026.01 massing and facade studies
- Yanagawa: exterior, corridor, interior, axonometric, and final-stage studies
- Miyakojima: site research, modular studies, layout studies, supply-chain
  coordination, 1:1 mock-up, factory visit, and structural research
- Taipei: A/B schemes, later proposal variants, plans, and final renderings
- Muromi: dated planning studies, final renderings, and the complete project book
- Kumamoto housing: design stages, technical drawing set, and final renderings
- Uki: people/no-people rendering sets, later modeling, and latest plan

## Media Viewer

The existing full-screen viewer is retained and normalized across every project.

Required behaviors:

- full image is visible with `contain` fit by default;
- page can scroll when zoomed;
- zoom in, zoom out, fit, and 1:1 controls;
- previous and next controls for continuous image/PDF sequences;
- keyboard arrows, Escape, and touch swipe;
- counter and descriptive title;
- no background-page scrolling while open;
- portrait and landscape pages preserve their correct orientation;
- PDF pages are rendered as optimized web images for predictable viewing.

## Content Model

Project data will be separated from presentation code.

Each project record includes:

- stable project ID;
- Japanese and English title;
- featured order;
- Atlas group;
- factual type and status;
- cover asset;
- location and period;
- personal roles;
- short summary;
- process chapters;
- galleries and ordered media;
- evidence links or PDF-derived pages;
- previous/next relationships.

Existing media paths are reused where possible. New derivative files are created
only for responsive covers, thumbnails, or PDF-page previews.

## Visual System

- Neutral off-white background, black typography, and restrained rust accent.
- Serif display typography for project-scale titles; sans serif for metadata.
- Full-bleed architectural images carry the visual character.
- No TANOUE LAB marks, labels, or institutional graphic elements.
- Cards remain rectangular with minimal or no corner radius.
- No decorative gradient fields, floating cards, or ornamental graphics.
- Large typography is reserved for full-screen project moments.
- Process and technical information uses compact, scan-friendly typography.

## Responsive Behavior

### Desktop

- Full-screen Selected Works.
- Hover preview and image transitions.
- Wide Atlas compositions.
- Horizontal process rail.
- Detail metadata in multiple columns.

### Tablet

- Full-screen vertical browsing remains primary.
- Tap replaces hover.
- Atlas becomes two columns when space permits.
- Process rail is swipeable.
- Controls maintain touch targets of at least 44 px.

### Mobile

- One-column Atlas.
- Titles wrap without viewport-based font scaling.
- Metadata collapses to two columns or one column.
- Project detail remains vertically readable.
- Image viewer prioritizes fit-to-screen and swipe navigation.

## Performance

- Keep source images outside the HTML and serve optimized WebP derivatives.
- Use responsive `srcset` for large covers.
- Lazy-load non-critical Atlas and project-detail media.
- Preload only the active Selected Works cover and the next likely cover.
- Avoid initializing all deep galleries before a project is opened.
- Preserve original source files outside the deployment folder.

## Error Handling

- Missing project covers fall back to a neutral labeled frame, never a broken
  image icon.
- Missing gallery files are skipped and reported during the build validation.
- Viewer navigation disables at sequence boundaries.
- Unknown project IDs return to the Works Atlas.
- JavaScript-disabled fallback keeps project cards and essential text readable.

## Verification

Before replacing the current local version:

1. Compare the project inventory before and after migration.
2. Confirm all ten featured projects open correctly.
3. Confirm every Atlas project remains reachable.
4. Validate image, thumbnail, and PDF-page paths.
5. Test viewer zoom, scrolling, previous/next, keyboard, and touch behavior.
6. Check no project cover is destructively cropped.
7. Test desktop, iPad landscape, iPad portrait, and mobile viewports.
8. Check text overlap and navigation contrast on every featured cover.
9. Measure initial media weight and verify lazy loading.
10. Confirm the current Netlify deployment remains unchanged until explicit
    approval to publish.

## Delivery Strategy

Implementation will happen in an independent local branch/version of
`portfolio-netlify`.

1. Inventory and normalize the existing project data.
2. Build the new modular Works shell.
3. Migrate all project details without deleting the existing implementation.
4. Verify locally against the current live portfolio.
5. Present the local version for review.
6. Replace the main local version only after approval.
7. Push to GitHub and allow Netlify to deploy only after a final publishing
   confirmation.

## Non-Goals

- Rebranding the personal portfolio as TANOUE LAB
- Reducing the project archive to only eight laboratory projects
- Rewriting the approved Profile pages
- Deleting existing media during migration
- Publishing to Netlify during the first implementation pass
