import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import parse from "html-react-parser";

type Trad = {
  source: string;
  target: string;
};
type Translations = Array<Trad>;
interface TranslationsFetch {
  translations: Array<Trad>;
}


const DicoModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
      const [word, setWord] = useState("");
  const [translations, setTranslations] = useState<Translations>([]);

  const submitWord = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Submitting");
    fetchDico(word).catch(err => console.log(err));
  };

  const inputWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setWord(e.target.value);
  };

  const fetchDico = async (word: string): Promise<void> => {
    console.log("Fetching..");
    const url = "https://memo2-ten.vercel.app/api/dico";
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=UTF-8",
      },
      body: JSON.stringify(word),
    };
    const res = await fetch(url, options);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    console.log("Data: ", data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { translations }: TranslationsFetch = data;
    setTranslations(translations);
  };
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>

        <Modal size={"xl"} isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Français - Espagnol</ModalHeader>
            <ModalCloseButton />
            <ModalBody className="min-h-300">
              <div className=" grid-row grid items-center gap-5 text-black">
                <div className=" ">
                  <table className="   w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead
                      className={`sticky ${
                        translations.length ? null : "hidden"
                      }  top-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400`}
                    >
                      <tr className="w-[100%] ">
                        <th scope="col" className="px-6 py-3">
                          Dans le sens de
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Traduction
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {translations?.map((trad: Trad, index) => {
                        return (
                          <tr
                            className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                            key={index}
                          >
                            <td className="px-6 py-4">
                              {" "}
                              {parse(trad?.source)}
                            </td>
                            <th
                              scope="row"
                              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              {parse(trad?.target)}
                            </th>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid  place-items-center">
                <form
                  className="py-5 text-black"
                  onSubmit={(e) => submitWord(e)}
                >
                  <input
                    onChange={(event) => inputWord(event)}
                    value={word}
                    placeholder="Que veux-tu chercher?"
                    className="rounded-lg rounded-r-none border  border-2 px-3 py-1"
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
              <div className="grid place-items-center">
                <Button mr={3} onClick={onClose}>
                  Close
                </Button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
};

export default DicoModal;
