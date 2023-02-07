import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';
import { Circle } from '@motion-canvas/2d/lib/components';
import { all } from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
  const littleCircle = createRef<Circle>();
  const bigCircle = createRef<Circle>();

  view.add(
    <>
      <Circle
        ref={littleCircle}
        x={-300}
        y={-200}
        width={100}
        height={100}
        fill="#e13238"
      />
      <Circle
        ref={bigCircle}
        x={-300}
        y={200}
        width={300}
        height={300}
        scale={[1, 1]}
        fill="#e13238"
      />
    </>
  )

  yield* all(
    littleCircle().position.x(300, 1).to(-300, 1),
    littleCircle().fill('#e6a700', 1).to('#e13238', 1),
    bigCircle().scale([0.5, 1], 1).to([0.5, 0.5], 1).to([1, 1], 1),
  );
});