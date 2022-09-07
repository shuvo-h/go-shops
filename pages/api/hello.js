

export default async function handler(req, res) {
  try {
    
    
    res.status(200).json({ name: 'John Doe' })
    
  } catch (error) {
   console.log(error.message); 
   res.send(error.message)
  }
}



