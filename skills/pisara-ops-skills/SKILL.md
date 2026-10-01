# Pisara Operations Ticketing System

## Purpose

Build a production-style internal team operations and ticketing system
using Next.js, NestJS, MongoDB, MUI, pnpm, and Docker.

The project is intentionally small in feature scope but should demonstrate
professional software engineering practices.

The goal is to understand the architecture and implementation rather than
blindly generating code.

---

# Technology Stack

## Frontend

- Next.js
- TypeScript
- MUI
- MUI DataGrid
- React

## Backend

- NestJS
- TypeScript
- REST API
- DTOs
- class-validator
- Dependency Injection

## Database

- MongoDB
- MongoDB Compass
- Aggregation Pipelines
- Indexes

## Tooling

- pnpm
- Docker
- Docker Compose
- Git

---

# Monorepo Structure

Use a pnpm workspace.

Expected structure:

team-operations/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   └── shared/
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
└── README.md

---

# Core Domain

The application manages projects and tickets/tasks.

## Project

A project contains multiple tickets.

Fields:

- id
- name
- description
- status
- priority
- members
- createdAt
- updatedAt

Project statuses:

- PLANNING
- ACTIVE
- ON_HOLD
- COMPLETED

---

# Ticket

A ticket represents a unit of work.

Fields:

- id
- title
- description
- projectId
- assigneeId
- status
- priority
- dueDate
- tags
- createdAt
- updatedAt

Ticket statuses:

- TODO
- IN_PROGRESS
- REVIEW
- DONE

Ticket priorities:

- LOW
- MEDIUM
- HIGH
- CRITICAL

---

# Activity

Important ticket actions should generate activity records.

Example:

{
  "type": "TICKET_STATUS_CHANGED",
  "ticketId": "...",
  "userId": "...",
  "metadata": {
    "from": "TODO",
    "to": "IN_PROGRESS"
  },
  "createdAt": "..."
}

Do not over-engineer this into a full event-sourcing system.

The purpose is to practice modeling historical activity and MongoDB
aggregation.

---

# Backend Architecture

Use this general flow:

Controller
    ↓
Service / Use Case
    ↓
Repository
    ↓
MongoDB

Controllers should remain thin.

Do not put database queries directly inside controllers.

Do not put large business rules inside controllers.

Services should contain application/business logic.

Repositories should handle persistence concerns.

---

# NestJS Requirements

Practice and correctly use:

- @Module()
- @Controller()
- @Get()
- @Post()
- @Patch()
- @Delete()
- @Injectable()
- @Body()
- @Param()
- @Query()

Use DTOs for request validation.

Example:

class CreateTicketDto {
  title: string;
  description?: string;
  projectId: string;
  assigneeId?: string;
  status: TicketStatus;
  priority: TicketPriority;
  dueDate?: Date;
  tags?: string[];
}

Use class-validator where appropriate.

Never use `any` for convenience when a proper type can be created.

---

# API

Implement approximately these endpoints.

## Projects

GET    /projects
GET    /projects/:id
POST   /projects
PATCH  /projects/:id
DELETE /projects/:id

## Tickets

GET    /tickets
GET    /tickets/:id
POST   /tickets
PATCH  /tickets/:id
DELETE /tickets/:id

## Analytics

GET /analytics/dashboard
GET /analytics/tickets
GET /analytics/projects

## Activity

GET /activity

Do not unnecessarily increase the API surface.

---

# Ticket Filtering

The ticket endpoint should support:

GET /tickets

with query parameters such as:

status
priority
projectId
assigneeId
search
page
limit
sortBy
sortOrder

Example:

GET /tickets?status=IN_PROGRESS&priority=HIGH&page=1&limit=20

The filtering implementation should happen in the backend.

Do not fetch every ticket and filter everything in JavaScript.

---

# MongoDB

Use MongoDB properly.

Practice:

- find
- filtering
- projection
- sorting
- pagination
- indexes
- aggregation pipelines

Important aggregation operators to practice:

- $match
- $group
- $lookup
- $unwind
- $project
- $sort
- $count
- $facet

Do not add aggregation stages simply because they are available.

Every aggregation stage should have a reason.

---

# Analytics

The dashboard should expose useful aggregated information.

Examples:

- total projects
- active projects
- completed projects
- total tickets
- completed tickets
- overdue tickets
- tickets by status
- tickets by priority
- tickets by project
- tickets by assignee
- completion percentage

The frontend should consume the aggregation results from the API.

Do not calculate database-wide analytics entirely on the frontend.

---

# MongoDB Compass

Use MongoDB Compass during development.

Use it to:

- inspect documents
- test filters
- build aggregation pipelines
- inspect indexes
- understand query results

When possible:

1. Develop/test an aggregation in Compass.
2. Understand every pipeline stage.
3. Implement the same aggregation in NestJS.

Never copy an aggregation without understanding it.

---

# Frontend

Build a simple internal dashboard.

Pages:

/dashboard
/projects
/projects/[id]
/tickets
/tickets/[id]

Use MUI for:

