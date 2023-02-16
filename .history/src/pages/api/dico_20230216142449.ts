import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors)
if (req.method === "GET") return res.status(403).send({message: "Only POST resquest are allowed"})
  // Rest of the API logic
      const options: RequestInit = {
      method: "GET",
      headers: {
        "X-secret": "469f5b2b84b3fd59483ee1900ee0de500dfc1643eb55e7f524956ddb35c5da45",
      },
    }
    const word = "maison"
      const url = `https://api.pons.com/v1/dictionary?q=${req.body}&in=fr&language=es&l=esfr`;
  console.log("Got a french - spanish request", req.body, req.method);
      try {
      const response = await fetch(url, options);
      const data = await response.json();

      // Parsing  data
      const myData = data[0].hits[0].roms[0].arabs[0].translations
      const source = data[0].hits[0].roms[0].headword
      const sourcePhono = data[0].hits[0].roms[0].headword_full
      const gramClass = data[0].hits[0].roms[0].wordclass



  console.log("Here is the data: ", myData, source, sourcePhono, gramClass);
      res.json({ source ,myData})
    } catch (error) {
      console.log(error);
      res.json({ message: 'Something went wrong' })
    } 
   
  
}