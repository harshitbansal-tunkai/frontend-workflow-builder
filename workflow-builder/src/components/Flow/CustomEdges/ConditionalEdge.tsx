import { BaseEdge, EdgeLabelRenderer, getStraightPath } from "@xyflow/react";
import type { EdgeProps } from "@xyflow/react";

type ConditionalEdgeData = {
  condition: string;
};

const ConditionalEdge = (props: EdgeProps) => {
  const { id, sourceX, sourceY, targetX, targetY, selected, data } = props;

  const typedData = data as ConditionalEdgeData | undefined;

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const condition = typedData?.condition?.trim().toUpperCase() ?? "CONDITION";

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: selected ? "#3b82f6" : "#b1b1b7",
          strokeWidth: selected ? 3 : 2,
        }}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
          title={`Route when condition = ${condition}`}
        >
          <div className="bg-orange-100 border-2 border-orange-400 rounded px-2 py-1 text-xs font-semibold text-orange-700">
            {condition}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default ConditionalEdge;
