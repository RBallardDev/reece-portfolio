// Map Layout Helpers
// Deterministic layout algorithm for the relationship graph

import { projects, experiences, skills, edges } from "@/data/engineering";

export type NodeKind = "experience" | "project" | "skill";

export type GraphNode = {
  key: string;
  kind: NodeKind;
  id: string;
  label: string;
  subtitle?: string;
};

export type GraphEdge = {
  fromKey: string;
  toKey: string;
  label?: string;
};

export type NodePosition = {
  x: number;
  y: number;
};

export type LayoutConfig = {
  showProjects: boolean;
  showExperiences: boolean;
  showSkills: boolean;
};

export type LayoutMode = "random" | "organized";

// Generate unique key for a node
export function nodeKey(kind: NodeKind, id: string): string {
  return `${kind}:${id}`;
}

// Build the visible graph based on toggle state
export function buildGraph(config: LayoutConfig): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const graphEdges: GraphEdge[] = [];
  const nodeKeySet = new Set<string>();

  // Add experience nodes
  if (config.showExperiences) {
    for (const exp of experiences) {
      const key = nodeKey("experience", exp.id);
      nodes.push({
        key,
        kind: "experience",
        id: exp.id,
        label: exp.title,
        subtitle: exp.role,
      });
      nodeKeySet.add(key);
    }
  }

  // Add project nodes
  if (config.showProjects) {
    for (const proj of projects) {
      const key = nodeKey("project", proj.id);
      nodes.push({
        key,
        kind: "project",
        id: proj.id,
        label: proj.title,
        subtitle: proj.category,
      });
      nodeKeySet.add(key);
    }
  }

  // Add skill nodes if enabled
  if (config.showSkills) {
    // Only add skills that are connected to visible nodes
    const connectedSkillIds = new Set<string>();

    if (config.showProjects) {
      for (const proj of projects) {
        for (const skillId of proj.skillIds) {
          connectedSkillIds.add(skillId);
        }
      }
    }

    if (config.showExperiences) {
      for (const exp of experiences) {
        for (const skillId of exp.skillIds) {
          connectedSkillIds.add(skillId);
        }
      }
    }

    for (const skill of skills) {
      if (connectedSkillIds.has(skill.id)) {
        const key = nodeKey("skill", skill.id);
        nodes.push({
          key,
          kind: "skill",
          id: skill.id,
          label: skill.label,
        });
        nodeKeySet.add(key);
      }
    }
  }

  // Add edges from the data (experience ↔ project)
  for (const edge of edges) {
    const fromKey = nodeKey(edge.from.kind as NodeKind, edge.from.id);
    const toKey = nodeKey(edge.to.kind as NodeKind, edge.to.id);

    if (nodeKeySet.has(fromKey) && nodeKeySet.has(toKey)) {
      graphEdges.push({ fromKey, toKey, label: edge.label });
    }
  }

  // Add skill edges if skills are visible
  if (config.showSkills) {
    if (config.showProjects) {
      for (const proj of projects) {
        const projKey = nodeKey("project", proj.id);
        for (const skillId of proj.skillIds) {
          const skillKey = nodeKey("skill", skillId);
          if (nodeKeySet.has(skillKey)) {
            graphEdges.push({ fromKey: projKey, toKey: skillKey });
          }
        }
      }
    }

    if (config.showExperiences) {
      for (const exp of experiences) {
        const expKey = nodeKey("experience", exp.id);
        for (const skillId of exp.skillIds) {
          const skillKey = nodeKey("skill", skillId);
          if (nodeKeySet.has(skillKey)) {
            graphEdges.push({ fromKey: expKey, toKey: skillKey });
          }
        }
      }
    }
  }

  return { nodes, edges: graphEdges };
}

// Seeded random number generator for deterministic "random" positions
function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
}

