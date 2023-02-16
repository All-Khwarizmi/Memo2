import { url } from "inspector";
import React, { useState } from "react";

const Dico = () => {
  const [word, setWord] = useState("");
  console.log(word);


  const submitWord = ( e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting");
   const {mydata, source} fetchDico(word)
  };

  const inputWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setWord(e.target.value);
  };

  const fetchDico = async (word: string) => {
    console.log("Fetching..");
    const url = "http://localhost:3000/api/dico";
    const options: RequestInit = {
      method: "POST",
      headers: {
         "Content-Type": "text/plain;charset=UTF-8"
      },
      body: JSON.stringify(word)
    };
    const res = await fetch(url, options);
    const data = await res.json()
    console.log("Data: ",data);
    const {myData, source} = data
     return {myData, source}
  };

  return (
    <main className="h-screen w-screen">
      <div className="grid  items-center text-center">
        <h1 className="py-5 text-center text-2xl">Dico</h1>
      </div>
      <div className="flex h-full w-full flex-col items-center gap-5">
        <div className="border-black-500 h-auto min-h-[40%] w-auto min-w-[40%] rounded border-2 border-solid bg-gray-200">
          <div className="p-2 text-black">Mot recherché: </div>
          <div>
            {mydata?.}
          </div>
        </div>
        <form className="text-black" onSubmit= {(e) => submitWord(e) }>
          <input
            onChange={(event) => inputWord(event)}
            value={word}
            placeholder="Que veux-tu chercher?"
            className="rounded-lg rounded-r-none px-3 py-1"
            type="text"
            name="word"
            id="word"
          />
          <button
            className="rounded-lg rounded-l-none bg-purple-500 px-3 py-1"
            type="submit"
          >
            Chercher
          </button>
        </form>
      </div>
    </main>
  );
};

export default Dico;
