import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const theatreSource = fs.readFileSync(
  path.join(root, "assets", "portfolio-apple", "project-theatre.js"),
  "utf8",
);
const worksCinemaCss = fs.readFileSync(
  path.join(root, "assets", "portfolio-apple", "works-cinema.css"),
  "utf8",
);

function loadTheatreApi() {
  const context = {
    module: { exports: {} },
    exports: {},
    globalThis: {},
  };
  vm.runInNewContext(theatreSource, context);
  return context.module.exports;
}

test("keeps the four-page profile before the redesigned works entry", () => {
  for (const page of ["profileCover", "profileIntro", "profileSoftware", "profileExperience"]) {
    assert.match(html, new RegExp(`id="${page}"`));
  }
  assert.ok(html.indexOf('id="profileView"') < html.indexOf('id="worksView"'));
});

test("keeps all structured project data sources", () => {
  const requiredSources = [
    "nishinakasu_extra_data.js",
    "yanagawa_extra_data.js",
    "miyako_extra_data.js",
    "taipei_extra_data.js",
    "uki_extra_data.js",
    "muromi_extra_data.js",
    "kumamoto_apartment_extra_data.js",
    "xiamen_tongwending_data.js",
    "china_competition_data.js",
    "student_projects_data.js",
    "china_professional_competitions_data.js",
    "master_portfolio_2022_data.js",
  ];
  requiredSources.forEach((source) => assert.match(html, new RegExp(source)));
});

test("exposes deterministic featured and atlas project helpers", () => {
  const api = loadTheatreApi();
  assert.equal(typeof api.organizeProjects, "function");

  const projects = [
    { id: "uki", portfolioCategory: "japan" },
    { id: "yanagawa", portfolioCategory: "japan" },
    { id: "xiamen", portfolioCategory: "china" },
    { id: "nishinakasu", portfolioCategory: "japan" },
  ];
  const organized = api.organizeProjects(
    projects,
    ["yanagawa", "nishinakasu", "xiamen"],
    "japan",
  );

  assert.deepEqual(
    Array.from(organized.featured, (project) => project.id),
    ["yanagawa", "nishinakasu"],
  );
  assert.deepEqual(
    Array.from(organized.atlas, (project) => project.id),
    ["uki", "yanagawa", "nishinakasu"],
  );
});

test("includes the approved featured project order", () => {
  const expected = [
    "yanagawa",
    "nishinakasu",
    "miyako",
    "muromi",
    "taipei",
    "kumamoto-apartment",
    "uki",
    "mifune",
    "not-a-hotel",
    "xiamen",
  ];
  const match = html.match(/const featuredProjectOrder = \[([\s\S]*?)\];/);
  assert.ok(match, "featuredProjectOrder is missing");
  const actual = Array.from(match[1].matchAll(/"([^"]+)"/g), (entry) => entry[1]);
  assert.deepEqual(actual, expected);
});

test("contains the cinematic works, atlas, and project hero surfaces", () => {
  for (const id of ["selectedWorks", "worksAtlas", "detailHero"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(html, /works-cinema\.css/);
});

test("keeps the deep viewers and sequential image controls", () => {
  for (const id of [
    "studyModal",
    "lightbox",
    "lightboxPrevious",
    "lightboxNext",
    "lightboxZoomIn",
    "lightboxZoomOut",
    "lightboxFit",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test("keeps the mobile works atlas title below the fixed navigation", () => {
  assert.match(
    worksCinemaCss,
    /@media \(max-width: 720px\)[\s\S]*?\.works-atlas\s*\{[\s\S]*?padding-top:\s*168px/,
  );
});