// Generate a seed from a string (node key)
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Compute layout positions for nodes
export function computeLayout(
  nodes: GraphNode[],
  _graphEdges: GraphEdge[],
  width: number,
  height: number,
  mode: LayoutMode = "random",
  seed: number = 0
): Map<string, NodePosition> {
  const positions = new Map<string, NodePosition>();
  const padding = 100;
  
  // Available area
  const areaWidth = width - padding * 2;
  const areaHeight = height - padding * 2;

  // Separate nodes by kind
  const experienceNodes = nodes.filter((n) => n.kind === "experience");
  const projectNodes = nodes.filter((n) => n.kind === "project");
  const skillNodes = nodes.filter((n) => n.kind === "skill");

  if (mode === "organized") {
    // Organized mode: experiences left, skills center, projects right
    // No overlap relaxation for organized mode - positions are deterministic
    
    // Place experiences on the left (12% of width) - evenly distributed to fill height
    if (experienceNodes.length > 0) {
      const expSpacing = areaHeight / (experienceNodes.length + 1);
      experienceNodes.forEach((node, i) => {
        positions.set(node.key, {
          x: width * 0.12,
          y: padding + expSpacing * (i + 1),
        });
      });
    }

    // Place skills in the center (50% of width) - arrange in a grid pattern
    if (skillNodes.length > 0) {
      // Calculate grid dimensions - more rows than columns for vertical layout
      const skillRows = Math.ceil(Math.sqrt(skillNodes.length * 1.5));
      const skillCols = Math.ceil(skillNodes.length / skillRows);
      
      // Calculate spacing to fit within center area
      const skillAreaWidth = areaWidth * 0.45;
      const skillSpacingX = skillCols > 1 ? skillAreaWidth / (skillCols - 1) : 0;
      const skillSpacingY = areaHeight / (skillRows + 1);
      
      const skillStartX = width * 0.5 - skillAreaWidth / 2;
      const skillStartY = padding;
      
      skillNodes.forEach((node, i) => {
        const row = Math.floor(i / skillCols);
        const col = i % skillCols;
        positions.set(node.key, {
          x: skillStartX + col * skillSpacingX,
          y: skillStartY + skillSpacingY * (row + 1),
        });
      });
    }

    // Place projects on the right (88% of width) - evenly distributed to fill height
    if (projectNodes.length > 0) {
      const projSpacing = areaHeight / (projectNodes.length + 1);
      projectNodes.forEach((node, i) => {
        positions.set(node.key, {
          x: width * 0.88,
          y: padding + projSpacing * (i + 1),
        });
      });
    }
    
    // Return early - no overlap relaxation for organized mode
    return positions;
  } else {
    // Random mode: place all nodes randomly using seeded random
    for (const node of nodes) {
      // Combine node key hash with the global seed for variety
      const nodeSeed = hashString(node.key) + seed;
      const random = seededRandom(nodeSeed);
      
      // Random position within padded area
      const x = padding + random() * areaWidth;
      const y = padding + random() * areaHeight;
      
      positions.set(node.key, { x, y });
    }
  }

  // Overlap relaxation pass - push overlapping nodes apart
  const minDistances: Record<string, number> = {
    experience: 120,
    project: 100,
    skill: 60,
  };
  
  const iterations = 50;
  const nodeKeys = Array.from(positions.keys());

  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < nodeKeys.length; i++) {
      for (let j = i + 1; j < nodeKeys.length; j++) {
        const keyA = nodeKeys[i];
        const keyB = nodeKeys[j];
        const posA = positions.get(keyA)!;
        const posB = positions.get(keyB)!;
        
        // Get node kinds to determine min distance
        const kindA = keyA.split(":")[0] as NodeKind;
        const kindB = keyB.split(":")[0] as NodeKind;
        const minDistance = Math.max(minDistances[kindA], minDistances[kindB]);

        const dx = posB.x - posA.x;
        const dy = posB.y - posA.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < minDistance && dist > 0) {
          const overlap = (minDistance - dist) / 2;
          const pushX = (dx / dist) * overlap;
          const pushY = (dy / dist) * overlap;

          positions.set(keyA, {
            x: Math.max(padding, Math.min(width - padding, posA.x - pushX)),
            y: Math.max(padding, Math.min(height - padding, posA.y - pushY)),
          });
          positions.set(keyB, {
            x: Math.max(padding, Math.min(width - padding, posB.x + pushX)),
            y: Math.max(padding, Math.min(height - padding, posB.y + pushY)),
          });
        }
      }
    }
  }

  return positions;
}

// Generate SVG path for an edge (cubic bezier)
export function getEdgePath(
  fromPos: NodePosition,
  toPos: NodePosition,
  isSkillEdge: boolean = false
): string {
  const dx = Math.abs(toPos.x - fromPos.x);
  const controlOffset = isSkillEdge ? dx * 0.3 : Math.min(dx * 0.4, 120);

  // Determine which side to curve based on relative positions
  const curveDirection = fromPos.x < toPos.x ? 1 : -1;

  return `M ${fromPos.x} ${fromPos.y} C ${fromPos.x + controlOffset * curveDirection} ${fromPos.y}, ${toPos.x - controlOffset * curveDirection} ${toPos.y}, ${toPos.x} ${toPos.y}`;
}

// Get connected nodes for a given node key
export function getConnectedNodes(
  nodeKey: string,
  graphEdges: GraphEdge[]
): Set<string> {
  const connected = new Set<string>();
  connected.add(nodeKey);

  for (const edge of graphEdges) {
    if (edge.fromKey === nodeKey) {
      connected.add(edge.toKey);
    }
    if (edge.toKey === nodeKey) {
      connected.add(edge.fromKey);
    }
  }

  return connected;
}

// Get connected edge indices for a given node key
export function getConnectedEdgeIndices(
  nodeKey: string,
  graphEdges: GraphEdge[]
): Set<number> {
  const indices = new Set<number>();

  graphEdges.forEach((edge, index) => {
    if (edge.fromKey === nodeKey || edge.toKey === nodeKey) {
      indices.add(index);
    }
  });

  return indices;
}

// Get nodes connected to a skill
export function getSkillConnections(
  skillId: string
): { projects: string[]; experiences: string[] } {
  const connectedProjects: string[] = [];
  const connectedExperiences: string[] = [];

  for (const proj of projects) {
    if (proj.skillIds.includes(skillId)) {
      connectedProjects.push(proj.title);
    }
  }

  for (const exp of experiences) {
    if (exp.skillIds.includes(skillId)) {
      connectedExperiences.push(exp.title);
    }
  }

  return { projects: connectedProjects, experiences: connectedExperiences };
}

