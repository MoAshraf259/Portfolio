"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrismaClient = void 0;
exports.ensureSchema = ensureSchema;
exports.seed = seed;
require("dotenv/config");
const client_1 = require("@prisma/client");
const TABLE_CREATION_STATEMENTS = [
    `CREATE TABLE IF NOT EXISTS "Profile" (
      "id" INTEGER NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "headline" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT,
      "location" TEXT NOT NULL,
      "summary" TEXT NOT NULL,
      "linkedin" TEXT,
      "github" TEXT,
      "website" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS "Experience" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "role" TEXT NOT NULL,
      "company" TEXT NOT NULL,
      "location" TEXT,
      "employmentType" TEXT,
      "startDate" DATETIME NOT NULL,
      "endDate" DATETIME,
      "summary" TEXT,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS "ExperienceHighlight" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "description" TEXT NOT NULL,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "experienceId" INTEGER NOT NULL REFERENCES "Experience"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS "Education" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "institution" TEXT NOT NULL,
      "degree" TEXT NOT NULL,
      "fieldOfStudy" TEXT,
      "location" TEXT,
      "startDate" DATETIME,
      "endDate" DATETIME,
      "details" TEXT,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS "Project" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "impact" TEXT,
      "type" TEXT NOT NULL DEFAULT 'OTHER',
      "githubUrl" TEXT,
      "externalUrl" TEXT,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
    `CREATE TABLE IF NOT EXISTS "ProjectTag" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "label" TEXT NOT NULL,
      "projectId" INTEGER NOT NULL REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS "SkillCategory" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL,
      "sortOrder" INTEGER NOT NULL DEFAULT 0
    );`,
    `CREATE TABLE IF NOT EXISTS "Skill" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL,
      "description" TEXT,
      "level" TEXT,
      "categoryId" INTEGER NOT NULL REFERENCES "SkillCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE
    );`,
    `CREATE TABLE IF NOT EXISTS "Certification" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL,
      "issuer" TEXT NOT NULL,
      "issueDate" DATETIME,
      "credentialUrl" TEXT,
      "sortOrder" INTEGER NOT NULL DEFAULT 0
    );`,
    `CREATE TABLE IF NOT EXISTS "Course" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "name" TEXT NOT NULL,
      "provider" TEXT NOT NULL,
      "link" TEXT,
      "sortOrder" INTEGER NOT NULL DEFAULT 0
    );`,
    `CREATE TABLE IF NOT EXISTS "ContactMessage" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "fullName" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "subject" TEXT,
      "message" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`,
];
const createPrismaClient = () => new client_1.PrismaClient();
exports.createPrismaClient = createPrismaClient;
async function ensureSchema(prisma) {
    await prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON;');
    for (const statement of TABLE_CREATION_STATEMENTS) {
        await prisma.$executeRawUnsafe(statement);
    }
}
async function seed(prismaInstance) {
    const prisma = prismaInstance ?? (0, exports.createPrismaClient)();
    const shouldDisconnect = !prismaInstance;
    await ensureSchema(prisma);
    await prisma.projectTag.deleteMany();
    await prisma.project.deleteMany();
    await prisma.experienceHighlight.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.education.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.skillCategory.deleteMany();
    await prisma.certification.deleteMany();
    await prisma.course.deleteMany();
    await prisma.contactMessage.deleteMany();
    await prisma.profile.upsert({
        where: { id: 1 },
        update: {
            name: 'Mohamed Ashraf Shaaban Aata',
            headline: 'DevOps & Embedded Software Engineer',
            email: 'mohamed.ashraf13998@gmail.com',
            phone: '01112233567',
            location: 'Cairo, Egypt',
            summary: 'DevOps & Embedded Software Engineer blending cloud-native automation with firmware fundamentals. Hands-on with AWS, Kubernetes, Terraform, Ansible, and CI/CD pipelines that emphasize reliability and measurable impact.',
            linkedin: 'https://www.linkedin.com/in/mohamed-ashraf-164749243/',
            github: 'https://github.com/MoAshraf259',
        },
        create: {
            id: 1,
            name: 'Mohamed Ashraf Shaaban Aata',
            headline: 'DevOps & Embedded Software Engineer',
            email: 'mohamed.ashraf13998@gmail.com',
            phone: '01112233567',
            location: 'Cairo, Egypt',
            summary: 'DevOps & Embedded Software Engineer blending cloud-native automation with firmware fundamentals. Hands-on with AWS, Kubernetes, Terraform, Ansible, and CI/CD pipelines that emphasize reliability and measurable impact.',
            linkedin: 'https://www.linkedin.com/in/mohamed-ashraf-164749243/',
            github: 'https://github.com/MoAshraf259',
        },
    });
    const experiences = [
        {
            role: 'DevOps Engineer',
            company: 'SEITech Solutions',
            location: 'Giza, Egypt',
            employmentType: 'Full-time',
            startDate: new Date('2023-04-01'),
            endDate: null,
            highlights: [
                'Designed CI/CD pipelines with GitHub Actions, GitLab, and Jenkins to automate image builds and deployments.',
                'Containerized GPU-enabled LLM workloads (Ollama) with CUDA bases, smoke tests, and reproducible tagging.',
                'Implemented production-grade Flask + React CI/CD with caching, testing, image publishing, and environment-specific deploys.',
                'Automated infrastructure provisioning using Terraform and Ansible, reducing manual operations by ~60%.',
                'Delivered GitOps workflows via ArgoCD for Airflow, RabbitMQ, and PostgreSQL operators.',
            ],
        },
        {
            role: 'Embedded Software Engineer (Automotive)',
            company: 'SEITech Solutions',
            location: 'Giza, Egypt',
            employmentType: 'Full-time',
            startDate: new Date('2021-10-01'),
            endDate: new Date('2023-03-31'),
            highlights: [
                'Developed OBD-II and UDS diagnostic protocols tailored for Daimler vehicles.',
                'Integrated AUTOSAR diagnostic stack using Vector tools with comprehensive CPPU unit testing.',
                'Engineered real-time embedded systems leveraging simulation-driven debugging.',
                'Built FlashTest & RamTest modules alongside a configurable FOTA solution for product lines.',
            ],
        },
        {
            role: 'Mechanical Site Engineer',
            company: 'Crown Group Co.',
            location: 'Suez, Egypt',
            employmentType: 'Contract',
            startDate: new Date('2019-06-01'),
            endDate: new Date('2020-12-31'),
            highlights: [
                'Led construction of industrial thickener and conveyor systems for Suez Steel Company.',
                'Coordinated cross-disciplinary teams to deliver mechanical installations on schedule.',
            ],
        },
    ];
    for (const [index, experience] of experiences.entries()) {
        await prisma.experience.create({
            data: {
                role: experience.role,
                company: experience.company,
                location: experience.location,
                employmentType: experience.employmentType,
                startDate: experience.startDate,
                endDate: experience.endDate,
                sortOrder: index + 1,
                highlights: {
                    create: experience.highlights.map((description, highlightIndex) => ({
                        description,
                        sortOrder: highlightIndex + 1,
                    })),
                },
            },
        });
    }
    const educationEntries = [
        {
            institution: 'October 6 University',
            degree: 'Bachelor of Engineering',
            fieldOfStudy: 'Mechatronics / Electronics',
            location: 'Giza, Egypt',
            startDate: new Date('2016-09-01'),
            endDate: new Date('2021-07-01'),
            details: 'Graduated with a focus on embedded systems, automation, and controls.',
        },
        {
            institution: 'Information Technology Institute (ITI)',
            degree: 'Embedded Systems Program',
            fieldOfStudy: 'Embedded Systems',
            location: 'New Capital, Egypt',
            startDate: new Date('2022-02-01'),
            endDate: new Date('2022-05-01'),
            details: 'Intensive 3-month program covering ARM microcontrollers, RTOS, and driver development.',
        },
    ];
    for (const [index, entry] of educationEntries.entries()) {
        await prisma.education.create({
            data: {
                ...entry,
                sortOrder: index + 1,
            },
        });
    }
    const projects = [
        {
            name: 'AI/ML Infrastructure & CI/CD (GitHub + GHCR)',
            description: 'Automated Buildx pipelines to ship GPU-accelerated Ollama images with pre-baked LLM models.',
            impact: 'Delivered deterministic Docker image tagging, GPU availability smoke tests, and GHCR publishing for rapid experimentation.',
            type: client_1.ProjectType.DEVOPS,
            githubUrl: 'https://github.com/MoAshraf259',
            tags: ['GitHub Actions', 'Docker', 'CUDA', 'LLM', 'GHCR'],
        },
        {
            name: 'Web Application CI/CD (Flask + React/Vite)',
            description: 'Designed multi-stage CI/CD for a Flask backend and React frontend with environment-aware deploys.',
            impact: 'Enabled linting, testing, container publishing, and automated staging/production rollouts via Ansible and ArgoCD.',
            type: client_1.ProjectType.DEVOPS,
            githubUrl: 'https://github.com/MoAshraf259',
            tags: ['Flask', 'React', 'GitHub Actions', 'ArgoCD', 'Ansible'],
        },
        {
            name: 'Highly Available ELK Stack Monitoring Platform',
            description: 'Provisioned Elasticsearch cluster with Beats agents, Heartbeat checks, and secure ingress for observability.',
            impact: 'Delivered actionable telemetry with ILM policies, APM integration, and Kibana dashboards across hybrid environments.',
            type: client_1.ProjectType.DEVOPS,
            githubUrl: 'https://github.com/MoAshraf259',
            tags: ['Elasticsearch', 'Kibana', 'Prometheus', 'Grafana', 'ILM'],
        },
        {
            name: 'Automated Kubernetes Cluster Provisioning',
            description: 'Authored Ansible playbooks to bootstrap HA Kubernetes clusters across Linux and Windows worker nodes.',
            impact: 'Implemented load-balanced control planes, ingress routing, and streamlined day-2 operations.',
            type: client_1.ProjectType.DEVOPS,
            githubUrl: 'https://github.com/MoAshraf259',
            tags: ['Kubernetes', 'Ansible', 'HA', 'Ingress', 'Automation'],
        },
        {
            name: 'GitOps Integration with ArgoCD & Helm Charts',
            description: 'Orchestrated PGO PostgreSQL operator, RabbitMQ, and Airflow deployments with custom Helm charts.',
            impact: 'Linked GitLab CI/CD with ArgoCD for hands-free synchronization and targeted rollouts.',
            type: client_1.ProjectType.DEVOPS,
            githubUrl: 'https://github.com/MoAshraf259',
            tags: ['ArgoCD', 'Helm', 'GitOps', 'PostgreSQL', 'Airflow'],
        },
        {
            name: 'Bare-metal Driver Development for STM32F4',
            description: 'Implemented SPI, I2C, and USART drivers with accompanying test applications for STM32F446.',
            impact: 'Delivered reusable peripheral drivers and documentation for rapid embedded prototyping.',
            type: client_1.ProjectType.EMBEDDED,
            githubUrl: 'https://github.com/MoAshraf259/STM32F446_MoShaaban',
            tags: ['STM32', 'Embedded C', 'Drivers', 'SPI', 'I2C'],
        },
        {
            name: 'RC Car FOTA Platform',
            description: 'Built a FreeRTOS-based RC car with OTA firmware updates via dual-MCU architecture.',
            impact: 'Enabled remote firmware delivery using Wi-Fi, UART bootloading, and obstacle-avoidance controls.',
            type: client_1.ProjectType.EMBEDDED,
            githubUrl: 'https://github.com/MoAshraf259',
            tags: ['FreeRTOS', 'FOTA', 'STM32', 'Embedded', 'Automation'],
        },
    ];
    for (const [index, project] of projects.entries()) {
        await prisma.project.create({
            data: {
                name: project.name,
                description: project.description,
                impact: project.impact,
                type: project.type,
                githubUrl: project.githubUrl,
                externalUrl: project.externalUrl ?? null,
                sortOrder: index + 1,
                tags: {
                    create: project.tags.map((label) => ({ label })),
                },
            },
        });
    }
    const skillCategories = [
        {
            name: 'Cloud & Containers',
            skills: [
                'AWS (EC2, S3, IAM, VPC)',
                'Docker & Containerd',
                'Kubernetes (EKS)',
                'Helm & Helmfile',
                'NGINX Ingress Controller',
            ],
        },
        {
            name: 'DevOps & IaC',
            skills: [
                'GitHub Actions / GitLab CI/CD / Jenkins',
                'ArgoCD & GitOps Workflows',
                'Terraform & Terragrunt',
                'Ansible Automation',
                'Systemd & NGINX deployments',
            ],
        },
        {
            name: 'Observability',
            skills: [
                'ELK Stack (Elasticsearch, Kibana, Beats)',
                'Prometheus & Grafana',
                'Elastic APM & Heartbeat',
                'Logging Pipelines & ILM Policies',
            ],
        },
        {
            name: 'Languages',
            skills: ['Python', 'C / C++', 'JavaScript / Node.js'],
        },
        {
            name: 'Embedded Systems',
            skills: [
                'ARM Cortex-M (STM32)',
                'FreeRTOS',
                'Bootstrap loaders & FOTA',
                'Diagnostics (OBD-II / UDS)',
            ],
        },
        {
            name: 'Communication Protocols',
            skills: ['UART', 'SPI', 'I2C', 'CAN', 'Ethernet'],
        },
    ];
    for (const [index, category] of skillCategories.entries()) {
        await prisma.skillCategory.create({
            data: {
                name: category.name,
                sortOrder: index + 1,
                skills: {
                    create: category.skills.map((skill) => ({ name: skill })),
                },
            },
        });
    }
    const certifications = [
        {
            name: 'Kubernetes Administrator (CKA) Preparation',
            issuer: 'KodeKloud',
            issueDate: new Date('2024-01-01'),
            credentialUrl: 'https://kodekloud.com/',
        },
        {
            name: 'Docker Deep Dive',
            issuer: 'KodeKloud',
            issueDate: new Date('2023-10-01'),
            credentialUrl: 'https://kodekloud.com/',
        },
        {
            name: 'Ultimate AWS Certified Cloud Practitioner (CLF-C02)',
            issuer: 'Udemy',
            issueDate: new Date('2023-08-01'),
            credentialUrl: 'https://www.udemy.com/',
        },
    ];
    for (const [index, cert] of certifications.entries()) {
        await prisma.certification.create({
            data: {
                ...cert,
                sortOrder: index + 1,
            },
        });
    }
    const courses = [
        {
            name: 'DevOps and Automation',
            provider: 'Udemy',
            link: 'https://www.udemy.com/',
        },
        {
            name: 'Master RTOS: Hands-on FreeRTOS and STM32Fx',
            provider: 'Udemy',
            link: 'https://www.udemy.com/',
        },
        {
            name: 'Mastering Microcontroller: Timers, PWM, CAN, Low Power',
            provider: 'Udemy',
            link: 'https://www.udemy.com/',
        },
        {
            name: 'Embedded Systems Programming on ARM Cortex-M3/M4',
            provider: 'Udemy',
            link: 'https://www.udemy.com/',
        },
    ];
    for (const [index, course] of courses.entries()) {
        await prisma.course.create({
            data: {
                ...course,
                sortOrder: index + 1,
            },
        });
    }
    if (shouldDisconnect) {
        await prisma.$disconnect();
    }
}
if (require.main === module) {
    seed()
        .then(() => {
        console.log('Database seeded successfully.');
    })
        .catch((error) => {
        console.error('Failed to seed database', error);
        process.exit(1);
    });
}
