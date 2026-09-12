pipeline { 
  agent any 
 
  environment { 
    IMAGE = "pw-e2e:latest" 
  } 
 
  stages { 
    stage('Checkout') { 
      steps { 
        checkout scm 
      } 
    } 
 
    stage('Build Docker image') { 
      steps { 
        sh 'docker build -t $IMAGE .' 
      } 
    } 
 
    stage('Run tests (Docker)') { 
      steps { 
            sh ''' 
            rm -rf artifacts || true 
            mkdir -p artifacts 
            docker run --rm -v "$PWD/artifacts:/app/artifacts" $IMAGE 
        ''' 
        } 
        } 
    } 

    post { 
        always { 
        archiveArtifacts artifacts: 'artifacts/**', fingerprint: true, 
        allowEmptyArchive: true 
        } 
    } 
} 