import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodosAccess } from '../helpers/todosAcess' 

import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import * as uuid from 'uuid'


const logger = createLogger('businessLogictodos')

export async function getTodo(
    userId: string,
    todoId: string
    ): Promise<TodoItem> {
    logger.info('getTodo', { userId, todoId })
    
    return await TodosAccess.getTodoItem(userId, todoId)
    }

export async function getTodos(): Promise<TodoItem[]> {
    logger.info('getTodos')
    
    return await TodosAccess.getAllTodos()
    }


export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
  logger.info('getTodosForUser', { userId })

  const result = await TodosAccess.getListTodosForUser(userId)

  const items = result
  return items as TodoItem[]
}

export async function getTodoDetail(userId: string, todoId: string): Promise<TodoItem> {
    logger.info('getTodosForUser', { userId })
    logger.info('getTodoDetail', { todoId })

    const result = await TodosAccess.getListTodoDetail(userId, todoId)
  
    const items = result
    return items as TodoItem
  }

export async function createTodo(
    userId: string,
    todoName: string,
    dueDate: string,
    notes: string
    ): Promise<TodoItem> {
    const todoId = uuid.v4()
    
    const newItem = {
        userId,
        todoId,
        createdAt: new Date().toISOString(),
        name: todoName,
        dueDate,
        done: false,
        attachmentUrl: null,
        notes
    }
    
    logger.info('createTodo', { newItem })
    
    return await TodosAccess.createTodoItem(newItem)
    }

export async function deleteTodo(
    userId: string,
    todoId: string
    ): Promise<string> {
    logger.info('deleteTodo', { userId, todoId })
    
    await TodosAccess.deleteTodoItem(userId, todoId)
    
    return 
    }

export async function updateTodo(
    userId: string,
    todoId: string,
    updatedTodo: UpdateTodoRequest
    ): Promise<TodoItem> {
    logger.info('updateTodo', { userId, todoId, updatedTodo })
    
    await TodosAccess.updateTodoItem(updatedTodo, todoId, userId)
    
    return 
    }

export async function updateTodoAttachment(
    userId: string,
    todoId: string,
    attachmentUrl: string
    ): Promise<TodoItem> {
    logger.info('updateTodoAttachment', { userId, todoId, attachmentUrl })
    
    await TodosAccess.updateTodoAttachmentUrl(userId, todoId, attachmentUrl)

    return 
    }

export async function generateUploadUrl(
    userId: string,
    todoId: string
    ): Promise<string> {
    logger.info('generateUploadUrl', { userId, todoId })
    
    return await TodosAccess.generateUploadUrl(userId, todoId)
    }

export async function createAttachmentPresignedUrl():Promise<void> {
    logger.info('createAttachmentPresignedUrl')
    return
}

export async function getUploadUrl(
    userId: string,
    todoId: string
    ): Promise<string> {
    logger.info('getUploadUrl', { userId, todoId })
    
    return await TodosAccess.getUploadUrl(userId, todoId)
    }