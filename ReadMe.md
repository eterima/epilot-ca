# BTC Prediction game

My take on this was as I was asked to build PoC of the game. I know it is not the best solution, nor near close to it. However, in the following chapters, I will discuss the potential improvments I would consider ( of course I will tell more in our call ). I spent one full day on this. I also had a small boiler-plate Nest-js starter that I built that has authentication.

**Client and API have their own Readme files**. Purpose of this file is to talk about the project in general. For more details on how to run the project, visit the respective Readme files.

## Current state

### Client

Client side application is not in the best state. It is React application that is fairly simple. I really did not have enough time to use best practices, write the cleanest and testable code. It is there just to demonstrate how the application is working.

### API

Compared to the Client, API side is in a better state. I created a list of all things I did with the reasons why I did them.

1. Instead of DynamoDB, I used MongoDB because it was easier to setup. I would lose so much time setting up localstack in order to test things with DynamoDB or to setup AWS account
2. However, I isolated the DB logic from application logic. This way, I can painlessly swap the databases without touching the business logic too much. Please note I `did not introduce` any complex architecture, such as Hexagonal or Clean. I wrote an article on organising the the topic: [Use Interfaces and Data Mappers to improve your backend applications](https://medium.com/@ammce/use-interfaces-and-data-mappers-to-improve-your-backend-applications-5d6bd69ae061). This was my inspiration for this project. I applied the same pattern that I will describe in chapter 3.
3. BTC API Provider - as I was not sure which one to choose from, I used the first one I found. However, I isolated the BTC logic away from main application logic, so I can easily swap the API provider.
4. Application is organised in modules that can be turned on into separate microservices
5. Most crucial business logic is unit tested - see `player-guess.service.spec.ts`.

## Application improvments

1. If we scale quickly, I would introduce `caching mechanisms` towards external API providers in order to save us money. It is enough to get the BTC price each 5 seconds, not on every request.
2. Current solution is super **hackable** as it has a lot of logic on the Client side. But this approach was the fastest one to showcase application. I would have completely **different** approach if I had to build it for production. It would rely much more on backend making all decisions.
3. Client (React) part refactored to be more roboust and scalable. Current implementation is not ideal, and is only used to make this PoC.
4. Make methods smaller, add more utils, isolate more code.
5. Better logging and tracking
6. Format errors better
7. Client side is lacking error handling, logging, etc.
8. Dockersise the project

### Future directions

1. Option to play multiplayer with friends.
2. Real-time results
3. Leaderboards
4. Previous guesses
