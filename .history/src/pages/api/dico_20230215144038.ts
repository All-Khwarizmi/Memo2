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

  // Rest of the API logic
      const options: any = {
      method: "GET",
      headers: {
        "X-secret": "469f5b2b84b3fd59483ee1900ee0de500dfc1643eb55e7f524956ddb35c5da45",
      },
    }
    const word = "maison"
      const url = `https://api.pons.com/v1/dictionary?q=${word}&in=fr&language=es&l=esfr`;
  console.log("Got a french - spanish request");
     try {
      const res= await fetch(url, options);
      const data = await res.json();
  console.log("Here is the data: ", data, res);
      res.json({data})
    } catch (error) {
      console.log(error);
      res.json({ message: 'Something went wrong' })
    }
  
}