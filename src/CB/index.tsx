import React from "react";

import { createPerformanceStrategy, memoStrategy, noneStrategy } from "./changeDetectionStrategy";

export function cb<
  Props,
  StateConfig extends {
    [name: string]: any;
  },
  ComputedFields extends {
    [name: string]: (props: Props, state: StateConfig) => [() => any, any[]?];
  }
>(
  config: {
    useStateBuilder?: (props: Props) => StateConfig;
    computed?: ComputedFields;
    changeDetectionStrategy?: typeof noneStrategy | typeof memoStrategy | ReturnType<typeof createPerformanceStrategy>;
    defaultProps?: Partial<Props>;
  },
  ComponentFunction: (
    props: Props,
    result: {
      state: StateConfig;
      computed: {
        [P in keyof ComputedFields]: ReturnType<ReturnType<ComputedFields[P]>[0]>;
      };
    },
  ) => React.FunctionComponentElement<Props>,
): React.FC<Props> {
  const { useStateBuilder, computed = {} as any, changeDetectionStrategy = memoStrategy, defaultProps } = config;

  const RealComponent: React.FC<Props> = function RealComponent(innerProps: Props) {
    const state = useStateBuilder ? useStateBuilder(innerProps) : ({} as StateConfig);
    const computedFields: any = {};

    Object.keys(computed).forEach((key) => {
      const [computedFunction, deps] = computed[key](innerProps, state);
      computedFields[key] = React.useMemo(computedFunction, deps);
    });

    return ComponentFunction(innerProps, {
      state,
      computed: computedFields,
    });
  };

  const Comp = changeDetectionStrategy(RealComponent);

  Comp.defaultProps = defaultProps;

  return Comp;
}

export * from "./changeDetectionStrategy";
