import React from "react";

const Dico = () => {

    const fetchDico = () => {

    }

  return (
    <main className="w-screen h-screen">
      <div className="grid  items-center text-center">
        <h1 className="py-5 text-center text-2xl">Dico</h1>
      </div>
      <div className="flex flex-col  gap-5 h-full w-full items-center">
        <div className="h-[100%] w-300 border-2 border-solid border-black-500"></div>
        <form>
          <input type="text" name="word" id="word" />
          <button type="submit">Send</button>
        </form>
      </div>
    </main>
  );
};

export default Dico;
