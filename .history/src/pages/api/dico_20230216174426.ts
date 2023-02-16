import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { env } from '../../env.mjs'

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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line  @typescript-eslint/ban-types
  fn: Function
) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        "X-secret": env.NEXT_PUBLIC_PONS_SECRET,
      },
    }
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const url = `https://api.pons.com/v1/dictionary?q=${req.body}&in=fr&language=es&l=esfr`;
  console.log("Got a french - spanish request", req.body, req.method);
      try {
      const response = await fetch(url, options);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();

      // Parsing  data
           // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
         const  = 0
      const translations: unknown = data[0].hits[0].roms[0].arabs[0].translations
           // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
        
      const source: unknown = data[0].hits[0].roms[0].headword
      
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
      res.json({ source ,translations})
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
      res.json({ message: 'Something went wrong' })
    } 
   
  
}