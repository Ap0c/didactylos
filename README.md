# Didactylos

The purpose of this project is to create a set of tools that will allow educators, who do not have necessarily have any prior technical knowledge, to build teaching content that makes good use of the capabilities of the web and its corresponding technologies. These tools take the form of an application with functionality similar to that of a simple word processor (with support for drawing diagrams), which can be used to build a collection of educational content. This content may then be rendered to a bundle of HTML, CSS and Javascript files, ready for deployment to the web. The result will hopefully provide students an experience to match that which technology already provides them in other aspects of their lives. Current development focuses on building tools for creating Physics content specifically.

The result of this project is a GUI-based application built upon the nw.js app runtime, which is itself built upon Chromium and node.js. This repo is intended for development, and is not designed as a means to deploy the application. As a result it contains the application code only, and does not bundle nw.js.

## Components

This software is comprised of three main components:

- **Markdown Editor** - An editor for building the content, based around the Markdown language. Incorporates live HTML previews, file handling and equation rendering.
- **Animator** A tool for creating diagrams using the HTML5 canvas element. These can be embedded in the content created in the editor.
- **Static Site Generator** - Allows the content to be exported as a static site, to then be hosted in a location chosen by the user.

## Development and/or Running the Application

Up to this point development has focused on OS X, which means that, although nw.js is also available for Windows and Linux, there is no guarantee that this application will run on either of those platforms.

To install, clone the repo (or download a copy from the release page):

```
git clone https://github.com/Ap0c/didactylos
```

then `cd` into the `didactylos` directory and install the necessary libraries using:

```
npm install
```

You will also need a copy of the stable build of nw.js (v0.12.3 NORMAL at the time of writing), which is available from the [project website](http://nwjs.io). You now have everything you need to run the application, but the procedure for doing so differs from platform to platform.

### OS X

Once nw.js has been downloaded and extracted, copy the `nwjs.app` package into the `didactylos` directory. Now simply double-click on `nwjs.app` to launch the application (`open nwjs.app` on the command line also works). Alternatively, leave `nwjs.app` where it is and run:

```
nwjs.app/Contents/MacOS/nwjs /path/to/didactylos
```

### Linux

Downloading nw.js for Linux will provide you with a binary executable called `nw`. To run the application simply do:

```
/path/to/nw /path/to/didactylos
```

### Windows

The Windows download contains a binary file, called `nw.exe`. To run the application, simply drag the `package.json` file from didactylos onto this executable. Alternatively, to use the command line, follow the instructions for Linux given above, but replace `nw` with `nw.exe`.

## Overview of File Structure

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

# Tools

The following tools were used in the development of this software:

- Markdown (http://daringfireball.net/projects/markdown/)
- nw.js, previously Node-Webkit (http://nwjs.io)
- Marked (https://github.com/chjj/marked)
- KaTeX (https://github.com/Khan/KaTeX)

Please note that the software included here does not contain the nw.js runtime needed to launch the application, nor the Marked library used for rendering Markdown. It does however contain some source code from the KaTeX project. This is because the build used was created specifically for this project and spread among multiple different components, rather than installed through npm. Any directory named `katex` contains files built from the KaTeX project. Please see `LICENSE` for the KaTeX license.
