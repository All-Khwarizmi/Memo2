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

        <Modal isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Français - Espagnol</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
          
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
};

export default DicoModal;
