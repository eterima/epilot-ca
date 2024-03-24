# BTC Prediction game - Client

Welcome to the Client Readme file of BTC Prediction game. In the following chapters, we will describe how to run and test this application. In addition, the instructions of how this application should be deployed are provided.

## Running the Client

1.  ### `npm install`

    Install the required packages

2.  ### `npm start`
        Runs the app in the development mode.\
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser. > Please note that this is a simple React application, hence you do not have any prerequesits in order to run it.

## Deployment

Below is the list of the steps we would need to consider when deploying the APP. I chose Vercel as it is flexible and easy to use.

1. Create a Github action that on each merge to main will trigger tests and run the deployment to Vercel if tests pass

It's of course worth mentioning that there will be pre-requesits such as setting up ENV variables, configuring React application for deployment, etc.
