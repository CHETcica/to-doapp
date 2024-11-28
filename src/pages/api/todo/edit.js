import { gql } from 'graphql-request';
import { hasuraClient } from '../../../lib/hasuraClient';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log("req.body.ID",req.body.ID)
        const query = gql`
        mutation MyMutation {
            update_todos(
                where: {_id: {_eq: "${req.body.ID}"}},
                _set: {
                    todoname: "${req.body.todoName}"
                    detail: "${req.body.detail}",
                    done_status: ${req.body.done || false},
                    priority: ${req.body.priority || 1},
                },
            ) {
                returning {
                    todoname
                    detail
                    done_status
                    priority
                }
            }
        }
        `;

        try {
            const data = await hasuraClient.request(query);
            res.status(200).json({ success: true, todo: data.todos });

        } catch (error) {
            console.error("Error edit todo:", error); // Log any errors
            res.status(400).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}