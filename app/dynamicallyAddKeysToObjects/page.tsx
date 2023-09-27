"use client";
import React, { useState, useReducer } from "react";

const cache: Record<string, string> = {};

// We're trying to dynamically add keys to the cache object at runtime. Wow! Typescript!!!
const createCache = () => {
  const add = (id: string, value: string) => {
    cache[id] = value;
  };
  const remove = (id: string) => {
    delete cache[id];
  };

  return { add, remove };
};

type _STATE = {
  id: string;
  value: string;
};

const enum ACTIONS {
  ADD_ID,
  ADD_VALUE,
}

type _DISPATCH_ACTION = {
  type: ACTIONS;
  payload: string;
};

const reducer = (state: _STATE, action: _DISPATCH_ACTION): _STATE => {
  switch (action.type) {
    case ACTIONS.ADD_ID: {
      return { ...state, id: action.payload };
    }
    case ACTIONS.ADD_VALUE: {
      return { ...state, value: action.payload };
    }
  }
};

const page = () => {
  const [newcache, dispatch] = useReducer(reducer, {
    id: "",
    value: "",
  });
  const [col, setCol] = useState<string>("text-white");
  const [delinfo, setDelInfo] = useState<_STATE>({ id: "", value: "" });
  const [count, setCount] = useState<number>(0);
  const [selectid,setSelectId] = useState(-9999999)

  const runcache = createCache();

  const handleSubmit = (target: EventTarget) => {
    runcache.add(newcache.id, newcache.value);
    setCount(count + 1);
    console.log(cache);
  };
  return (
    <div className="flex flex-col py-24 px-16 items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e.target);
        }}
      >
        <label> Id : </label>
        <input
          onChange={(e) => {
            dispatch({ type: ACTIONS.ADD_ID, payload: e.target.value });
          }}
          className="text-black mx-auto my-2"
          value={newcache.id}
        />
        <label> Value : </label>
        <input
          onChange={(e) =>
            dispatch({ type: ACTIONS.ADD_VALUE, payload: e.target.value })
          }
          className="text-black mx-auto my-2"
          value={newcache.value}
        />
        <button type="submit"></button>
      </form>
      <div>
        {Object.keys(cache).map((key, index) => {
          return (
            <div
              onClick={() => {
                setSelectId(index);
                (col == "text-white") ? setCol("text-red-500") : setCol("text-white");
                delinfo.id === key ? setDelInfo({id : "", value : ""}) : setDelInfo({ id: key, value: cache[key] });
              }}
              key={index}
              className={`cursor-pointer flex items-center ${index === selectid ? col : ""}`}
            >
              <div className="mx-2 flex items-center">
                <p className={`mx-2`}>{`Key ${index + 1}:`}</p>
                <p className={`mx-auto my-2`}>{key}</p>
              </div>
              <div className="mx-2 flex items-center">
                <p className={`mx-2`}> Value : </p>
                <p className={`mx-auto my-2`}>{cache[key]}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          runcache.add(newcache.id, newcache.value);
          setCount(count + 1)
        }}
        className="mx-auto my-2"
      >
        Click to Add Cache
      </button>
      <button
        onClick={() => {
          runcache.remove(delinfo.id);
          setCount(count + 1)
        }}
        className="mx-auto"
      >
        Click to remove Cache
      </button>
    </div>
  );
};

export default page;
