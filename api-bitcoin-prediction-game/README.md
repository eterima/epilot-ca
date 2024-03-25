# BTC Prediction game - API

Welcome to the API Readme file of BTC Prediction game. In the following chapters, we will describe how to run and test this application. In addition, the instructions of how this application should be deployed are provided.

## Prepare the environment

1. Create `.env` file and copy the content from `env.example` file.
2. In the email, you will receive a credentials that you can use

## API commands

1. ### `npm install`

   Install the required packages

2. ### `npm run start:dev`
   Runs the app in the development mode on port 3500.
3. ### `npm run test`
   Runs the unit tests. Add `--watch` flag if you want to get more control.

## Deployment

Below is the list of the steps we would need to consider when deploying the API:

1.  Dockerize the Node.js application.
2.  Create GitHub Actions workflow to run tests on push events.
3.  Configure AWS services such as ECS, ECR, or Fargate for container deployment.
4.  Set up GitHub Actions workflow for CI/CD.
5.  Define workflow stages (e.g., build, test, deploy).
6.  Configure workflow to build Docker image, run tests, and push image to AWS ECR.
7.  Define deployment action in the workflow to deploy the Docker image to AWS ECS or Fargate.
8.  Trigger the workflow on new commits or merges to the specified branches.
