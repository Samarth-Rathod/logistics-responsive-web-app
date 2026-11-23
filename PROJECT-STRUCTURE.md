# Project file structure

The initial source inventory contained 53 files. With this structure guide, the test-results record and the embedded project report, the delivered project package contains 56 files. The files are grouped by purpose rather than placing all code in one large file.

```text
logistics-responsive-web-app/
├── package.json                 Dependency list and run/test/build commands
├── index.html                   Vite HTML entry point
├── vite.config.js               React, API URL and PWA build configuration
├── db.json                      JSON Server seed database
├── jest.config.cjs               Jest configuration
├── babel.config.cjs              JSX transformation for tests
├── .env.example                  Optional API URL configuration
├── netlify.toml                  Netlify build and SPA rewrite
├── vercel.json                   Vercel SPA rewrite
├── public/
│   ├── manifest.webmanifest      Installable PWA metadata
│   ├── offline.html              Friendly offline information page
│   └── icons/                    192px and 512px app icons
├── src/
│   ├── main.jsx                  React entry point and global styles
│   ├── App.jsx                   Lazy-loaded client routes
│   ├── context/AppContext.jsx    Shared shipment, profile and toast state
│   ├── data/demoData.js          Fallback sample records
│   ├── services/api.js           JSON Server and local-storage data layer
│   ├── components/               Shared visual and navigation components
│   ├── pages/                    Six main application screens
│   ├── styles/                   Design tokens, layout and page styles
│   ├── test/setup.js              Jest DOM setup
│   └── utils/                    Formatters and validation helpers
└── docs/
    ├── WIREFRAMES.md             Six low-fidelity screen wireframes
    ├── EVALUATOR-CHECKLIST.md    Mapping to the Yuva brief
    ├── TEST-PLAN.md              Automated and manual acceptance tests
    ├── TEST-RESULTS.md           Checks actually executed in this environment
    ├── screenshots/README.md     Genuine screenshot capture checklist
    └── PROJECT-STRUCTURE.md      This file
```

There are 6 page components, 12 shared UI components (including the status badge test alongside the components folder), one shared data context, one API service and two utility modules. The package excludes `node_modules/` and build output because those folders are generated locally by npm and Vite.
