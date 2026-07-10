# 🚀 BrandForge AI

<div align="center">

![BrandForge AI](https://img.shields.io/badge/BrandForge-AI-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![IBM watsonx](https://img.shields.io/badge/IBM-watsonx.ai-0062FF?style=for-the-badge&logo=ibm)
![LangChain](https://img.shields.io/badge/LangChain-JS-green?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

**AI-Powered Marketing Brand Extension & Ideation Platform**

*Powered by IBM watsonx.ai Granite Models*

[Features](#-key-features) • [Architecture](#-architecture) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](docs/API.md)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [The Problem We Solve](#-the-problem-we-solve)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**BrandForge AI** is an enterprise-grade, AI-powered platform designed to revolutionize how marketing teams approach brand extension and product ideation. Powered by **IBM watsonx.ai** and the **Granite 13B Chat** model through LangChain, BrandForge AI transforms the traditionally time-consuming process of brand strategy development into an instant, data-driven experience.

Built with Next.js 14, TypeScript, and modern web technologies, BrandForge AI provides marketing professionals with a sophisticated yet intuitive interface to generate comprehensive brand extension strategies, complete with SWOT analysis, AIDA marketing frameworks, and detailed target persona profiles.

**Why IBM watsonx.ai?**
- 🏢 Enterprise-grade AI infrastructure
- 🔒 Enhanced data privacy and security
- 🎯 Granite models optimized for business use cases
- ✅ Compliance with regulatory requirements
- 💼 Trusted by Fortune 500 companies

### 🎬 Demo

```
Current Brand: Horlicks
Core Strengths: Nutrition, trust, health malt
Target Category: Energy Bars

→ Generates: Complete brand extension strategy in seconds
```

---

## 💡 The Problem We Solve

### Challenges Digital Marketers Face

**1. Creative Block & Ideation Fatigue**
- Marketing teams spend weeks brainstorming brand extension ideas
- Traditional ideation sessions are time-consuming and often yield limited results
- Creative fatigue leads to repetitive, uninspired strategies

**2. Inconsistent Strategic Frameworks**
- Manual SWOT analyses are subjective and lack comprehensive market insights
- AIDA framework implementation varies across team members
- Persona development is often based on assumptions rather than data-driven insights

**3. Scalability Issues**
- Agencies struggle to deliver consistent quality across multiple client projects
- Small teams cannot compete with large agencies' strategic capabilities
- Rapid market changes require faster strategy iteration

**4. Resource Constraints**
- Hiring experienced brand strategists is expensive
- Junior marketers lack the expertise for complex brand extensions
- Budget limitations prevent access to premium market research tools

### How BrandForge AI Solves These Problems

✅ **Instant Strategy Generation**: Transform hours of brainstorming into seconds of AI-powered analysis  
✅ **Consistent Quality**: Every strategy follows proven marketing frameworks (SWOT, AIDA)  
✅ **Scalable Content Creation**: Generate unlimited brand extension strategies without additional resources  
✅ **Data-Driven Insights**: Leverage AI trained on vast marketing knowledge bases  
✅ **Cost-Effective**: Democratize access to enterprise-level brand strategy capabilities  
✅ **Rapid Iteration**: Test multiple brand extension concepts quickly  
✅ **Expert-Level Output**: AI acts as an elite corporate marketing strategist with 20+ years of experience

---

## ✨ Key Features

### 🎨 Interactive Dashboard
- **Modern UI/UX**: Sleek, gradient-based design with dark mode support
- **Real-time Feedback**: Loading states, error handling, and success indicators
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Navigation**: Multi-tab interface for organized result presentation

### 🧠 AI-Powered Analysis
- **Brand Extension Naming**: Generate catchy, memorable product line names
- **SWOT Analysis**: Comprehensive strengths, weaknesses, opportunities, and threats
- **AIDA Framework**: Structured marketing strategy (Attention, Interest, Desire, Action)
- **Target Persona Development**: Detailed demographic and psychographic profiles

### 🔧 Technical Excellence
- **Type-Safe**: Full TypeScript implementation for robust code
- **API-First Design**: RESTful API with comprehensive documentation
- **Error Handling**: Graceful error management with user-friendly messages
- **Extensible Architecture**: Easy to add new AI models and features

### 🌐 IBM watsonx.ai Integration
- **Primary Provider**: IBM watsonx.ai with Granite 13B Chat model
- **Enterprise Security**: Built-in compliance and data governance
- **Optimized Performance**: Fine-tuned for business and marketing applications
- **Scalable Infrastructure**: IBM Cloud's global infrastructure

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     BrandForge AI Platform                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │   Next.js 14     │         │   React 18       │          │
│  │   App Router     │◄────────┤   TypeScript     │          │
│  │   (Frontend)     │         │   Tailwind CSS   │          │
│  └────────┬─────────┘         └──────────────────┘          │
│           │                                                   │
│           │ API Calls                                         │
│           ▼                                                   │
│  ┌──────────────────────────────────────────────┐           │
│  │         API Routes (Next.js Backend)         │           │
│  │  ┌────────────────────────────────────────┐  │           │
│  │  │  /api/generate (POST)                  │  │           │
│  │  │  - Request validation                  │  │           │
│  │  │  - LangChain orchestration             │  │           │
│  │  │  - Response formatting                 │  │           │
│  │  └────────────────────────────────────────┘  │           │
│  └────────┬─────────────────────────────────────┘           │
│           │                                                   │
│           │ LangChain Integration                            │
│           ▼                                                   │
│  ┌──────────────────────────────────────────────┐           │
│  │            LangChain Framework               │           │
│  │  ┌────────────────────────────────────────┐  │           │
│  │  │  PromptTemplate                        │  │           │
│  │  │  - Structured prompts                  │  │           │
│  │  │  - Marketing strategist persona        │  │           │
│  │  └────────────────────────────────────────┘  │           │
│  │  ┌────────────────────────────────────────┐  │           │
│  │  │  JsonOutputParser                      │  │           │
│  │  │  - Structured JSON output              │  │           │
│  │  │  - Type-safe responses                 │  │           │
│  │  └────────────────────────────────────────┘  │           │
│  └────────┬─────────────────────────────────────┘           │
│           │                                                   │
│           │ LLM API Calls                                    │
│           ▼                                                   │
│  ┌──────────────────────────────────────────────┐           │
│  │          LLM Provider Layer                  │           │
│  │  ┌──────────────┐  ┌──────────────┐         │           │
│  │  │   OpenAI     │  │ IBM watsonx  │         │           │
│  │  │   GPT-4      │  │   Granite    │         │           │
│  │  └──────────────┘  └──────────────┘         │           │
│  │  ┌──────────────────────────────────┐       │           │
│  │  │  Custom OpenAI-Compatible APIs   │       │           │
│  │  └──────────────────────────────────┘       │           │
│  └──────────────────────────────────────────────┘           │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Why This Architecture?

#### **Next.js 14 with App Router**
- **Server-Side Rendering (SSR)**: Improved SEO and initial load performance
- **API Routes**: Built-in backend without separate server setup
- **File-based Routing**: Intuitive project structure
- **React Server Components**: Optimal performance with reduced client-side JavaScript
- **Edge Runtime Support**: Deploy globally with minimal latency

#### **LangChain Framework**
- **Provider Agnostic**: Switch between OpenAI, IBM, or custom LLMs seamlessly
- **Prompt Engineering**: Structured templates for consistent AI behavior
- **Output Parsing**: Guaranteed JSON structure for reliable frontend integration
- **Chain Composition**: Complex workflows with multiple AI interactions
- **Memory Management**: Context-aware conversations (future enhancement)

#### **IBM watsonx.ai & Granite Models**
- **Enterprise-Grade AI**: IBM's trusted AI infrastructure
- **Granite Models**: Specialized for business and marketing use cases
- **Data Privacy**: On-premises deployment options for sensitive data
- **Compliance**: Meets enterprise security and regulatory requirements
- **Cost Optimization**: Flexible pricing models for different scales

#### **TypeScript**
- **Type Safety**: Catch errors at compile-time, not runtime
- **Better IDE Support**: Autocomplete, refactoring, and inline documentation
- **Maintainability**: Self-documenting code with interfaces and types
- **Team Collaboration**: Clear contracts between frontend and backend

#### **Tailwind CSS**
- **Rapid Development**: Utility-first approach speeds up UI creation
- **Consistent Design**: Design system built into the framework
- **Performance**: Minimal CSS bundle size with purging
- **Dark Mode**: Built-in dark mode support

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)

### Backend
- **Runtime**: Node.js (via Next.js API Routes)
- **AI Framework**: LangChain JS
- **LLM Providers**: 
  - OpenAI (GPT-4, GPT-3.5-turbo)
  - IBM watsonx.ai (Granite models)
  - Custom OpenAI-compatible endpoints

### Development Tools
- **Package Manager**: npm / yarn / pnpm
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript compiler
- **Code Formatting**: Prettier (recommended)

### Deployment
- **Recommended**: Vercel (optimized for Next.js)
- **Alternatives**: AWS, Azure, Google Cloud, Docker

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For cloning the repository ([Download](https://git-scm.com/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/brandforge-ai.git
cd brandforge-ai
```

### Step 2: Install Dependencies

Choose your preferred package manager:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

This will install all required dependencies including:
- Next.js and React
- LangChain and AI providers
- Tailwind CSS and UI libraries
- TypeScript and type definitions

### Step 3: Environment Configuration

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration (see [Configuration](#-configuration) section below).

### Step 4: Run Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Step 5: Verify Installation

1. Open your browser to `http://localhost:3000`
2. You should see the BrandForge AI dashboard
3. Test the health check endpoint: `http://localhost:3000/api/health`

---

## ⚙️ Configuration

### Environment Variables

BrandForge AI requires specific environment variables to function. Create a `.env.local` file with the following:

#### Required Variables

```env
# IBM watsonx.ai Configuration (Primary Provider)
WATSONX_API_KEY=your-watsonx-api-key-here
WATSONX_PROJECT_ID=your-project-id-here
```

### Configuration Options Explained

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `WATSONX_API_KEY` | IBM watsonx.ai API key | - | ✅ Yes |
| `WATSONX_PROJECT_ID` | IBM watsonx.ai Project ID | - | ✅ Yes |

**Note:** The application uses the `ibm/granite-13b-chat-v2` model, which is pre-configured in the API route.

### Getting IBM watsonx.ai Credentials

#### Step 1: Create IBM Cloud Account
1. Visit [IBM Cloud](https://cloud.ibm.com/)
2. Sign up for a free account or log in
3. Verify your email address

#### Step 2: Set Up watsonx.ai
1. Navigate to the [IBM watsonx.ai](https://www.ibm.com/watsonx) page
2. Click "Try watsonx.ai" or "Get Started"
3. Create a new watsonx.ai instance
4. Choose your region (US South recommended)

#### Step 3: Create a Project
1. In watsonx.ai, go to "Projects"
2. Click "New project"
3. Give your project a name (e.g., "BrandForge AI")
4. Note your **Project ID** (found in project settings)

#### Step 4: Generate API Key
1. Go to [IBM Cloud API Keys](https://cloud.ibm.com/iam/apikeys)
2. Click "Create an IBM Cloud API key"
3. Give it a name (e.g., "BrandForge AI Key")
4. Copy the API key immediately (you won't see it again)
5. Store it securely

#### Step 5: Configure Environment
1. Copy `.env.example` to `.env.local`
2. Paste your API key as `WATSONX_API_KEY`
3. Paste your Project ID as `WATSONX_PROJECT_ID`
4. Save the file

**Important Notes:**
- Keep your API key secure and never commit it to version control
- The Granite 13B Chat model is pre-configured in the application
- Free tier includes limited API calls; monitor your usage in IBM Cloud
- For production use, consider upgrading to a paid plan for higher limits

---

## 🚀 Usage

### Basic Workflow

1. **Access the Dashboard**
   - Navigate to `http://localhost:3000`
   - You'll see the BrandForge AI interface

2. **Enter Brand Information**
   - **Current Brand Name**: e.g., "Horlicks"
   - **Brand Core Strengths**: e.g., "Nutrition, trust, health malt"
   - **Target Extension Category**: e.g., "Energy Bars"

3. **Generate Strategy**
   - Click "Forge Extension Strategy"
   - Wait for AI processing (typically 5-15 seconds)

4. **Explore Results**
   - **Overview Tab**: See the generated brand extension name
   - **SWOT Analysis Tab**: Review strategic analysis
   - **Marketing Blueprint Tab**: Explore AIDA framework
   - **Target Persona Tab**: Understand your ideal customer

### Example Use Cases

#### Use Case 1: Food & Beverage Brand Extension
```
Brand: Coca-Cola
Strengths: Global recognition, happiness association, refreshment
Category: Healthy Snack Bars
```

#### Use Case 2: Tech Brand Expansion
```
Brand: Apple
Strengths: Innovation, premium quality, ecosystem integration
Category: Smart Home Appliances
```

#### Use Case 3: Fashion Brand Diversification
```
Brand: Nike
Strengths: Athletic performance, inspiration, innovation
Category: Wellness Technology
```

### API Usage

For programmatic access, use the REST API:

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "currentBrand": "Horlicks",
    "coreStrength": "Nutrition, trust, health malt",
    "targetCategory": "Energy Bars"
  }'
```

See [API Documentation](docs/API.md) for complete API reference.

---

## 📁 Project Structure

```
brandforge-ai/
├── app/                          # Next.js App Router directory
│   ├── api/                      # API routes
│   │   ├── generate/             # Brand extension generation
│   │   │   └── route.ts          # POST endpoint with LangChain
│   │   └── health/               # Health check endpoint
│   │       └── route.ts          # GET endpoint
│   ├── globals.css               # Global styles with Tailwind
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main dashboard UI
├── components/                   # Reusable React components
│   └── Header.tsx                # Header component
├── docs/                         # Documentation
│   └── API.md                    # API documentation
├── types/                        # TypeScript type definitions
│   └── brand-extension.ts        # Brand extension types
├── public/                       # Static assets
├── .env.example                  # Example environment variables
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

---

## 📚 API Documentation

### Endpoints

#### `POST /api/generate`
Generate a comprehensive brand extension strategy.

**Request Body:**
```json
{
  "currentBrand": "string",
  "coreStrength": "string",
  "targetCategory": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "brandExtensionName": "string",
    "swotAnalysis": { ... },
    "aidaFramework": { ... },
    "targetPersona": { ... }
  },
  "metadata": { ... }
}
```

For complete API documentation, see [docs/API.md](docs/API.md).

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Type check
npx tsc --noEmit
```

### Development Best Practices

1. **Type Safety**: Always define TypeScript interfaces for new features
2. **Component Structure**: Keep components small and focused
3. **Error Handling**: Implement comprehensive error boundaries
4. **Testing**: Write unit tests for critical business logic
5. **Documentation**: Update API docs when adding new endpoints

### Adding New Features

1. Create feature branch: `git checkout -b feature/your-feature`
2. Implement changes with TypeScript types
3. Test thoroughly in development
4. Update documentation
5. Submit pull request

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Configure environment variables
5. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables in Production

Ensure all required environment variables are set in your deployment platform:
- `OPENAI_API_KEY` or `WATSONX_API_KEY`
- `LLM_BASE_URL` (if using custom endpoint)
- `MODEL_NAME` (if using specific model)

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Update documentation
6. Submit a pull request

### Code Style

- Follow TypeScript best practices
- Use Prettier for formatting
- Follow ESLint rules
- Write meaningful commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **LangChain**: For the powerful AI orchestration framework
- **IBM**: For watsonx.ai and Granite models
- **OpenAI**: For GPT models
- **Vercel**: For hosting and deployment platform
- **Tailwind CSS**: For the utility-first CSS framework

---

## 📞 Support

- **Documentation**: [docs/API.md](docs/API.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/brandforge-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/brandforge-ai/discussions)

---

<div align="center">

**Built with ❤️ by the BrandForge AI Team**

[⬆ Back to Top](#-brandforge-ai)

</div>
