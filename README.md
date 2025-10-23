# GrowthPad - Your Personal Content Catalyst

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/lusinh/generated-app-20251023-074334)

GrowthPad is a visually stunning, minimalist, and high-converting personal landing page designed for a content tutor. The primary goal is to establish credibility, showcase expertise, and generate leads. The application is a single-page experience, guiding the user through a narrative that builds trust and encourages contact. It features a captivating hero section, a clear breakdown of services, social proof through testimonials, and a frictionless lead capture form. The entire design philosophy is 'less is more', focusing on clarity, ample white space, and a professional aesthetic to maximize visitor engagement and conversion.

## ✨ Key Features

- **Stunning Single-Page Design:** A complete, self-contained landing page for a seamless user journey.
- **Captivating Hero Section:** Makes a strong first impression with a clear value proposition.
- **Services Showcase:** Elegantly displays the services offered.
- **Social Proof:** Builds trust with a dedicated testimonials section.
- **Lead Generation Form:** A simple, frictionless contact form to capture leads, powered by a Cloudflare Worker.
- **Fully Responsive:** Flawless design and functionality on all devices, from mobile to desktop.
- **Minimalist Aesthetic:** Clean, elegant UI focusing on typography, white space, and user experience.

## 🚀 Tech Stack

- **Frontend:** React, Vite, TypeScript
- **Backend:** Hono on Cloudflare Workers
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Forms:** React Hook Form with Zod for validation
- **Notifications:** Sonner
- **Icons:** Lucide React
- **Persistence:** Cloudflare Durable Objects

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- A [Cloudflare account](https://dash.cloudflare.com/sign-up).
- The [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) authenticated with your Cloudflare account.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/growthpad.git
    cd growthpad
    ```

2.  **Install dependencies:**
    This project uses `bun` as the package manager.
    ```sh
    bun install
    ```

### Running in Development Mode

To start the local development server for both the frontend and the worker, run:

```sh
bun dev
```

This will start the Vite development server for the React application and a local Wrangler server for the Hono API. The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

-   `src/`: Contains the frontend React application.
    -   `pages/HomePage.tsx`: The main and only page for the application.
    -   `components/`: Reusable React components.
    -   `lib/`: Utility functions and API client.
-   `worker/`: Contains the backend Cloudflare Worker code.
    -   `index.ts`: The entry point for the worker.
    -   `user-routes.ts`: Defines the API routes using Hono.
    -   `entities.ts`: Defines data models (Entities) for Durable Objects.
-   `shared/`: Contains TypeScript types shared between the frontend and the worker.

## 💻 Development

### Frontend

The entire frontend is contained within the `src/pages/HomePage.tsx` file. All sections (Hero, Services, Testimonials, etc.) are components within this single page. Modify this file to make changes to the UI and frontend logic.

### Backend API

The backend is a Hono application running on Cloudflare Workers.

-   **API Routes:** Add or modify API endpoints in `worker/user-routes.ts`.
-   **Data Models:** Define new data structures to be stored in Durable Objects in `worker/entities.ts`. The project uses a custom `IndexedEntity` wrapper for simplified data access.

## ☁️ Deployment

This project is configured for easy deployment to Cloudflare Pages.

1.  **Build the project:**
    First, build the frontend application and the worker.
    ```sh
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    Run the deploy command using Wrangler. This will deploy your application to your Cloudflare account.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/lusinh/generated-app-20251023-074334)