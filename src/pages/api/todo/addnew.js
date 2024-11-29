import { gql } from 'graphql-request';
import { hasuraClient } from '../../../lib/hasuraClient';

export default async function AddNew(req, res) {
  if (req.method === 'POST') {
    
    console.log("req.body.user[0]._id",req.body.user[0]._id)
    const mutation = gql`
      mutation Addtodo {
        insert_todos_one(object: {
            User_id: "${req.body.user[0]._id}",
            detail: "${req.body.detail}",
            done_status: false,
            priority: ${req.body.priority || 1},
            todoname: "${req.body.todoName}"}) 
            {
                _id
                priority
                detail
                done_status
                User_id
                todoname
            }
      }
    `;
    
    try {
      const data = await hasuraClient.request(mutation);
      console.log(data);
      res.status(200).json({ success: true, todo: data.todos });
      
    } catch (error) {
      console.error("Error fetching todolist:", error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
