import { gql } from 'graphql-request';
import { hasuraClient } from '../../../lib/hasuraClient';

export default async function AddNew(req, res) {
  if (req.method === 'POST') {
    console.log(req.body.localdata[0]._id)
    const query = gql`
      query fetchTodo {
        todos(where: {User_id: {_eq: "${req.body.localdata[0]._id}"}, done_status: {_eq: ${req.body.isDone}}}) {
            priority
            todoname
            done_status
            detail
        }
      }
    `;
    
    try {
      const data = await hasuraClient.request(query);
      console.log(data); // Log the results of the query
      // Send the data back in the response
      res.status(200).json({ success: true, todo: data.todos });
      
    } catch (error) {
      console.error("Error fetching todolist:", error); // Log any errors
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    // Handle unsupported request methods
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
