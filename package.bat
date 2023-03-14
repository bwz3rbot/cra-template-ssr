@REM Build the project
call npm run build
@REM Create an archive of the template folder
call git archive --format=zip --output=deploy.zip HEAD
@REM use 7z to add folder ./build to the existing zip file
call 7z a -tzip deploy.zip ./build

