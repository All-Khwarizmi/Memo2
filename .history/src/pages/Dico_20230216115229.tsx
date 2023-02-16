import React, { useState } from "react";

const Dico = () => {
    const [word, setWord] = useState("")
  const fetchDico = () => {};

  return (
    <main className="h-screen w-screen">
      <div className="grid  items-center text-center">
        <h1 className="py-5 text-center text-2xl">Dico</h1>
      </div>
      <div className="flex h-full w-full flex-col items-center gap-5">
        <div className="border-black-500 h-[30%]  w-[30%] rounded border-2 border-solid bg-gray-200">
          <div className="text-black p-2">Mot recherché: </div>
          <div></div>
        </div>
        <form className="">
          <input
          value={word}
          placeholder
            className="rounded-lg rounded-r-none px-3 py-1"
            type="text"
            name="word"
            id="word"
          />
          <button
            className="rounded-lg rounded-l-none bg-purple-500 px-3 py-1"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
};

export default Dico;
