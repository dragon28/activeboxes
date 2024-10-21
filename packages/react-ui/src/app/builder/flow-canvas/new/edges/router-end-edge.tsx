import { BaseEdge, EdgeProps } from '@xyflow/react';
import { ApRouterEndEdge } from '../types';
import { flowUtilConsts } from '../consts';
import { ApAddButton } from './add-button';
import { StepLocationRelativeToParent } from '../../../../../../../shared/src';

export const ApRouterEndCanvasEdge = ({
  sourceX,
  targetX,
  targetY,
  sourceY,
  data,
  id,
}: EdgeProps & Omit<ApRouterEndEdge, 'position'>) => {
  const verticalLineLength =
    flowUtilConsts.VERTICAL_SPACE_BETWEEN_STEPS -
    2 * flowUtilConsts.VERTICAL_SPACE_BETWEEN_STEP_AND_LINE;

  const horizontalLineLength =
    (Math.abs(targetX - sourceX) - 2 * flowUtilConsts.ARC_LENGTH) *
    (targetX > sourceX ? 1 : -1);
  const path = `
    M ${sourceX - 0.5} ${
    sourceY - flowUtilConsts.VERTICAL_SPACE_BETWEEN_STEP_AND_LINE * 2
  }
    v ${data.verticalSpaceBetweenLastNodeInBranchAndEndLine}
   
    ${
      targetX > sourceX
        ? flowUtilConsts.ARC_RIGHT_DOWN
        : flowUtilConsts.ARC_LEFT_DOWN
    }
       h ${horizontalLineLength}
      

    ${
      data.drawEndingArc
        ? targetX > sourceX
          ? flowUtilConsts.ARC_RIGHT
          : flowUtilConsts.ARC_LEFT
        : ''
    }

    ${
      data.drawEndingVerticalLine
        ? `v${verticalLineLength} ${
            !data.isNextStepEmpty ? flowUtilConsts.ARROW_DOWN : ''
          }`
        : ''
    }
  `;
  return (
    <>
      <BaseEdge
        path={path}
        style={{ strokeWidth: `${flowUtilConsts.LINE_WIDTH}px` }}
      ></BaseEdge>

      {data.drawEndingVerticalLine && (
        <foreignObject
          x={targetX - flowUtilConsts.AP_NODE_SIZE.ADD_BUTTON.width / 2}
          y={
            targetY -
            verticalLineLength +
            flowUtilConsts.AP_NODE_SIZE.ADD_BUTTON.height
          }
          width={flowUtilConsts.AP_NODE_SIZE.ADD_BUTTON.width}
          height={flowUtilConsts.AP_NODE_SIZE.ADD_BUTTON.height}
          className="overflow-visible"
        >
          <ApAddButton
            edgeId={id}
            stepLocationRelativeToParent={StepLocationRelativeToParent.AFTER}
            parentStepName={data.routerOrBranchStepName}
          ></ApAddButton>
        </foreignObject>
      )}
    </>
  );
};
