# HashCode Hub

An elegant, minimalist platform for the HashCode developer community to read, discuss, and share motivational tech lessons.

[cloudflarebutton]

## About The Project

HashCode Hub is a visually stunning, minimalist content platform designed for the 'HashCode Family' developer community. The application presents a curated series of motivational and educational tech lessons, organized into seasons. The core experience is centered around a clean, distraction-free reading interface.

The entire platform is built with a 'less is more' philosophy, emphasizing typography, white space, and subtle interactions to create a premium and focused user experience.

## Key Features

-   **Seasonal Content:** Lessons are organized into distinct seasons for structured learning.
-   **Dual-Pane Layout:** A persistent sidebar for easy navigation between seasons and a main content area for lessons.
-   **Interactive Lesson Cards:** Engage with content through likes, comments, and social sharing.
-   **Minimalist & Focused UI:** A clean, distraction-free reading experience that prioritizes content.
-   **Fully Responsive:** A seamless experience on all devices, with the sidebar collapsing into a sheet menu on mobile.
-   **Built on the Edge:** Powered by Cloudflare Workers and Durable Objects for global low-latency.

## Technology Stack

-   **Frontend:**
    -   React & Vite
    -   TypeScript
    -   Tailwind CSS
    -   shadcn/ui
    -   Zustand for state management
    -   Framer Motion for animations
    -   Lucide React for icons
-   **Backend:**
    -   Hono on Cloudflare Workers
-   **Storage:**
    -   Cloudflare Durable Objects
-   **Deployment:**
    -   Cloudflare Pages & Workers

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [Bun](https://bun.sh/)
-   [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/hashcode_hub.git
    cd hashcode_hub
    ```

2.  **Install dependencies:**
    This project uses Bun as the package manager.
    ```sh
    bun install
    ```

3.  **Start the development server:**
    This command starts the Vite frontend server and the Wrangler dev server for the backend worker simultaneously.
    ```sh
    bun dev
    ```

The application should now be running locally. The frontend will be available at `http://localhost:3000` (or another port if 3000 is in use), and the worker API will be proxied automatically.

## Project Structure

The project is organized into three main directories:

-   `src/`: Contains the entire frontend React application, including pages, components, hooks, and styles.
-   `worker/`: Contains the Hono backend application that runs on Cloudflare Workers, including API routes and Durable Object logic.
-   `shared/`: Contains TypeScript types and interfaces that are shared between the frontend and the backend to ensure type safety.

## Development

-   **Adding API Routes:** New backend endpoints should be added in `worker/user-routes.ts`.
-   **Creating Entities:** To model new data, create new `Entity` or `IndexedEntity` classes in `worker/entities.ts`.
-   **Building UI Components:** New UI components should be created within `src/components/`. It is highly recommended to use `shadcn/ui` primitives.
-   **Creating Pages:** New pages can be added to the `src/pages/` directory and linked in the router at `src/main.tsx`.

## Deployment

This project is designed for seamless deployment to Cloudflare.

1.  **Login to Wrangler:**
    If you haven't already, authenticate Wrangler with your Cloudflare account.
    ```sh
    bunx wrangler login
    ```

2.  **Deploy the application:**
    The `deploy` script will build the frontend application and deploy it along with the worker to your Cloudflare account.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository with a single click.

[cloudflarebutton]