# Poker Utilities WebApp

[Poker Utilities WebApp](https://jlipton-poker-utils.vercel.app/) is intended to be a collection of different utilities and trainers to help poker players, primarily with the *Cadillac of Poker*, NL Hold'em! It is a hobby project, and my primary focus is on creating a useful and free preflop trainer to make studying charts less boring.

## Features

### Preflop Trainer
*🚧 Under Construction 🚧*

### Home Game Calculator
This calculator is meant to help distribute the risk of paying out friendly poker home games. 

In a typical poker game, players buy chips up front in cash from a designated *banker*, and when the game ends or people want to cash-out, players exchange their remaining chips with this person for cash. In this scenario, the designated banker has to take on the risk of guaranteeing the cash amount of all chips in play, and in the case of an error in counting chips, they would be liable to pay out more or less than the actual chips in play.

Aside from the financial risk the banker may incur for no additional reward, this method also requires players to use cash. Players could decide to use a transfer service such as Venmo or cash-app instead of cash in this case, but there often comes an issue when the banker is paying players out and has to make multiple pay transactions. This often results in the banker having their account locked before being able to pay out all players.

**How do we solve the issue of payment methods locking?**

This calculator implements a *Decentralized Banking* approach, which takes advantage of the fact that poker is a zero-sum game when no rake is being taken. The assumption being used is that given a group of players whose aggregate buy-in and cash-out amounts are equal, there exists a solution where *n*-1 transfers must be made between players in order to make all players whole, where *n* is the number of players. It also uses the heuristic that one player making 2 send transactions is less optimal than 2 players making 1 send transaction, due to the aforementioned risk of payment methods locking after a certain amount of transactions.

**How do we solve the issue of risk guaranteeing the cash-value of chips?**

Just as we spread the risk of multiple transfers locking payment methods, we spread the risk of chips missing, or too many chips being guaranteed.

The calculator will not allow you to calculate the transactions until the aggregate buy-ins match the amount of aggregate cash-outs. If there are chips missing, or too many chips being cashed out, there is a `Fix Transactions` tool which will distribute this difference across all players.

Example:
| Player | Buy-In | Cash-Out | Balance |
|---|---|---|---|
| P1 | $100 | $150 | $50 |
| P2 | $100 | $50 | -$50 |
| P3 | $100 | $112 | $12 |

*In the case above, the players only bought $300 in chips, but collectively they ended up with $312 in chips. Instead of one player losing $12, all players would have $4 removed from their cash-outs, effectively deflating their wins, but reflecting the true cash-value of the chips that ended up in play.*

## Development

### Core Frameworks and Libraries Used
- [React](https://react.dev/) with [Next.js](https://nextjs.org/)
- [Jest](https://jestjs.io/)
- [Pico.css](https://picocss.com/)


### Getting Started
```bash
npm run dev # Runs app on http://localhost:3000
npm run test # Runs Jest test suite
npm run build # Runs production build
```