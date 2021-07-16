# Changelog for Genetic Startups Web

This file keeps a log of version releases. It is maintained 
[following best practices about changelogs](https://keepachangelog.com/en/1.0.0/).

## Versioning guideline

* Each significant change should be described in the "Unreleased" section
* Entry versions should follow the following:
  * Syntax:
    * [X.Y.Z] - YYYY-MM-DD (Short description)
  * Convention:
    * For X.Y.Z, increment the digit following this scheme:
      * X = breaking change (previous version is now deprecated),
      * Y = additive change (previous version is still valid),
      * Z = just a simple patch (for a typo or error).
* When the new version is released, a new [Unreleased] section is created in the "Release Change History" below, as a 
placeholder for the next version.

## Release Change History

### [Unreleased] [X.Y.Z] - YYYY-MM-DD (Placeholder for next version)

#### Added

* .

#### Changed

* .

#### Removed

* .

### [1.0.0] - 2021-07-15 (First version)

#### Added

* Front-end (React):
  * Map generate on load
  * Action buttons for "running algorithm" and "generating new map"
  * Output section below the map to provide information on the map, its encoding; and the different candidate paths 
  defined by the algorithm in each iteration; as well as the description of the story
  * Information section in a separate path, describing the algorithm, the map, usage, architecture and contributing
  guidelines
* API (REST):
  * Including 2 endpoints: content and probabilities
* Backend (Rails):
  * Controllers for serving pages and for the API endpoints

#### Changed

* .

#### Removed

* .
