## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run preview`

Locally preview the production build.

## Environment Setup

1. Copy the `.example.env` file to create a new `.env` file:
```bash
cp .example.env .env
```

2. Update the `.env` file with your actual Firebase configuration values:
```env
apiKey: "your-api-key",
authDomain: "your-auth-domain",
projectId: "your-project-id",
storageBucket: "your-storage-bucket",
messagingSenderId: "your-messaging-sender-id",
appId: "your-app-id"
```

Make sure to never commit your actual `.env` file to version control.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn React, check out the [React documentation](https://reactjs.org/).


## Commit checks (security & performance)

This project ships with the org shared CI checks
([chopdawginc/ci-security-perf](https://github.com/chopdawginc/ci-security-perf)) in
`.github/workflows/ci.yml`, plus a husky pre-commit hook that scans staged changes for secrets and
lints staged files. Install [gitleaks](https://github.com/gitleaks/gitleaks) for the local secret
scan: `brew install gitleaks`.

On every PR: secret scanning (gitleaks), Firebase rules lint + emulator tests
(`firestore.rules`/`storage.rules` in `rules-tests/`), static analysis for unauthenticated
endpoints and client-side writes to authorization fields, dependency audit, and size/performance
budgets.

Policy: **red checks do not merge.** Intentional exceptions are waived inline (Semgrep: `// nosemgrep: <rule-id> -- checks-waiver(<id>): <reason>`; gitleaks: `gitleaks:allow`) and approved by code owners in review.
