import type { Project } from '../types/portfolio';

export type DiagramNode = {
  id: string;
  label: string;
  column: number;
  description?: string;
  icon?: string;
};

export type DiagramEdge = {
  id: string;
  from: string;
  to: string;
  label?: string;
};

export type ModuleDetail = {
  nodeId: string;
  title: string;
  detail: string;
};

export type ProjectDiagram = {
  slug: string;
  summary: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  highlights: string[];
  modules: ModuleDetail[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const diagrams: Record<string, ProjectDiagram> = {
  'ai-ml-infrastructure-ci-cd-github-ghcr': {
    slug: 'ai-ml-infrastructure-ci-cd-github-ghcr',
    summary:
      'GPU-ready CI/CD pipeline that builds and verifies CUDA-enabled Ollama images before promoting them to GHCR for consumption by inference clusters.',
    nodes: [
      {
        id: 'repo',
        label: 'GitHub Monorepo',
        column: 0,
        description: 'CUDA base images, prompts, and smoke tests stored in a single repository.',
      },
      {
        id: 'actions',
        label: 'GitHub Actions',
        column: 1,
        description: 'Build matrix executing linting, SBOM generation, and vulnerability scans.',
      },
      {
        id: 'buildx',
        label: 'Docker Buildx',
        column: 2,
        description: 'Multi-arch builds with cached layers and deterministic image tags.',
      },
      {
        id: 'registry',
        label: 'GitHub Container Registry',
        column: 3,
        description: 'Houses promoted GPU images and provenance attestations.',
      },
      {
        id: 'gpu-runner',
        label: 'Self-hosted GPU Runner',
        column: 2,
        description: 'Runs CUDA smoke tests and performance benchmarks before release.',
      },
      {
        id: 'deploy',
        label: 'LLM Inference Cluster',
        column: 4,
        description: 'Kubernetes workloads pull versioned images and scale based on demand.',
      },
    ],
    edges: [
      { id: 'repo-actions', from: 'repo', to: 'actions', label: 'push triggers' },
      { id: 'actions-buildx', from: 'actions', to: 'buildx', label: 'pipeline orchestrates' },
      { id: 'actions-gpu', from: 'actions', to: 'gpu-runner', label: 'dispatch' },
      { id: 'buildx-registry', from: 'buildx', to: 'registry', label: 'publish image' },
      { id: 'gpu-registry', from: 'gpu-runner', to: 'registry', label: 'gate release' },
      { id: 'registry-deploy', from: 'registry', to: 'deploy', label: 'pulls signed images' },
    ],
    highlights: [
      'Automated security scanning and SBOM publishing for every image variant.',
      'Pre-release validation on real GPU hardware to catch driver/runtime drift.',
      'Deterministic tagging enables safe rollbacks and blue/green inference rollouts.',
    ],
    modules: [
      {
        nodeId: 'repo',
        title: 'GitHub Monorepo',
        detail: 'Stores Dockerfiles, Helm charts, and prompt assets while keeping version history aligned with infrastructure code.',
      },
      {
        nodeId: 'actions',
        title: 'GitHub Actions',
        detail: 'Matrix workflow drives linting, unit tests, caching, SBOM creation, and provenance attestations.',
      },
      {
        nodeId: 'gpu-runner',
        title: 'Self-hosted GPU Runner',
        detail: 'Executes CUDA smoke tests and ensures new models run within performance budgets before promotion.',
      },
      {
        nodeId: 'deploy',
        title: 'LLM Inference Cluster',
        detail: 'Kubernetes and Nomad workers pull signed artifacts from GHCR and roll them out via GitOps.',
      },
    ],
  },
  'web-application-ci-cd-flask-react-vite': {
    slug: 'web-application-ci-cd-flask-react-vite',
    summary:
      'End-to-end delivery pipeline for a Flask backend and React frontend with environment-aware deployments and quality gates.',
    nodes: [
      { id: 'frontend-repo', label: 'React/Vite Repo', column: 0, description: 'Source of UI assets and Playwright tests.' },
      { id: 'backend-repo', label: 'Flask API Repo', column: 0, description: 'Python APIs, Celery workers, and fixtures.' },
      { id: 'ci', label: 'CI Pipeline', column: 1, description: 'Runs linting, unit, and integration tests for both stacks.' },
      {
        id: 'artifact',
        label: 'Artifact Registry',
        column: 2,
        description: 'Stores versioned Docker images and build metadata.',
      },
      {
        id: 'staging',
        label: 'Staging Environment',
        column: 3,
        description: 'Automated smoke tests and manual QA sign-off.',
      },
      {
        id: 'production',
        label: 'Production Environment',
        column: 4,
        description: 'Blue/green deployment behind NGINX and feature flags.',
      },
    ],
    edges: [
      { id: 'frontend-ci', from: 'frontend-repo', to: 'ci', label: 'push triggers' },
      { id: 'backend-ci', from: 'backend-repo', to: 'ci', label: 'push triggers' },
      { id: 'ci-artifact', from: 'ci', to: 'artifact', label: 'publish images' },
      { id: 'artifact-staging', from: 'artifact', to: 'staging', label: 'deploy via Ansible' },
      { id: 'staging-production', from: 'staging', to: 'production', label: 'promote on approval' },
    ],
    highlights: [
      'Single pipeline enforces quality for both frontend and backend services with shared caching.',
      'Artifact registry keeps immutable releases and automatically promotes on staging sign-off.',
      'Deployments templated via Ansible for deterministic infrastructure provisioning.',
    ],
    modules: [
      {
        nodeId: 'ci',
        title: 'CI Pipeline',
        detail: 'Executes Pytest, Playwright, and contract testing before any deployment artifact is produced.',
      },
      {
        nodeId: 'artifact',
        title: 'Artifact Registry',
        detail: 'Harbors OCI images for both services alongside build metadata for traceability.',
      },
      {
        nodeId: 'production',
        title: 'Production Environment',
        detail: 'Blue/green slots behind a load balancer allow one-click rollback or canary releases.',
      },
    ],
  },
  'highly-available-elk-stack-monitoring-platform': {
    slug: 'highly-available-elk-stack-monitoring-platform',
    summary:
      'Observability platform unifying Beats, Heartbeat, and Elastic APM into a resilient multi-node Elasticsearch deployment.',
    nodes: [
      { id: 'beats', label: 'Filebeat / Metricbeat Agents', column: 0, description: 'Ship logs and metrics from workloads.' },
      { id: 'heartbeat', label: 'Heartbeat Probes', column: 0, description: 'Synthetic uptime checks and SLA enforcement.' },
      { id: 'ingest', label: 'Ingest Layer', column: 1, description: 'Logstash pipelines with ILM routing.' },
      {
        id: 'elasticsearch',
        label: 'Elasticsearch Cluster',
        column: 2,
        description: 'Hot/warm tiers with snapshot policies for durability.',
      },
      { id: 'kibana', label: 'Kibana Dashboards', column: 3, description: 'Operational and executive dashboards.' },
      { id: 'alerts', label: 'Alerting/Webhooks', column: 3, description: 'PagerDuty, Slack, and email notifications.' },
    ],
    edges: [
      { id: 'beats-ingest', from: 'beats', to: 'ingest', label: 'log + metric streams' },
      { id: 'heartbeat-ingest', from: 'heartbeat', to: 'ingest', label: 'uptime events' },
      { id: 'ingest-es', from: 'ingest', to: 'elasticsearch', label: 'structured index' },
      { id: 'es-kibana', from: 'elasticsearch', to: 'kibana', label: 'visualize indices' },
      { id: 'es-alerts', from: 'elasticsearch', to: 'alerts', label: 'watcher rules' },
    ],
    highlights: [
      'Hot/warm Elasticsearch tiers keep critical data fast while archiving long-term history.',
      'Synthetic monitoring with Heartbeat feeds into SLAs and automated incident workflows.',
      'Centralized Logstash pipelines enforce schema and redact sensitive payloads before indexing.',
    ],
    modules: [
      {
        nodeId: 'ingest',
        title: 'Ingest Layer',
        detail: 'Logstash and Kafka buffers absorb burst traffic and apply enrichment before storage.',
      },
      {
        nodeId: 'elasticsearch',
        title: 'Elasticsearch Cluster',
        detail: 'Runs with dedicated master nodes, snapshot lifecycle policies, and cross-cluster replication.',
      },
      {
        nodeId: 'alerts',
        title: 'Alerting/Webhooks',
        detail: 'Integrates with PagerDuty and Slack to push actionable incidents with runbook links.',
      },
    ],
  },
  'automated-kubernetes-cluster-provisioning': {
    slug: 'automated-kubernetes-cluster-provisioning',
    summary:
      'Infrastructure-as-code playbooks that bootstrap HA Kubernetes clusters across mixed operating systems.',
    nodes: [
      { id: 'inventory', label: 'Dynamic Inventory', column: 0, description: 'Discovery of Linux and Windows hosts.' },
      { id: 'ansible', label: 'Ansible Playbooks', column: 1, description: 'Templated kubeadm, containerd, and CNI installs.' },
      {
        id: 'control-plane',
        label: 'HA Control Plane',
        column: 2,
        description: 'etcd + API servers with keepalived.',
      },
      {
        id: 'workers',
        label: 'Worker Pools',
        column: 2,
        description: 'Linux + Windows worker groups joined via kubelet.',
      },
      {
        id: 'ingress',
        label: 'Ingress + Add-ons',
        column: 3,
        description: 'NGINX ingress, metrics-server, and CSI drivers.',
      },
      {
        id: 'gitops',
        label: 'GitOps Config',
        column: 4,
        description: 'ArgoCD bootstrap for continuous delivery.',
      },
    ],
    edges: [
      { id: 'inventory-ansible', from: 'inventory', to: 'ansible', label: 'targets discovered' },
      { id: 'ansible-control', from: 'ansible', to: 'control-plane', label: 'provision' },
      { id: 'ansible-workers', from: 'ansible', to: 'workers', label: 'join cluster' },
      { id: 'ansible-ingress', from: 'ansible', to: 'ingress', label: 'deploy add-ons' },
      { id: 'ingress-gitops', from: 'ingress', to: 'gitops', label: 'bootstrap ArgoCD' },
    ],
    highlights: [
      'Automated bootstrap handles HA control planes with integrated load balancing.',
      'Mixed OS worker provisioning ensures Windows workloads are first-class citizens.',
      'GitOps layer keeps day-two operations declarative and auditable.',
    ],
    modules: [
      {
        nodeId: 'ansible',
        title: 'Ansible Playbooks',
        detail: 'Idempotent roles configure container runtimes, kubeadm, and cloud integration for each host.',
      },
      {
        nodeId: 'ingress',
        title: 'Ingress + Add-ons',
        detail: 'Deploys NGINX ingress, metrics-server, autoscalers, and CSI drivers out-of-the-box.',
      },
      {
        nodeId: 'gitops',
        title: 'GitOps Config',
        detail: 'ArgoCD install seeds application sets for platform services and team namespaces.',
      },
    ],
  },
  'gitops-integration-with-argocd-and-helm-charts': {
    slug: 'gitops-integration-with-argocd-and-helm-charts',
    summary:
      'Dual-repo GitLab workflow where the data-processor pipeline publishes images, bumps Helm chart versions, and drives ArgoCD to deploy PGO PostgreSQL, RabbitMQ, and Airflow on Kubernetes.',
    nodes: [
      {
        id: 'app-repo',
        label: 'Data Processor Repo',
        column: 0,
        description: 'GitLab repository for the Python data processor service.',
        icon: 'GL',
      },
      {
        id: 'app-ci',
        label: 'Data Processor CI',
        column: 1,
        description: 'GitLab CI pipeline building, testing, and scanning the application.',
        icon: 'CI',
      },
      {
        id: 'registry',
        label: 'Container Registry',
        column: 2,
        description: 'GitLab registry storing signed OCI images for the data processor.',
        icon: 'CR',
      },
      {
        id: 'charts-repo',
        label: 'Platform Charts Repo',
        column: 3,
        description: 'GitLab repo with Helm charts for PGO PostgreSQL, RabbitMQ, and Airflow.',
        icon: 'GL',
      },
      {
        id: 'chart-automation',
        label: 'Chart Automation CI',
        column: 4,
        description: 'Pipeline updates image tags, lints charts, and merges into main.',
        icon: 'CI',
      },
      {
        id: 'argocd',
        label: 'ArgoCD Control Plane',
        column: 5,
        description: 'App-of-apps orchestrator watching Helm repo revisions.',
        icon: 'AG',
      },
      {
        id: 'cluster',
        label: 'Kubernetes Cluster',
        column: 6,
        description: 'Production environment reconciled by ArgoCD.',
        icon: 'K8',
      },
      {
        id: 'pgo',
        label: 'PGO PostgreSQL Operator',
        column: 7,
        description: 'Manages HA PostgreSQL clusters and scheduled backups.',
        icon: 'DB',
      },
      {
        id: 'rabbitmq',
        label: 'RabbitMQ Message Bus',
        column: 7,
        description: 'Provides reliable messaging for the data processor stack.',
        icon: 'MQ',
      },
      {
        id: 'airflow',
        label: 'Airflow Data Pipelines',
        column: 7,
        description: 'DAGs consume the data processor image to run ETL workloads.',
        icon: 'AF',
      },
    ],
    edges: [
      { id: 'apprepo-ci', from: 'app-repo', to: 'app-ci', label: 'push triggers' },
      { id: 'ci-registry', from: 'app-ci', to: 'registry', label: 'publish image' },
      { id: 'ci-charts', from: 'app-ci', to: 'charts-repo', label: 'open merge request' },
      { id: 'charts-automation', from: 'charts-repo', to: 'chart-automation', label: 'MR merged' },
      { id: 'registry-automation', from: 'registry', to: 'chart-automation', label: 'new tag metadata' },
      { id: 'automation-argocd', from: 'chart-automation', to: 'argocd', label: 'webhook sync' },
      { id: 'argocd-cluster', from: 'argocd', to: 'cluster', label: 'reconcile' },
      { id: 'cluster-pgo', from: 'cluster', to: 'pgo', label: 'manage release' },
      { id: 'cluster-rabbitmq', from: 'cluster', to: 'rabbitmq', label: 'manage release' },
      { id: 'cluster-airflow', from: 'cluster', to: 'airflow', label: 'manage release' },
    ],
    highlights: [
      'Data processor repo pipelines publish immutable images and announce the tag to the chart repository automatically.',
      'A dedicated chart automation pipeline updates Helm values, tests manifests, and informs ArgoCD with a webhook.',
      'ArgoCD enforces GitOps for PGO PostgreSQL, RabbitMQ, and Airflow, keeping cluster state in lockstep with Git.',
    ],
    modules: [
      {
        nodeId: 'app-ci',
        title: 'Data Processor CI',
        detail: 'Builds, scans, and signs OCI images, then opens merge requests against the platform chart repository.',
      },
      {
        nodeId: 'chart-automation',
        title: 'Chart Automation CI',
        detail: 'Bumps chart values with the new image tag, runs chart-testing, and notifies ArgoCD once merged.',
      },
      {
        nodeId: 'argocd',
        title: 'ArgoCD Control Plane',
        detail: 'Syncs environment applications and drives progressive rollout across the Kubernetes cluster.',
      },
    ],
  },
  'bare-metal-driver-development-for-stm32f4': {
    slug: 'bare-metal-driver-development-for-stm32f4',
    summary:
      'Embedded firmware stack delivering reusable STM32F4 drivers with hardware abstraction and simulation harnesses.',
    nodes: [
      { id: 'hal', label: 'Hardware Abstraction Layer', column: 0, description: 'Board support and CMSIS configuration.' },
      { id: 'drivers', label: 'Peripheral Drivers', column: 1, description: 'SPI, I2C, USART, GPIO implementations.' },
      { id: 'middleware', label: 'Middleware Services', column: 2, description: 'Scheduling, DMA helpers, and diagnostics.' },
      { id: 'applications', label: 'Test Applications', column: 3, description: 'Loopback, sensor integrations, and demo apps.' },
      { id: 'tooling', label: 'Simulation Tooling', column: 2, description: 'Unit tests, stubs, and CI harness.' },
    ],
    edges: [
      { id: 'hal-drivers', from: 'hal', to: 'drivers', label: 'board configs' },
      { id: 'drivers-middleware', from: 'drivers', to: 'middleware', label: 'interface contracts' },
      { id: 'middleware-apps', from: 'middleware', to: 'applications', label: 'services exposed' },
      { id: 'drivers-tooling', from: 'drivers', to: 'tooling', label: 'unit tests' },
      { id: 'tooling-apps', from: 'tooling', to: 'applications', label: 'HIL validation' },
    ],
    highlights: [
      'Portable HAL ensures the drivers run across evaluation boards without changes.',
      'Simulation harness detects regressions with host-based tests before flashing hardware.',
      'Drivers documented with timing diagrams and integration recipes.',
    ],
    modules: [
      {
        nodeId: 'drivers',
        title: 'Peripheral Drivers',
        detail: 'Implements SPI/I2C/USART with interrupt-driven options and DMA acceleration.',
      },
      {
        nodeId: 'tooling',
        title: 'Simulation Tooling',
        detail: 'C++ harness simulates peripherals and feeds CI results back into Git history.',
      },
      {
        nodeId: 'applications',
        title: 'Test Applications',
        detail: 'Reference apps demonstrate sensor bring-up, communication stacks, and bootloader integration.',
      },
    ],
  },
  'rc-car-fota-platform': {
    slug: 'rc-car-fota-platform',
    summary:
      'FreeRTOS-based dual-MCU architecture enabling over-the-air firmware updates and remote telemetry for an RC vehicle.',
    nodes: [
      { id: 'control-mcu', label: 'Control MCU', column: 0, description: 'Runs FreeRTOS tasks for motor control and sensors.' },
      { id: 'connectivity-mcu', label: 'Connectivity MCU', column: 1, description: 'Wi-Fi + bootloader orchestrating FOTA downloads.' },
      { id: 'ota-service', label: 'OTA Service', column: 2, description: 'Cloud endpoint serving signed firmware bundles.' },
      { id: 'telemetry', label: 'Telemetry Stream', column: 2, description: 'MQTT topics publishing health metrics.' },
      { id: 'mobile-app', label: 'Mobile App / Dashboard', column: 3, description: 'User interface for commands and updates.' },
      { id: 'safety', label: 'Safety Watchdog', column: 1, description: 'Fallback firmware slots and health checks.' },
    ],
    edges: [
      { id: 'ota-connect', from: 'ota-service', to: 'connectivity-mcu', label: 'download signed firmware' },
      { id: 'connect-control', from: 'connectivity-mcu', to: 'control-mcu', label: 'flash new image' },
      { id: 'control-telemetry', from: 'control-mcu', to: 'telemetry', label: 'publish metrics' },
      { id: 'telemetry-mobile', from: 'telemetry', to: 'mobile-app', label: 'live dashboards' },
      { id: 'mobile-ota', from: 'mobile-app', to: 'ota-service', label: 'trigger update' },
      { id: 'safety-control', from: 'safety', to: 'control-mcu', label: 'health checks' },
      { id: 'connect-safety', from: 'connectivity-mcu', to: 'safety', label: 'report status' },
    ],
    highlights: [
      'Dual-MCU split keeps control loops deterministic while networking handles OTA asynchronously.',
      'Signed firmware updates with rollback slots protect against corrupt deployments.',
      'Telemetry and command channels use MQTT topics secured with mutual TLS.',
    ],
    modules: [
      {
        nodeId: 'connectivity-mcu',
        title: 'Connectivity MCU',
        detail: 'Handles Wi-Fi comms, OTA download integrity checks, and bootloader coordination.',
      },
      {
        nodeId: 'control-mcu',
        title: 'Control MCU',
        detail: 'Runs FreeRTOS tasks for PID control, obstacle avoidance, and sensor fusion.',
      },
      {
        nodeId: 'mobile-app',
        title: 'Mobile App / Dashboard',
        detail: 'Provides manual controls, telemetry charts, and firmware-management UI.',
      },
    ],
  },
};

export const getProjectDiagram = (project: Project): ProjectDiagram | null => {
  const slug = slugify(project.name);
  return diagrams[slug] ?? null;
};

export type { ProjectDiagram as DiagramDefinition };
