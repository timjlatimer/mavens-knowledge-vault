# Swarm Mode Research Notes

## Biological Basis for Two-Mode Swarm

### Response Threshold Model (Bonabeau et al.)
- Individual workers have inherent thresholds to stimuli associated with different tasks
- Workers with lowest thresholds preferentially perform that task
- Variation in thresholds originates from genetic diversity
- KEY: The model only works if thresholds are VARIED among individuals

### Temporal Polyethism (Age-Based)
- Young workers: cell cleaning, brood care, nest maintenance (generalist interior work)
- Older workers: foraging, defense, corpse removal (specialist exterior work)
- Pattern is NOT rigid — workers can revert if colony needs change
- Removing young workers causes foragers to revert to brood care

### Colony Mode Switching
- Colonies switch between generalist and specialist modes depending on:
  - Presence of polymorphism (size differences)
  - Age distribution
  - Environmental stimuli (threat level, resource availability)
- Under stress/emergency: colonies shift MORE workers to generalist response
- Under stable conditions: specialization increases efficiency

### Network Models
- Colonies = self-organized networks
- Highly connected individuals act as hubs
- Network structure influences how efficiently tasks are allocated and switched
- Spatial and temporal dynamics impose upper bounds on information flow

## Key Insight: The Two Modes Are Real in Biology
1. **Homogeneous/Unified Mode**: All agents doing same thing (murmuration, schooling, swarming for defense)
   - Used when: threat response, migration, exploration of unknown territory
   - Advantage: resilience, redundancy, no single point of failure
   - Cost: lower efficiency for complex tasks

2. **Heterogeneous/Specialized Mode**: Agents have distinct roles (ant castes, bee age-polyethism)
   - Used when: stable operations, complex multi-step tasks, resource optimization
   - Advantage: higher efficiency, deeper expertise per task
   - Cost: switching costs (30-60% idle time during transitions), vulnerability if specialists lost

## Military Parallel: DEFCON Levels
- DEFCON 5 (normal): Specialized units, routine operations
- DEFCON 1 (maximum): All forces unified, single mission focus
- The escalation IS the mode switch from specialized to unified

## Swarm Robotics Research
- Homogeneous swarms: simpler coordination, more resilient, better for exploration
- Heterogeneous swarms: better performance on complex tasks, but harder to coordinate
- Research shows heterogeneous swarms outperform homogeneous for predetermined behaviors
- Mode switching between homo/hetero is an active research area
