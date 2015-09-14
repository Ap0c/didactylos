# MSc Project

A collection of teaching tools designed to allow educators to produce web-oriented educational content. Current development focuses on Physics content specifically. Built using the following tools:

- Markdown (http://daringfireball.net/projects/markdown/)
- nw.js, previously node-webkit (http://nwjs.io)
- Marked (https://github.com/chjj/marked)
- KaTeX (https://github.com/Khan/KaTeX)

Please note that the software included here does not contain the nw.js runtime needed to launch the application, nor the Marked library used for rendering Markdown. It does however contain some source code from the KaTeX project. This is because the build used was created specifically for this project and spread among multiple different components, rather than installed through npm. Any directory named `katex` contains files built from the KaTeX project.

# Components

This software is comprised of three main components:

## Markdown Editor

An editor for building the content, based around the Markdown language. Incorporates live HTML previews, file handling and equation rendering.

## Animator

A tool for creating diagrams using the HTML5 canvas element. These can be embedded in the content created in the editor.

## Static Site Generator

Allows the content to be exported as a static site, to then be hosted in a location chosen by the user.

# Overview of File Structure

The `package.json` file found in the root directory provides information about the project and sets certain runtime parameters.

The `assets` directory holds a set of SVGs used in the animator component.

The `html` directory holds HTML files that correspond to the three app windows:

- The startup screen
- The editor
- The animator

The `js` directory contains the Javascript code for the project, and the bulk of the overall source code. It is divided up as follows:

- startup.js - The Javascript file corresponding the startup screen.
- animator - Contains the code for the animator component.
- editor - Contains the code for the editor component.
- katex - Contains code from the KaTeX project used in the editor.
- site - Contains code used for the static site export. This is not all Javascript, as it contains a CSS file used to define default styles for exported sites. It also contains a copy of KaTeX that is copied across to the static site.

The `styles` directory contains stylesheets used to style the various application windows.
