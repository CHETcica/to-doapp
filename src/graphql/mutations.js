export const ADD_TODO = `
  mutation AddTodo($task: String!) {
    insert_todos_one(object: { task: $task, completed: false }) {
      id
      task
      completed
    }
  }
`;