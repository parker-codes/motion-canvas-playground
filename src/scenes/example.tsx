import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';
import { Circle } from '@motion-canvas/2d/lib/components';
import { all } from '@motion-canvas/core/lib/flow';

interface Position {
  x: number;
  y: number;
}

const BASE_POSITION: Position = { x: 0, y: 0 };

const NUCLEUS_SIZE = 140;
const NUCLEUS_COLOR = '#e13238';

const ELECTRON_SIZE = 25;
const ELECTRON_SCALE = 1;

const ELECTRON_1_POSITION: Position = { x: ELECTRON_SIZE * 10, y: ELECTRON_SIZE * 5 };
const ELECTRON_1_COLOR = '#2563eb';
const ELECTRON_1_FADED_COLOR = '#1e40af';
const ELECTRON_2_POSITION: Position = { x: ELECTRON_SIZE * -10, y: ELECTRON_SIZE * 5 };
const ELECTRON_2_COLOR = '#16a34a';
const ELECTRON_2_FADED_COLOR = '#166534';

export default makeScene2D(function* (view) {
  const nucleus = createRef<Circle>();
  const electron1 = createRef<Circle>();
  const electron2 = createRef<Circle>();

  view.add(
    <>
      <Circle
        ref={nucleus}
        x={BASE_POSITION.x}
        y={BASE_POSITION.y}
        width={NUCLEUS_SIZE}
        height={NUCLEUS_SIZE}
        fill={NUCLEUS_COLOR}
      />
      <Circle
        ref={electron1}
        x={BASE_POSITION.x}
        y={BASE_POSITION.y}
        width={ELECTRON_SIZE}
        height={ELECTRON_SIZE}
        scale={ELECTRON_SCALE}
        fill={ELECTRON_1_COLOR}
      />
      <Circle
        ref={electron2}
        x={BASE_POSITION.x}
        y={BASE_POSITION.y}
        width={ELECTRON_SIZE}
        height={ELECTRON_SIZE}
        scale={ELECTRON_SCALE}
        fill={ELECTRON_2_COLOR}
      />
    </>
  )

  yield* all(
    electron1().scale(0.5, 2).to(ELECTRON_SCALE, 1),
    electron1()
      .position([ELECTRON_1_POSITION.x, ELECTRON_1_POSITION.y], 1)
      .to([-ELECTRON_1_POSITION.x, -ELECTRON_1_POSITION.y], 1)
      // TODO: can return electron back to absolutePosition of nucleus
      .to([BASE_POSITION.x, BASE_POSITION.y], 1),
    electron1().fill(ELECTRON_1_FADED_COLOR, 2).to(ELECTRON_1_COLOR, 1),

    electron2().scale(0.5, 2).to(ELECTRON_SCALE, 1),
    electron2()
      .position([ELECTRON_2_POSITION.x, ELECTRON_2_POSITION.y], 1)
      .to([-ELECTRON_2_POSITION.x, -ELECTRON_2_POSITION.y], 1)
      .to([BASE_POSITION.x, BASE_POSITION.y], 1),
    electron2().fill(ELECTRON_2_FADED_COLOR, 2).to(ELECTRON_2_COLOR, 1),
  );
});