- DataGrid
- Dialog
- Drawer
- Forms
- Cards
- Chips
- Tabs
- Snackbar
- Loading states
- Error states

The UI should be clean and functional.

Do not spend excessive time on visual polish.

---

# Dashboard

The dashboard should display:

- project count
- active project count
- ticket count
- completed ticket count
- overdue ticket count
- ticket status distribution
- ticket priority distribution
- project progress

Use real API data.

Do not hardcode dashboard numbers.

---

# MUI DataGrid

Use DataGrid for the ticket list.

The table should support:

- pagination
- sorting
- filtering
- status display
- priority display
- assignee
- project
- due date

Keep the actual data fetching responsibility clear.

---

# Docker

Create a Docker Compose development environment.

Services should include:

- MongoDB
- NestJS API
- Next.js web application

The goal is to understand:

- images
- containers
- ports
- volumes
- environment variables
- service networking
- Docker Compose

The application should be able to start with:

docker compose up

---

# pnpm

Use pnpm throughout the project.

Practice:

pnpm install
pnpm add
pnpm add -D
pnpm remove
pnpm update
pnpm run
pnpm exec

Understand:

- package.json
- pnpm-lock.yaml
- workspace configuration
- dependencies
- devDependencies
- scripts

Do not use npm commands unless there is a specific reason.

---

# Clean Code Rules

Follow these rules throughout the project.

## Controllers

Controllers should be thin.

Bad:

Controller
→ validation
→ business logic
→ database query
→ formatting
→ error handling

Better:

Controller
→ Service
→ Repository

---

## Naming

Prefer:

getTickets()
createTicket()
updateTicketStatus()

Avoid:

processData()
handleStuff()
doThing()

Names should communicate intent.

---

## Functions

Prefer small functions with one responsibility.

Avoid giant functions that perform multiple unrelated operations.

---

## Types

Avoid:

any
unknown used without validation
untyped objects

Prefer explicit interfaces, DTOs, enums, and types.

---

## Duplication

If the same logic appears multiple times, determine whether it should
be extracted.

Do not blindly create abstractions for every repeated line.

---

# Error Handling

Implement consistent API errors.

Examples:

- 400 Bad Request
- 404 Not Found
- 409 Conflict
- 500 Internal Server Error

Do not silently swallow errors.

Do not return successful HTTP responses when the operation failed.

---

# Development Rules

Before implementing a feature:

1. Understand the requirement.
2. Identify the affected layer.
3. Decide the data model.
4. Implement the smallest correct solution.
5. Test it.
6. Review the implementation.
7. Refactor only when justified.

Do not over-engineer.

Do not introduce microservices.

Do not introduce unnecessary design patterns.

Do not create abstractions without a reason.

---

# Claude / AI Usage

Use AI as an engineering assistant, not as a code vending machine.

Good uses:

- architecture review
- code review
- MongoDB aggregation review
- debugging
- explaining unfamiliar APIs
- identifying edge cases
- suggesting tests
- identifying clean-code violations

Before accepting generated code:

1. Read it.
2. Understand it.
3. Run it.
4. Test it.
5. Be able to explain it.

If you cannot explain a piece of generated code, do not consider the task complete.

---

# Testing

At minimum, test:

- DTO validation
- ticket creation
- ticket retrieval
- ticket filtering
- ticket status updates
- project creation
- analytics calculations

Do not attempt 100% coverage.

Focus on important business behavior.

---

# Git

Use meaningful commits.

Examples:

feat(api): add ticket creation
feat(api): add ticket filtering
feat(analytics): add ticket aggregation
feat(web): add ticket data grid
feat(web): add dashboard
chore(docker): add compose environment
refactor(api): separate ticket repository

Avoid:

update
changes
fix stuff
final
final2
final-final

---

# Definition of Done

The project is considered complete when:

- Next.js runs successfully.
- NestJS runs successfully.
- MongoDB runs successfully.
- pnpm workspace works.
- Docker Compose starts the environment.
- Projects can be created and managed.
- Tickets can be created and managed.
- Tickets can be filtered and paginated.
- DTO validation works.
- MongoDB aggregations power the dashboard.
- MongoDB indexes are understood and documented.
- MUI DataGrid is implemented.
- Frontend communicates with NestJS.
- Errors are handled properly.
- Code follows reasonable clean-code principles.
- README explains architecture and setup.
- Git history contains meaningful commits.
- The developer can explain every major architectural decision.

---

# Learning Objective

The goal is NOT merely to finish the application.

The developer should finish understanding:

1. How a Next.js frontend communicates with NestJS.
2. How NestJS dependency injection works.
3. How DTO validation works.
4. How MongoDB aggregation pipelines work.
5. How MongoDB indexes affect query design.
6. How to structure a maintainable backend.
7. How to use MUI for business applications.
8. How pnpm workspaces work.
9. How Docker Compose connects services.
10. How to use AI tools responsibly during software development.
11. How to recognize and reduce unnecessary complexity.

When choosing between a faster implementation and a better learning
opportunity, prefer the better learning opportunity as long as it does
not significantly expand the project's scope.