import { gql } from 'graphql-request';
import { hasuraClient } from '../../../lib/hasuraClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const query = gql`
      query LogIn {
        users(where: {email: {_eq: "${req.body.email}"}, password: {_eq: "${req.body.password}"}}) {
          _id
          email
          name
        }
      }
    `;

    try {
      const data = await hasuraClient.request(query);
      res.status(200).json({ success: true, users: data.users });
      
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
