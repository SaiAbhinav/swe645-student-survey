pipeline {
    agent any
    environment {
        registry = "saiabhinavvasepalli/student-survey-amd64"
        registryCredential = 'dockerhub'
    }
    stages {
        stage('Preparation') {
            steps {
                script {
                    env.dateTag = new Date().format("yyyyMMdd-HHmmss")
                }
            }
        }
        stage('Build image') {
            steps {
                echo 'Starting to build docker image'
                script {
                    docker.withRegistry('', registryCredential) {
                        def image = docker.build("${registry}:${env.dateTag}", ". --no-cache --platform=linux/amd64")
                    }
                }
            }
        }
        stage('Push image') {
            steps {
                echo 'Pushing to docker hub'
                script {
                    docker.withRegistry('', registryCredential) {
                        def image = docker.image("${registry}:${env.dateTag}")
                        image.push()
                    }
                }
            }
        }
        stage('Deploying') {
            steps {
                echo 'Deploying to a node in Rancher and Load Balancer'
                script {
                    sh "kubectl set image deployment/deploy container-0=${registry}:${env.dateTag}"
                    sh "kubectl set image deployment/deploylb container-0=${registry}:${env.dateTag}"
                }
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}
