import { useState, useMemo, useEffect } from "react";
import { StateMachine, DefaultContext, EventObject, StateSchema, interpret, OmniEvent, State } from "xstate";

// from https://xstate.js.org/docs/recipes/react.html#hooks
export default function useMachine<
  TContext = DefaultContext,
  TStateSchema extends StateSchema = any,
  TEvent extends EventObject = EventObject
>(machine: StateMachine<TContext, TStateSchema, TEvent>): [State<TContext, TEvent>, ((event: OmniEvent<TEvent>) => State<TContext, TEvent>)] {
  const [current, setCurrent] = useState(machine.initialState);

  // i think dan's tweeted that this isn't a proper use of useMemo
  const service = useMemo(() => {
    return interpret(machine)
      .onTransition(state => {
        // Update the current machine state when a transition occurs
        setCurrent(state);
      })
      .start()
  }, []);

  useEffect(() => {
    return () => service.stop();
  }, []);

  return [current, service.send];
}
