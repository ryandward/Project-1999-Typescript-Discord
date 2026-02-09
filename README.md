# EverQuest Discord Bot - TypeScript Edition

**[Documentation](https://ryandward.github.io/Project-1999-Typescript-Discord/)**

Welcome to the EverQuest Discord Bot TypeScript Edition repository! This project, originally developed in Python and meticulously reworked in TypeScript, demonstrates advanced capabilities in creating robust, type-safe, and scalable chat-interfacing bots. Leveraging TypeScript’s strict type-checking and ESNext features, along with powerful integrations like Elasticsearch, this bot enhances management and engagement within EverQuest gaming communities on Discord.

## Introduction

The EverQuest Discord Bot TypeScript Edition is designed to optimize community management through Discord, integrating seamlessly with game data and external APIs. It excels in smart storage solutions and real-time data retrieval, including integration with Elasticsearch for efficient full-text search capabilities across distributed systems.

Key features include:

- **User Authentication**: Securely link Discord users to their EverQuest characters.
- **Character Management**: Track and manage character data such as levels, classes, and equipment.
- **DKP System**: Implement a fair loot distribution system using Dragon Kill Points (DKP).
- **Event Scheduling**: Organize and schedule in-game events, raids, and meetings directly through Discord.
- **Census Data**: Maintain real-time character census, including alts and bots, within the guild.
- **MediaWiki Integration**: Utilize a local clone of the Project 1999 Wiki for comprehensive guild bank management.

> ⚠️ **Note**: The `/wiki` command is currently disabled (`.bak` files) due to lack of functionality. We need to get our own wiki data live again to restore this feature.

## Technology Stack

- **TypeScript**: Ensures code reliability and maintainability with static typing.
- **Discord.js**: Provides interactive bot features and integrates seamlessly with Discord.
- **TypeORM**: Facilitates object-relational mapping for database interactions.
- **PostgreSQL**: Utilized for robust data storage and scalable performance.
- **Elasticsearch**: Enhances search functionalities for efficient data retrieval.
- **MediaWiki**: Supports local wiki interactions for guild management.

## Getting Started

To deploy the EverQuest Discord Bot TypeScript Edition:

1. Ensure Node.js and npm are installed.
2. Clone the repository and install dependencies.
3. Set up bot credentials, database configurations, and Elasticsearch integration.
4. Configure the local MediaWiki instance for enhanced guild bank management.

For detailed setup instructions, refer to the project's documentation.

## Contribution

Contributions are welcome! Fork the repository, make improvements, and submit pull requests to enhance the bot’s functionality and performance.

## License

This project is licensed under the ISC License. See the LICENSE file for more details.

## Acknowledgments

Transitioning from Python to TypeScript has significantly improved the bot’s performance and scalability. Future plans include integrating log-parsers for enhanced records management and attendance tracking, further leveraging Elasticsearch for data analytics, and optimizing the Project 1999 Wiki integration.

Thank you for exploring the EverQuest Discord Bot TypeScript Edition. We are excited about its potential to elevate community engagement and management for EverQuest enthusiasts.
