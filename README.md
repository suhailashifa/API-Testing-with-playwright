# API Testing with Playwright 🚀

This project demonstrates comprehensive **API testing** using **Playwright**, featuring:

- **API Chaining**: Ensuring sequential API requests and response validation.
- **Performance Testing**: Utilizing **Artillery** for load and performance testing.
- **CI/CD Integration**: Automated testing with **GitHub Actions** and **Jenkins**.

## 🔧 Prerequisites

- **Node.js** (v14 or later)
- **npm**
- **Git**
- **Jenkins** (if using Jenkins for CI/CD)

## 📂 Project Structure

```plaintext
.
├── jenkins
│   └── jenkins.sh               # Jenkins shell script
├── tests
│   ├── api-tests.spec.js        # API test cases
│   └── performance-test.yml     # Artillery performance tests
├── Jenkinsfile                  # Jenkins pipeline configuration
├── package.json                 # Project dependencies
└── playwright.config.js         # Playwright configuration
```

## 🔄 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/suhailashifa/API-Testing-with-playwright.git
   cd API-Testing-with-playwright
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run tests:**

   - **API Tests:**
     ```bash
     npx playwright test
     ```
   - **Performance Tests:**
     ```bash
     npx artillery run tests/performance-test.yml
     ```

## 📊 API Chaining

API chaining ensures that responses from one request are used as inputs for subsequent requests. Example in `api-tests.spec.js`:

```javascript
import { test, expect } from '@playwright/test';

let token;

test('User Authentication and Data Retrieval', async ({ request }) => {
  // Step 1: Authenticate user
  const authResponse = await request.post('/auth/login', {
    data: { username: 'testuser', password: 'password123' },
  });
  expect(authResponse.ok()).toBeTruthy();
  token = (await authResponse.json()).token;

  // Step 2: Fetch user data with token
  const userDataResponse = await request.get('/user/data', {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(userDataResponse.ok()).toBeTruthy();
});
```

## 💡 Performance Testing

We use **Artillery** for load testing to evaluate API performance under stress.

**Sample Artillery Test (`performance-test.yml`):**

```yaml
config:
  target: 'https://your-api-url.com'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - flow:
      - post:
          url: '/auth/login'
          json:
            username: 'testuser'
            password: 'password123'
      - get:
          url: '/user/data'
          headers:
            Authorization: 'Bearer {{ token }}'
```

Run performance tests:

```bash
npx artillery run tests/performance-test.yml
```

## 🚀 CI/CD Integration

### GitHub Actions

Automate testing with GitHub Actions by creating a `.github/workflows/ci.yml` file:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'
    - run: npm install
    - run: npx playwright install
    - run: npx playwright test
    - run: npx artillery run tests/performance-test.yml
```

### Jenkins Integration

**Jenkinsfile:**

```groovy
pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/suhailashifa/API-Testing-with-playwright'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run API Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Run Performance Tests') {
            steps {
                sh 'npx artillery run tests/performance-test.yml'
            }
        }
    }
}
```

## 🚀 How Jenkins Helps

- **Automation**: Jenkins automatically fetches your code, installs dependencies, and runs tests whenever you push to the repository.
- **Continuous Feedback**: Provides immediate feedback on build/test results.
- **Scalability**: Can be extended with plugins and integrated into complex workflows.

## 📅 Updating Code

Whenever you make code changes, follow these steps to push updates to your repository:

1. **Stage Changes:**
   ```bash
   git add .
   ```
2. **Commit Changes:**
   ```bash
   git commit -m "Describe your changes"
   ```
3. **Push to Repository:**
   ```bash
   git push origin main
   ```

## 🌟 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.


Happy Testing! 🚀📊

