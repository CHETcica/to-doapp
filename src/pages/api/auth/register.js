import { gql } from 'graphql-request';
import { hasuraClient } from '../../../lib/hasuraClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const checkEmailQuery = gql`
      query LogIn {
        users(where: {email: {_eq: "${req.body.email}"}}) {
          _id
          email
          name
        }
      }
    `;
    const mutation = gql`
      mutation MyMutation {
        insert_users_one(object: {email: "${req.body.email}", name: "${req.body.username}", password: "${req.body.password}"}) {
          _id
          email
          name
        }
      }
    `;

    try {
      const existingUser = await hasuraClient.request(checkEmailQuery);
      if (existingUser.users.length > 0) {
        return res.status(400).json({ success: false, error: 'This email is already in use.' });
      }
      else {
        const data = await hasuraClient.request(mutation);
        res.status(200).json({ success: true, user: data.insert_users_one });
      }


    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
