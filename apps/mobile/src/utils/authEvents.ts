type Listener = () => void;
const listeners = new Set<Listener>();

export function onAuthEvent(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function emitAuthEvent() {
  for (const fn of listeners) fn();
}
