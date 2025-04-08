import { useEffect, useState, useRef } from "react";
import "./styles.css";

export default function App() {
  const [inputval, setInputval] = useState("");
  const [result, setResult] = useState([]);
  const [showBox, setshowBox] = useState(false);
  const inputRef = useRef(null);

  const cache = useRef({});
  console.log("cashe", cache);

  const fetchData = async () => {
    if (cache.current[inputval]) {
      setResult(cache.current[inputval]);
      return;
    }
    try {
      let data = await fetch(
        `https://dummyjson.com/recipes/search?q=${inputval}`
      );
      let jsonData = await data.json();
      setResult(jsonData?.recipes);
      cache.current[inputval] = jsonData?.recipes;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    const timer = setTimeout(() => {
      fetchData();
    }, 500);

    return () => clearTimeout(timer);
  }, [inputval]);

  const resetButtonClicked = () => {
    if (inputval) {
      setInputval("");
    }
  };

  return (
    <div className="App">
      <div className="conatiner">
        <h1>Search Box</h1>
        <input
          type="text"
          value={inputval}
          onChange={(e) => setInputval(e.target.value)}
          className="inputBox"
          onFocus={() => setshowBox(true)}
          onBlur={() => setshowBox(false)}
          ref={inputRef}
        />
        <span className="resteBtn" onClick={() => resetButtonClicked()}>
          X
        </span>
        {showBox && (
          <div className="selectNameBox">
            {result.map((res, i) => {
              return (
                <p key={res.id} className="inputData">
                  {res.name}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
