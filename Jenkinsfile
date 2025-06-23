pipeline {
    agent { label 'server1' }

    stages {
        stage('Pull SCM') {
            steps {
                git branch: 'main', url: 'https://github.com/samuelmahesasinulingga/simple-apps2.git'
            }
        }
        
        stage('Build') {
            steps {
                sh'''
                cd app
                npm install
                '''
            }
        }
        
        stage('Testing') {
            steps {
                sh'''
                cd app
                APP_PORT=3001 npm test
                APP_PORT=3001 npm run test:coverage
                '''
            }
        }
        
        stage('Code Review') {
            steps {
                sh'''
                cd app
                sonar-scanner \
                    -Dsonar.projectKey=simple-apps2 \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://192.168.197.130:9000 \
                    -Dsonar.login=sqp_709d62d86eef3b46ccf3a306ee1ac980085312e0
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                sh'''
                docker compose up --build -d
                '''
            }
        }
        
        stage('Backup') {
            steps {
                sh 'docker compose push' 
            }
        }
    }
}