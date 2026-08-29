<p align="center">
  <a href="https://tutors.dev">
    <img src="./tutors-light.png"
  </a>
</p>

<h3 align="center">
Tutors: An Open Learning Web Toolkit
</h3>

<p align="center">
  <a href="https://tutors.dev">Website</a> |
  <a href="https://tutors.dev/course/tutors-reference-manual">Documentation</a>
</p>

# What is Tutors?

Tutors is a collection of open source components and services supporting the creation of transformative learning experiences using open web standards. It consists of two key components:

- _Generator:_ transforms a [folder of learning content](https://github.com/tutors-sdk/tutors-reference-course) into a Tutors course

- _Reader:_ presents a Tutors course as an intuitive, discoverable and attractive [Web experience](https://tutors.dev/course/reference-course)

Tutors is developed in the open by an active and friendly community, based on a [simple set of values](https://tutors.dev/course/tutors-reference-manual#tutors-values).

This repo is the Tutors Reference Course - and can be viewed [here](https://tutors.dev/course/reference-course).


# Tutors Mono Repo

All Tutors platform code lives in a single mono repo: [tutors-mono-repo](https://github.com/tutors-sdk/tutors-mono-repo). This consolidates the reader application, generators, support tools, and shared libraries into one cohesive codebase.

### Structure

The mono repo is organised into the following key areas:

- **Reader (`apps/tutors`):** The course reader application. Built with SvelteKit and TypeScript, it renders Tutors courses as an interactive web experience using Tailwind and Skeleton for the UI layer.

- **Generator (`apps/tutors-publish`):** Transforms a folder of authored learning content (Markdown, images, archives) into the JSON structures consumed by the reader. This is the CLI tool invoked when publishing a course.

- **Shared Libraries (`packages/`):** Common modules used across the reader and generator, including course data models, parsing utilities, and UI components. Extracting these into shared packages ensures consistency between how courses are generated and how they are rendered.

- **Tests & Tooling:** Automated tests, linting configuration, and development utilities that support contribution across the mono repo.

### Other Repos

- [Tutors Reference Manual](https://github.com/tutors-sdk/tutors-reference-manual): The manual is itself a tutors course, and is largely written in Markdown.
- [Tutors Reference Course](https://github.com/tutors-sdk/tutors-reference-course): A Tutors course to include all tutors learning objects and structures.

### License

[![license](https://img.shields.io/badge/license-MIT-3A929B.svg)