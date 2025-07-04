export const projects = [
  {
    id: 1,
    title: "GenAI Hub",
    description: "A consolidated hub of generative AI POCs including a stock analyzer, resume ATS checker, multilingual assistant, YouTube summarizer, and Telegram bot.",
    image: "placeholder.svg",
    demo: "#",
    github: "#",
    status: "in-progress",
    categories: ["genai", "llm"],
    stack: ["LangChain", "Ollama", "Vector DBs", "LlamaIndex", "Python"],
    impact: "Showcases multiple real-world applications of LLMs in a unified interface."
  },
  {
    id: 2,
    title: "NER System with CI/CD",
    description: "A named entity recognition project using BERT and PyTorch, deployed on GCP with CircleCI for CI/CD and GCS for storage.",
    image: "placeholder.svg",
    demo: "#",
    github: "#",
    status: "in-progress",
    categories: ["nlp"],
    stack: ["PyTorch", "BERT", "GCP", "CircleCI", "GCS"],
    impact: "Streamlined deployment with automated testing for entity recognition models."
  },
  {
    id: 3,
    title: "Rule Engine & Prompt Management",
    description: "Streamlit-based interface to create, validate, and manage rules and prompts for multi-agent LLM applications, with version control and admin testing.",
    image: "placeholder.svg",
    demo: "#",
    github: "#",
    status: "in-progress",
    categories: ["Agentic AI", "llmops"],
    stack: ["Streamlit", "LangChain", "LangGraph", "Jinja", "Python"],
    impact: "Enabled real-time prompt tuning with governance and rollback."
  },
  {
    id: 4,
    title: "Resume Bot & ATS Checker",
    description: "LLM-powered bot that checks resumes against ATS standards and provides feedback, built as part of GenAI Hub.",
    image: "placeholder.svg",
    demo: "#",
    github: "#",
    status: "in-progress",
    categories: ["llm", "Agentic AI"],
    stack: ["LangChain", "LLMs", "Streamlit"],
    impact: "Helped 500+ users optimize resumes for top-tier ATS systems."
  },
  {
    id: 5,
    title: "LLMBlocks Framework",
    description: "Modular and scalable LLM utility library supporting reusable components and runnables, currently supporting RAG workflows.",
    image: "placeholder.svg",
    demo: "#",
    github: "#",
    status: "in-progress",
    categories: ["llm", "Agentic AI", "genai"],
    stack: ["LangChain", "Python", "uv", "RAG"],
    impact: "Accelerated custom GenAI app development via modular utilities."
  },
  {
    id: 6,
    title: "GenAI QA Automation Platform",
    description: "An end-to-end AI-powered QA lifecycle platform deployed at scale, spanning UI, API, and data validation automation.",
    image: "placeholder.svg",
    demo: "#",
    github: "#",
    status: "in-progress",
    categories: ["Agentic AI", "llm"],
    stack: ["LangGraph", "FastAPI", "LangChain", "LLMs"],
    impact: "Adopted across 3 enterprises; 850+ API test cases auto-generated in minutes."
  },
  {
    id: 7,
    title: "Data Validation Tool",
    description: "One-click solution to compare raw and transformed data files in Azure blob storage, designed to handle lakh+ records with reporting.",
    image: "placeholder.svg",
    demo: "#",
    github: "#",
    status: "in-progress",
    categories: ["data", "engineering"],
    stack: ["PySpark", "Azure Databricks", "Azure Blob Storage"],
    impact: "Slashed manual QA effort and improved ETL reliability in production."
  }
];
