@REM create zip file of the ./template folder

call git archive --format=zip --output=template.zip HEAD
@REM add the build folder to the zip file

