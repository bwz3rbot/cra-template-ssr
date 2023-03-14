set /p token= < token
set S3_BUCKET=4stud.io-resources
set APPLICATION_VERSION=%random%
set DOCKER_REGISTRY=416614249208.dkr.ecr.us-west-2.amazonaws.com
set DOCKER_APP_NAME=fanheat-dev-ssr
set APPLICATION_NAME=Fanheat-ssr
set ENVIRONMENT_NAME=Fanheat-ssr-env
call aws s3 cp Dockerrun.aws.json s3://%S3_BUCKET%/Dockerrun.aws.json

call aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin %DOCKER_REGISTRY%
call docker build -t %DOCKER_REGISTRY%/%DOCKER_APP_NAME%:%APPLICATION_VERSION% -t %DOCKER_REGISTRY%/%DOCKER_APP_NAME%:latest .
call docker push %DOCKER_REGISTRY%/%DOCKER_APP_NAME%:%APPLICATION_VERSION%
call docker push %DOCKER_REGISTRY%/%DOCKER_APP_NAME%:latest


call aws elasticbeanstalk create-application-version --application-name %APPLICATION_NAME% --version-label %APPLICATION_VERSION% --source-bundle S3Bucket=%S3_BUCKET%,S3Key=Dockerrun.aws.json
call aws elasticbeanstalk update-environment --application-name %APPLICATION_NAME% --environment-name %ENVIRONMENT_NAME% --version-label=%APPLICATION_VERSION%