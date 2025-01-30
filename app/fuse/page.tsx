"use client";
import React, { useState } from "react";
import Fuse, { FuseResult } from "fuse.js";

interface StudentProps {
  name: string;
  age: number;
  height: number;
  college_level: string;
  objectId: string;
}

const Page = () => {
  const [results, setResults] = useState<
    FuseResult<StudentProps>[] | undefined
  >();
  const [finalResults, setFinalResults] = useState<
    FuseResult<StudentProps>[] | undefined
  >();
  const [showSearch, setShowSearch] = useState(false);
  const [notFound, setNotFound] = useState<{
    q: FormDataEntryValue | string;
    state: boolean;
  }>({ q: "", state: false });

  const getStudents = async () => {
    try {
      const students = await fetch("/fuse/fuseData.json");
      if (!students.ok) throw new Error(students.statusText);
      else return students.json() as Promise<Array<StudentProps>>;
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      else throw new Error(error as string);
    }
  };

  const getSearchResults = async (
    query: FormDataEntryValue,
    type: "search" | "submit"
  ) => {
    const students = await getStudents();
    const fuse = new Fuse(students, {
      keys: ["name", "age", "college_level"],
      includeScore: true,
      shouldSort: true,
      threshold: 0.5
    });
    const searchResults = fuse.search(query as string);

    // hide & unhide the search results if submit
    if (type === "search") {
      setResults(searchResults);
      if (query.length > 0) setShowSearch(true);
      else setShowSearch(false);
    } else {
      setFinalResults(searchResults);
      setShowSearch(false);
    }

    // set the not found
    if (query.length > 0 && searchResults.length === 0)
      setNotFound({ q: query, state: true });
    else setNotFound({ q: query, state: false });
  };

  const isThereSearchResults = results && results.length > 0 && showSearch;

  return (
    <section id="fuse-form" className="w-full px-[5%] lg:px-[30%]">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const queries = Object.fromEntries(formData);
          getSearchResults(queries["fuse-input"], "submit");
        }}
        id="fuse-form"
        className="flex items-stretch mt-16 justify-center space-x-2"
      >
        <input
          type="text"
          name="fuse-input"
          placeholder="Search anything"
          className="flex-grow focus:outline-none shadow-lg rounded-lg px-7 py-3 border-[1px] border-black/90"
          id="fuse-input"
          onChange={(e) => getSearchResults(e.target.value, "search")}
        />
        <button
          type="submit"
          name="fuse-btn"
          className="fuse-button border-[1px] flex items-center px-4 py-2 border-black/10 rounded-lg"
        >
          FIND
        </button>
      </form>

      {/* Show search results */}

      {isThereSearchResults && (
        <div className="m-auto overflow-y-auto rounded-xl my-3 bg-[#f0f0f0] max-h-[18.5rem] py-2 w-full">
          {results?.map(({ item, refIndex }) => (
            <a
              key={item.name + refIndex}
              className="block font-serif rounded-xl space-y-2 py-2 px-4"
              href={`/student/${item.objectId}`}
            >
              <div className="flex space-x-3">
                <h2 className="font-bold">{item.name}</h2>
                <h3>{item.age}</h3>
                <h4>{item.height}</h4>
                <h4>{item.college_level}</h4>
              </div>
            </a>
          ))}
        </div>
      )}

      {notFound.state && (
        <h2 className="text-red-400 my-3 mx-auto">{`No results found for "${notFound.q}"`}</h2>
      )}

      {/* Show final results */}

      <div className="mt-10 m-auto w-full grid gap-2 grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))]">
        {finalResults?.map(({ item, refIndex }) => (
          <div
            key={item.name + refIndex}
            className="font-serif rounded-xl space-y-2 p-3 lg:p-8"
          >
            <div className="flex flex-col space-y-3">
              <h2 className="font-bold">{item.name}</h2>
              <h3>{item.age}</h3>
            </div>
            <div className="flex space-x-3">
              <h4>{item.height}</h4>
              <h4>{item.college_level}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;
