# FeedChange

A simple, privacy-focused baby tracking application for monitoring feeding sessions and diaper changes. Built with SvelteKit and designed with parents' privacy in mind.

## 🍼 Features

### Baby Tracking

- **Feeding Sessions**: Track bottle size, amount consumed, and feeding patterns
- **Diaper Changes**: Quick logging of diaper changes with timestamps
- **Visual Interface**: Intuitive bottle interface with slider controls
- **Statistics Dashboard**: Monitor feeding efficiency, consumption patterns, and change frequency

### Privacy-First Design

- ✅ **No Email Required**: Start tracking immediately without account creation
- ✅ **Zero Tracking**: No analytics, cookies, or data collection
- ✅ **Auto-Cleanup**: All data automatically deleted after 7 days of inactivity
- ✅ **Open Source**: Transparent codebase available on GitHub

### Technical Features

- 🌍 **Internationalization**: Multi-language support (English, German-Swiss)
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⚡ **Fast Performance**: Built with modern web technologies
- 🔒 **Local Data Storage**: Your data stays on your device

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/polaroidkidd/feedchange.git
   cd feedchange
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database configuration
   ```

4. **Initialize the database**

   ```bash
   pnpm db:push:dev
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start development server with database setup
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm test` - Run unit tests
- `pnpm lint` - Run linting and formatting checks
- `pnpm format` - Format code with Prettier

### Database Commands

- `pnpm db:push:dev` - Push database schema (development)
- `pnpm db:generate:dev` - Generate Prisma client (development)
- `pnpm db:push:prod` - Push database schema (production)

## 🏗️ Tech Stack

- **Frontend**: SvelteKit 2, Svelte 5
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS 4, Flowbite UI components
- **Deployment**: Cloudflare Pages
- **Languages**: TypeScript
- **Testing**: Vitest, Playwright
- **Internationalization**: Paraglide JS

## 📊 Data Model

The application uses a simple SQLite database with two main entities:

- **Baby**: Stores baby information (name, weight, current bottle size)
- **Event**: Tracks feeding and diaper change events with timestamps

Data is automatically cleaned up after 7 days of inactivity to maintain privacy.

## 🌍 Internationalization

FeedChange supports multiple languages:

- English (en)
- German (Swiss) (de-ch)

To add a new language, add translation files in the `messages/` directory and configure them in the Paraglide settings.

## 🚀 Deployment

### Cloudflare Pages

1. **Build the project**

   ```bash
   pnpm build
   ```

2. **Deploy to Cloudflare Pages**
   ```bash
   pnpm cf:deploy
   ```

### Self-Hosting

FeedChange can be deployed to any platform that supports Node.js applications. Make sure to:

1. Set up your production database
2. Configure environment variables
3. Run the build process
4. Deploy the generated files

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- [GitHub Repository](https://github.com/polaroidkidd/feedchange)
- [Live](https://feedchange.dle.dev)
- [Report Issues](https://github.com/polaroidkidd/feedchange/issues)

## 🙏 Acknowledgments

Built with ❤️ for parents who value privacy and simplicity in baby tracking.

---

_FeedChange - Simple, private baby tracking without the complexity._
