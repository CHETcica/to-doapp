import { gql } from 'graphql-request';
import { hasuraClient } from '../../../lib/hasuraClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.localdata[0]._id)
    const query = gql`
      query fetchTodo {
        todos(where: {User_id: {_eq: "${req.body.localdata[0]._id}"}, done_status: {_eq: ${req.body.isDone}}}) {
            _id
            priority
            todoname
            done_status
            detail
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
