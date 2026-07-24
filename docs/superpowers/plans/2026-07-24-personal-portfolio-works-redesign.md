# Personal Portfolio Works Redesign Implementation Plan

**Goal:** Merge the approved TANOUE LAB-inspired project browsing language into the personal portfolio while retaining the existing four-page Profile and every detailed project process data set.

**Architecture:** Keep the current single-page data source and project-specific renderers. Replace the Works shell with a two-part cinematic film and complete atlas, then reshape the existing project dialog into a full reading surface with a cover hero, overview, process chapters, evidence galleries, and project pagination. Reuse the current study modal and lightbox instead of duplicating viewers.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node built-in tests, Playwright visual QA.

---

### Task 1: Lock the content and navigation contract

- Add Node tests for featured project order, complete atlas coverage, preserved Profile markup, preserved project data scripts, and required detail/viewer hooks.
- Extend `project-theatre.js` with deterministic featured/atlas helpers.
- Run the tests and confirm the new contract passes.

### Task 2: Build the new Works entry

- Replace the old toolbar-only Works shell with a fixed cinematic header, Selected Works film, and Complete Project Atlas.
- Preserve the three portfolio filters and make Atlas filtering independent from featured ordering.
- Add responsive, reduced-motion, keyboard, and image-error states.

### Task 3: Upgrade project details

- Add a full-screen project hero and structured overview before the existing deep project content.
- Keep every project-specific renderer, dated study window, PDF page set, technical drawing group, fieldwork record, and final output.
- Add stable previous/next navigation and return-to-atlas behavior.

### Task 4: Verify the complete local site

- Run structural and helper tests.
- Serve the isolated worktree locally.
- Inspect Profile, Works film, Atlas, representative deep project pages, study windows, and lightbox at desktop, iPad, and mobile sizes.
- Check image loading, layout overflow, keyboard controls, and console errors.
- Commit the verified local redesign without pushing or deploying.
