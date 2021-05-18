import "./styles.css";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
function useDebounce(callback, delay) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [delay] // will recreate if delay changes
  );
  return debouncedFn;
}
export default function App() {
  const [value, setValue] = useState("");
  const [dbValue, saveToDb] = useState(""); // would be an API call normally
  const debouncedSave = useDebounce((nextValue) => saveToDb(nextValue), 1000);

  const handleChange = (event) => {
    const { value: nextValue } = event.target;
    setValue(nextValue);
    debouncedSave(nextValue);
  };
  return (
    <div className="App">
      <h1>Debounce and Throttling</h1>
      <p>
        debounce: returns a function that can be called any number of times
        (possibly in quick successions) but will only invoke the callback after
        waiting for x ms from the last call.
        <hr />
        throttle: returns a function that can be called any number of times
        (possibly in quick succession) but will only invoke the callback at most
        once every x ms.
        <hr />
      </p>
      <textarea value={value} onChange={handleChange} rows={5} cols={50} />
      <section className="panels">
        <div>
          <h2>Editor (Client)</h2>
          {value}
        </div>
        <div>
          <h2>Saved (DB)</h2>
          {dbValue}
        </div>
      </section>
    </div>
  );
}
