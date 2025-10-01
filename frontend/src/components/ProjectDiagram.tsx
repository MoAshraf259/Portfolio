import { useMemo } from 'react';
import type { DiagramEdge, DiagramNode, ProjectDiagram } from '../content/projectDiagrams';

const NODE_WIDTH = 190;
const NODE_HEIGHT = 108;
const COLUMN_SPACING = 320;
const ROW_SPACING = 190;
const CANVAS_PADDING = 70;

const cubicPoint = (t: number, p0: number, p1: number, p2: number, p3: number) =>
  (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3 * p3;
type PositionedNode = DiagramNode & {
  x: number;
  y: number;
};

type DiagramProps = {
  diagram: ProjectDiagram;
};

const groupNodesByColumn = (nodes: DiagramNode[]): Map<number, DiagramNode[]> => {
  const columns = new Map<number, DiagramNode[]>();
  for (const node of nodes) {
    const columnNodes = columns.get(node.column) ?? [];
    columnNodes.push(node);
    columns.set(node.column, columnNodes);
  }
  for (const column of columns.values()) {
    column.sort((a, b) => a.label.localeCompare(b.label));
  }
  return columns;
};

const positionNodes = (nodes: DiagramNode[]): PositionedNode[] => {
  const columns = groupNodesByColumn(nodes);
  const positioned: PositionedNode[] = [];

  const sortedColumns = Array.from(columns.keys()).sort((a, b) => a - b);

  for (const columnIndex of sortedColumns) {
    const columnNodes = columns.get(columnIndex)!;
    columnNodes.forEach((node, index) => {
      positioned.push({
        ...node,
        x: CANVAS_PADDING + columnIndex * COLUMN_SPACING,
        y: CANVAS_PADDING + index * ROW_SPACING,
      });
    });
  }

  return positioned;
};

const toPositionMap = (nodes: PositionedNode[]): Map<string, PositionedNode> => {
  const map = new Map<string, PositionedNode>();
  nodes.forEach((node) => map.set(node.id, node));
  return map;
};

const renderEdges = (edges: DiagramEdge[], positions: Map<string, PositionedNode>) =>
  edges.map((edge) => {
    const from = positions.get(edge.from);
    const to = positions.get(edge.to);

    if (!from || !to) {
      return null;
    }

    const x1 = from.x + NODE_WIDTH;
    const y1 = from.y + NODE_HEIGHT / 2;
    const x2 = to.x;
    const y2 = to.y + NODE_HEIGHT / 2;
    const midX = (x1 + x2) / 2;

    const pointX = cubicPoint(0.5, x1, midX, midX, x2);
    const pointY = cubicPoint(0.5, y1, y1, y2, y2);

    const labelWidth = Math.max((edge.label?.length ?? 0) * 7 + 48, 140);
    const labelHeight = 36;
    const labelRadius = labelHeight / 2;
    const labelCenterY = pointY;

    return (
      <g key={edge.id} className="project-diagram__edge">
        <path d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`} markerEnd="url(#project-diagram-arrow)" />
        {edge.label ? (
          <g className="project-diagram__edge-label-group" transform={`translate(${pointX}, ${labelCenterY})`}>
            <rect
              className="project-diagram__edge-label-bg"
              x={-labelWidth / 2}
              y={-labelHeight / 2}
              width={labelWidth}
              height={labelHeight}
              rx={labelRadius}
            />
            <text className="project-diagram__edge-label" textAnchor="middle" dominantBaseline="middle">
              {edge.label}
            </text>
          </g>
        ) : null}
      </g>
    );
  });

export function ProjectDiagram({ diagram }: DiagramProps) {
  const positionedNodes = useMemo(() => positionNodes(diagram.nodes), [diagram.nodes]);
  const positionMap = useMemo(() => toPositionMap(positionedNodes), [positionedNodes]);

  const maxColumn = positionedNodes.reduce((max, node) => Math.max(max, node.column), 0);
  const columnCounts = new Map<number, number>();
  positionedNodes.forEach((node) => {
    columnCounts.set(node.column, (columnCounts.get(node.column) ?? 0) + 1);
  });
  const rowCounts = Array.from(columnCounts.values());
  const maxRows = rowCounts.length > 0 ? Math.max(...rowCounts) : 1;

  const width = CANVAS_PADDING * 2 + maxColumn * COLUMN_SPACING + NODE_WIDTH;
  const height = CANVAS_PADDING * 2 + (maxRows - 1) * ROW_SPACING + NODE_HEIGHT;

  return (
    <div className="project-diagram">
      <div className="project-diagram__stage" style={{ width, height }}>
        <svg className="project-diagram__canvas" width={width} height={height} role="img" aria-label="Project system diagram">
          <defs>
            <marker
              id="project-diagram-arrow"
              markerWidth="16"
              markerHeight="16"
              refX="14"
              refY="8"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M 0 0 L 16 8 L 0 16 z" />
            </marker>
          </defs>
          {renderEdges(diagram.edges, positionMap)}
        </svg>
        {positionedNodes.map((node) => {
          const bodyClassName = node.icon
            ? 'project-diagram__node-body'
            : 'project-diagram__node-body project-diagram__node-body--solo';
          return (
          <div className="project-diagram__node" key={node.id} style={{ left: node.x, top: node.y }}>
            <div className={bodyClassName}>
              {node.icon && <span className="project-diagram__node-icon">{node.icon}</span>}
              <div className="project-diagram__node-content">
                <h4>{node.label}</h4>
                {node.description && <p>{node.description}</p>}
              </div>
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}
