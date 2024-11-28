import { gql } from 'graphql-request';
import { hasuraClient } from '../../../lib/hasuraClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const mutation = gql`
      mutation MyMutation {
        delete_todos(
            where: { _id: { _eq: "${req.body.ID}" }}
        ) {
            affected_rows
        }
    }
    `;
    
    try {
      const data = await hasuraClient.request(mutation);
      res.status(200).json({ success: true, todo: data.todos });
      
    } catch (error) {
      console.error("Error :", error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}