import { gql, useQuery } from '@apollo/client';
import { QueryResult } from './QueryResult';
import { TodoList } from './TodoList';

const TODOS = gql`
  query getTodos {
    todos {
      id
      title
      completed
    }
  }
`;

export const SubGraphTodoList = ({
  handleToggle,
}: {
  handleToggle: (id: number) => void;
}) => {
  const { loading, error, data, refetch } = useQuery(TODOS);
  console.log(data);
  return (
    <QueryResult loading={loading} error={error} data={data}>
      <TodoList todos={data?.todos} handleToggle={handleToggle}></TodoList>
      <button
        className="fixed right-3 bottom-3 btn btn-outline"
        onClick={() => refetch()}
      >
        Refresh
      </button>
    </QueryResult>
  );
};
