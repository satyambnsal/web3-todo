import { BigInt, Address } from '@graphprotocol/graph-ts';
import { Todos, TodoCreated, TodoUpdated } from '../generated/Todos/Todos';
import { Todo } from '../generated/schema';

export function handleCreatedTodo(event: TodoCreated): void {
  let id = event.params.id.toString();
  let title = event.params.text.toString();
  let completed = event.params.completed;

  let newTodo = new Todo(id);
  newTodo.todoId = id;
  newTodo.title = title;
  newTodo.completed = completed;

  // if (sender === null) {
  //   sender = new Sender(senderString);
  //   sender.address = event.params.sender;
  //   sender.createdAt = event.block.timestamp;
  //   sender.purposeCount = BigInt.fromI32(1);
  // } else {
  //   sender.purposeCount = sender.purposeCount.plus(BigInt.fromI32(1));
  // }

  // let purpose = new Purpose(
  //   event.transaction.hash.toHex() + '-' + event.logIndex.toString()
  // );

  // purpose.purpose = event.params.purpose;
  // purpose.sender = senderString;
  // purpose.createdAt = event.block.timestamp;
  // purpose.transactionHash = event.transaction.hash.toHex();

  newTodo.save();
}

export function handleUpdatedTodo(event: TodoUpdated): void {
  let id = event.params.id.toString();
  let title = event.params.text.toString();
  let completed = event.params.completed;

  let todo = Todo.load(id);

  if (todo == null) {
    todo = new Todo(id);
    todo.todoId = id;
  }
  todo.title = title;
  todo.completed = completed;

  todo.save();
}
