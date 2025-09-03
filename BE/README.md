# Backend (BE) - Auth Session Storage

This folder contains the backend implementation for authentication session storage using FastAPI, Redis, and Postgres.

## Features

-   FastAPI-based REST API for authentication and session management
-   Redis used for storing session data
-   Postgres used for persistent user data
-   Docker Compose setup for Redis and Postgres services

## Getting Started

1. **Start Redis and Postgres using Docker Compose**

    Before running the FastAPI app, make sure to start both the Redis and Postgres services:

    ```bash
    docker compose up -d
    ```

2. **Run the FastAPI App**

    After Redis and Postgres are running, start the FastAPI backend:

    ```bash
    uvicorn main:app --reload
    ```

    Replace `main:app` with the appropriate module and app name if different.

## Folder Structure

-   `main.py` - FastAPI application entry point
-   `requirements.txt` - Python dependencies
-   Other modules for authentication/session logic

## Environment Variables

Configure environment variables as needed for Redis and Postgres connection and other settings.

## API Endpoints

-   **/health/db** -> Sanity Check for Postgres DB
-   **/health/redis** -> sanity Check for Redis

MIT
