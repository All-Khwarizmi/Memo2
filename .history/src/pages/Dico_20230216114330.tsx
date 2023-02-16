import React from "react";

const Dico = () => {

    const fetchDico = () => {

    }

  return (
    <main className="">
      <div className="grid w-screen items-center text-center">
        <h1 className="py-5 text-center text-2xl">Dico</h1>
      </div>
      <div className="flex flex-col  gap-h-full w-full items-center">
        <div className="min-h-300 h-[100%] min-w-300 border-2 border-solid border-black-500"></div>
        <form>
          <input type="text" name="word" id="word" />
          <button type="submit">Send</button>
        </form>
      </div>
    </main>
  );
};

export default Dico;
