# Practice MCQs Website

🌟 This GitHub repository contains a project designed for practicing MCQs related to our subjects in a quiz format. It provides an engaging alternative to studying from question bank PDFs. As the admin, I will upload quizzes for practice, and you can use this platform to enhance your learning experience.

## Overview 💡

This is a [Next.js 15](https://nextjs.org) project built with TypeScript. It leverages the following technologies:

- **Prisma ORM** for database management.
- **Tailwind CSS** and **Shadcn UI** for the frontend.
- **Docker** to set up a local database for development.

💡 Follow these steps to set up the project locally:

### 1. Prerequisites 🔧

Ensure you have the following installed:

- **[pnpm](https://pnpm.io/)** package manager. If you already have Node.js installed, install `pnpm` globally:
  ```bash
  npm install -g pnpm
  ```
- **[Docker](https://www.docker.com/)**: Used to create and manage the local PostgreSQL database.

### 2. Fork and Clone the Repository 🔼

1. Fork this repository to your GitHub account.
2. Clone your forked repository:
   ```bash
   git clone <your-fork-url>
   ```
3. Navigate into the project directory:
   ```bash
   cd <project-directory>
   ```

### 3. Install Dependencies 📝

Install all the required dependencies using `pnpm`:

```bash
pnpm install
```

### 4. Set Up the Local Database 🏛️

Make sure Docker is running (e.g., open Docker Desktop on Windows) and execute:

```bash
pnpm start-db
```

This will create and run a PostgreSQL container with the necessary configuration.

### 5. Configure the Environment Variables 🔒

Create a `.env` file in the root of the project and add the following:

```env
DATABASE_URL="postgresql://dev_user:dev_password@localhost:5432/quiz_db"
```

Make sure the credentials match those defined in the `docker-compose.yaml` file.

### 6. Migrate the Prisma Schema 🔄

Initialize the database schema by running the Prisma migration:

```bash
pnpx prisma migrate dev
```

This sets up the database tables as defined in the Prisma schema.

### 7. Run the Development Server 🚀

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Learn More 📖

Explore the following resources to learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - A React framework for building full-stack web applications.
- [Prisma Documentation](https://www.prisma.io/docs) - A modern Node.js and TypeScript ORM.
- [Docker Documentation](https://docs.docker.com/) - An open platform for developing, shipping, and running applications.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation) - A utility-first CSS framework.
- [Shadcn/UI Documentation](https://ui.shadcn.com/docs) - A collection of reusable components.

## Deployment 🌐

The website is deployed on Vercel. You can visit it here:
[https://those-mcq-subjects.vercel.app](https://those-mcq-subjects.vercel.app).

---

Feel free to contribute by opening issues or submitting pull requests to improve the project! 🙌
