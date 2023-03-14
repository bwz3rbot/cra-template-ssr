<!--
docker:
https://medium.com/devops-with-valentine/how-to-deploy-a-docker-container-to-aws-elastic-beanstalk-using-aws-cli-87ccef0d5189

.ebextensions
https://johanrin.medium.com/i-deployed-a-server-side-react-app-with-aws-elastic-beanstalk-heres-what-i-learned-34c8399079c5
-->
required to run:

Step 1:

-   Add image assets:

1. Round Logo: 56px x 56px - ./src/assets/logo/round-56x56.png
2. Wide Logo: 56px x 112px - ./src/assets/logo/wide-56x112.png
3. dark.webp - widescreen size ./src/assets/hero/dark.webp
4. light.webp - widescreen size ./src/assets/hero/light.webp;
5. favicon.ico: 32x32 ./public/favicon.ico [https://cloudconvert.com/png-to-ico](converter tool)
6. logo192.png 192x192 ./public/logo192.png
7. logo512.png 512x512 ./public/logo512.png

Step 2:

-   Create a Firebase application and paste credentials in .env file

Step 3:

-   Give the site a name in REACT_APP_SITE_NAME

Step 4:

-   Enable GraphQL

1. Spin up the GraphQL Server

2. paste the endpoint url in REACT_APP_GQL_ENDPOINT
