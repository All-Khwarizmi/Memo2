import React from "react";

const Dico = () => {
  const fetchDico = () => {};

  return (
    <main className="h-screen w-screen">
      <div className="grid  items-center text-center">
        <h1 className="py-5 text-center text-2xl">Dico</h1>
      </div>
      <div className="flex h-full  w-full flex-col items-center gap-5">
        <div className="border-black-500 h-[30%] w-[30%] border-2 border-solid bg-gray-200">
          <div className="text-black">Mot recherché: </div>
          <div>

          </div>
        </div>
        <form>
          <input type="text" name="word" id="word" />
          <butto className="" type="submit">Send</button>
        </form>
      </div>
    </main>
  );
};

export default Dico;
