pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
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