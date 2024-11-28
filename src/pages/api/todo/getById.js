import { gql } from 'graphql-request';
import { hasuraClient } from '../../../lib/hasuraClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const query = gql`
      query GetById {
        todos(where: {_id: {_eq: "${req.body.ID}"}}) {
            _id
            User_id
            detail
            done_status
            priority
            todoname
        }
        }
    `;
    
    try {
      const data = await hasuraClient.request(query);
      res.status(200).json({ success: true, todo: data.todos });
      
    } catch (error) {
      console.error("Error fetching todolist:", error); // Log any errors
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}