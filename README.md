# Nirman Project - AI Workforce Orchestrator

An intelligent, multi-agent project management system that automates project planning, task assignment, risk management, and team coordination using AI agents.

## Overview

Nirman Project is a comprehensive AI-powered workforce orchestration platform designed to streamline project management through autonomous agents. The system leverages multiple specialized AI agents to handle different aspects of project lifecycle management, from intake and planning to execution, monitoring, and delivery.

## Key Features

- **Multi-Agent Architecture**: Specialized AI agents for different project management functions
- **Intelligent Task Assignment**: Automated task allocation based on employee skills, availability, and workload
- **Real-time Risk Management**: Proactive identification and mitigation of project risks
- **Automated Planning**: AI-driven project planning and scheduling
- **Team Coordination**: Automated communication and escalation management
- **Performance Monitoring**: Continuous tracking of project and employee metrics
- **Multi-tenant Support**: Secure isolation for multiple organizations
- **RESTful API**: Comprehensive API for integration with external systems

## Architecture

### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLAlchemy ORM with SQLite
- **AI/ML**: LangChain with HuggingFace models
- **Authentication**: JWT-based security with tenant isolation
- **Rate Limiting**: Built-in request throttling

### Frontend
- Modern web interface for project visualization and management

### AI Agents

The system includes specialized agents for:

1. **Intake Agent**: Processes new project requests and requirements
2. **Planning Agent**: Creates project plans, timelines, and resource allocation
3. **Execution Coordinator**: Manages task execution and workflow
4. **Staffing Agent**: Handles resource allocation and team composition
5. **Risk Agent**: Identifies and manages project risks
6. **Communication Agent**: Manages stakeholder communications
7. **Escalation Agent**: Handles issue escalation and resolution
8. **Delivery Review Agent**: Validates deliverables and quality
9. **Rebalance Agent**: Optimizes resource allocation dynamically
10. **Project Observer Agent**: Monitors overall project health

## Project Structure

```
Nirman-Project/
├── backend/              # FastAPI backend application
│   ├── app/
│   │   ├── agents/      # AI agent implementations
│   │   ├── api/         # REST API routes
│   │   ├── core/        # Core configuration and middleware
│   │   ├── db/          # Database models and schema
│   │   ├── models/      # SQLAlchemy models
│   │   ├── schemas/     # Pydantic schemas
│   │   ├── services/    # Business logic services
│   │   └── utils/       # Utility functions
│   └── requirements.txt
├── backend_adk/         # Alternative backend implementation
├── frontend/            # Frontend application
└── setup_adk_backend.py # Backend setup script
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+ (for frontend)
- pip or conda for Python package management

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables (create `.env` file):
```env
DATABASE_URL=sqlite:///./agentic_orchestrator.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

4. Run the application:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### API Documentation

Once the backend is running, access the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Core Modules

### Authentication & Security
- JWT-based authentication
- Multi-tenant data isolation
- Role-based access control
- Rate limiting middleware

### Project Management
- Project creation and tracking
- Task management with dependencies
- Milestone and checkpoint tracking
- Progress monitoring

### Resource Management
- Employee profiles and skills
- Availability tracking
- Workload balancing
- Performance metrics

### AI Orchestration
- Multi-agent workflow coordination
- Decision logging and audit trails
- Event-driven architecture
- Automated escalation handling

## API Endpoints

Key endpoint categories:
- `/auth/*` - Authentication and user management
- `/projects/*` - Project CRUD operations
- `/tasks/*` - Task management
- `/agents/*` - Agent status and control
- `/employees/*` - Employee management
- `/decisions/*` - Decision logs
- `/blockers/*` - Issue tracking
- `/meetings/*` - Meeting management

## Technologies Used

- **FastAPI**: Modern, fast web framework for building APIs
- **SQLAlchemy**: SQL toolkit and ORM
- **Pydantic**: Data validation using Python type annotations
- **LangChain**: Framework for developing LLM applications
- **HuggingFace**: Pre-trained models and transformers
- **Python-JOSE**: JavaScript Object Signing and Encryption
- **Passlib**: Password hashing library
- **Alembic**: Database migration tool

## Development

### Running in Development Mode

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Database Migrations

```bash
alembic revision --autogenerate -m "Description"
alembic upgrade head
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[Add your license information here]

## Contact

[Add contact information here]

## Acknowledgments

Built with modern AI and web technologies to revolutionize project management through intelligent automation.