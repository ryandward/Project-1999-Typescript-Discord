# EverQuest Discord Bot - TypeScript Edition

Welcome to the EverQuest Discord Bot TypeScript Edition repository! This project, originally developed in Python, has been meticulously reworked in TypeScript to harness the type-safe and scalable nature of the language. The TypeScript configuration for this project has been carefully set up to optimize for strict type-checking, ESNext features, and module interoperability, ensuring that the bot operates with high performance and is future-proof for upcoming JavaScript features.

## Introduction

The EverQuest Discord Bot is a powerful tool designed to enhance the management and engagement of EverQuest gaming communities on Discord. By transitioning to TypeScript, we've not only replicated the original bot's functionalities but also enhanced them, providing seamless integration with Discord's latest features and a codebase that's easier to maintain and extend.

## Features

- **User Authentication**: Securely link Discord users to their EverQuest characters.
- **Character Management**: Track and manage character data such as levels, classes, and equipment.
- **DKP System**: Implement a Dragon Kill Points (DKP) system to manage loot distribution fairly among guild members.
- **Event Scheduling**: Organize and schedule in-game events, raids, and meetings directly through Discord.
- **Census Data**: Maintain a real-time census of all characters, including alts and bots, within the guild.
- **Log Parser Interoperability**: Looking to implement interoperability with log-parsers such as Gina to facilitate records management and attendance.

## Technology Stack

- **TypeScript**: Leveraging TypeScript's static typing to ensure code reliability and maintainability.
- **Discord.js**: Utilizing the official Discord.js library to create an interactive bot experience.
- **TypeORM**: Employing TypeORM for object-relational mapping, compatible with TypeScript for database interactions.
- **PostgreSQL**: Using PostgreSQL for a robust and scalable database to handle bot and game-related data.
- **Elasticsearch**: Integrating Elasticsearch for powerful full-text search capabilities across distributed systems.
- **MediaWiki**: Incorporating MediaWiki to provide comprehensive documentation and community support.

## Getting Started

To begin using the EverQuest Discord Bot TypeScript Edition, ensure Node.js and npm are installed on your system. Clone the repository, install the dependencies, and follow the setup instructions to configure your bot token, database credentials, and integrate Elasticsearch and MediaWiki services.

## Contribution

We invite contributions! If you're interested in adding new features, enhancements, or bug fixes, please fork the repository, apply your changes, and submit a pull request.

## License

This project is licensed under the ISC License. For more information, refer to the LICENSE file.

## Acknowledgments

We extend our heartfelt thanks to Rahmani (ryandward) and Thwurnk for their pioneering work on the original Python bot that laid the foundation for this TypeScript edition. As we prepare to sunset the venerable Python version, we embrace the TypeScript edition's ability to meet the demanding performance requirements of modern bot interactions and data processing. The transition to slash commands is a significant step forward, addressing the frequent database lockups caused by malformed requests. With the community's involvement, we are excited to continue evolving this project, including the planned integration with log-parsers to enhance records management and attendance tracking.

Thank you for exploring the EverQuest Discord Bot TypeScript Edition. We are confident it will be an indispensable tool for your community!
