pipeline {
    agent any

    tools {
        nodejs 'node24'   // must match the name in Manage Jenkins → Tools → NodeJS installations
    }

    parameters {
        choice(name: 'BROWSER', choices: ['electron', 'chrome', 'edge'],
               description: 'Browser to run Cypress tests in')
        string(name: 'SPEC', defaultValue: 'cypress/e2e/**/*.cy.ts',
               description: 'Spec pattern to run (default: all specs)')
    }

    environment {
        // Keep the Cypress binary out of the SYSTEM account's profile in System32
        CYPRESS_CACHE_FOLDER = 'C:\\jenkins\\cypress-cache'
        NO_COLOR = '1'
        CI = 'true'
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '15'))
        disableConcurrentBuilds()
    }

    triggers {
        // localhost Jenkins can't receive GitHub webhooks, so check for new commits every ~5 minutes
        pollSCM('H/5 * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Info') {
            steps {
                bat 'node -v'
                bat 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx cypress verify'
            }
        }

        stage('Clean Old Results') {
            steps {
                bat 'npm run cy:clean'
            }
        }

        stage('Run Cypress Tests') {
           steps {
              withCredentials([string(credentialsId: 'cypress-user-password', variable: 'CYPRESS_USER_PASSWORD')]) {
                 bat "npx cypress run --browser ${params.BROWSER} --spec \"${params.SPEC}\""
                 }
            }
        }
    }

    post {
        always {
            // Test results → Jenkins test trend graph
            junit allowEmptyResults: true, testResults: 'cypress/results/*.xml'

            // Mochawesome HTML report → link in the job sidebar
            publishHTML(target: [
                reportDir: 'cypress/reports/html',
                reportFiles: 'index.html',
                reportName: 'Cypress HTML Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])

            // Failure screenshots (and videos, if enabled) → downloadable artifacts
            archiveArtifacts artifacts: 'cypress/screenshots/**/*, cypress/videos/**/*',
                             allowEmptyArchive: true
        }
        success {
            echo 'All Cypress tests passed.'
        }
        failure {
            echo 'Cypress tests failed. Check the HTML report and screenshots.'
        }
    }
}