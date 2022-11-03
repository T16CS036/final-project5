import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getUploadUrl, uploadFile, patchTodo, getTodos, getTodoDetail } from '../api/todos-api'
import { Todo } from '../types/Todo'

enum UploadState {
  NoUpload,
  FetchingPresignedUrl,
  UploadingFile,
}

interface EditTodoProps {
  match: {
    params: {
      todoId: string
    }
  }
  auth: Auth
}

interface EditTodoState {
  file: any
  uploadState: UploadState
  notes: String
}

export class EditTodo extends React.PureComponent<
  EditTodoProps,
  EditTodoState
> {
  state: EditTodoState = {
    file: undefined,
    uploadState: UploadState.NoUpload,
    notes: ''
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    this.setState({
      file: files[0]
    })
  }

  handleNoteChange = (event: { target: { value: String } }) => {
    const note = event.target.value
    this.setState({
      notes: note
    })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (!this.state.file) {
        alert('File should be selected')
        return
      }

      this.setUploadState(UploadState.FetchingPresignedUrl)
      const uploadUrl = await getUploadUrl(this.props.auth.getIdToken(), this.props.match.params.todoId)
      console.log(uploadUrl)
      this.setUploadState(UploadState.UploadingFile)
      await uploadFile(uploadUrl, this.state.file)
      console.log(this.props.auth.getIdToken())
      const todos = await getTodoDetail(this.props.auth.getIdToken(), this.props.match.params.todoId)
      console.log(todos)
      // await patchTodo(this.props.auth.getIdToken(), this.props.match.params.todoId, {
      //   name: '',
      //   dueDate: '',
      //   done: false
      // })

      alert('File was uploaded!')
    } catch (e) {
      alert('Could not upload a file: ' + (e as Error).message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
  }



  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }

  render() {
    return (
      <div>
        <h1>Upload new image</h1>
        <h2> {this.props.match.params.todoId} </h2>
        
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>File</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={this.handleFileChange}
            />
          </Form.Field>
          <Form.Field>
            <label>note</label>
            <textarea 
            placeholder="put some note on your image"
            onChange={this.handleNoteChange}
            />
          </Form.Field>
          {this.renderButton()}
          {this.renderTmp()}
        </Form>
        
      </div>
    )
  }

  renderButton() {

    return (
      <div>
        {this.state.uploadState === UploadState.FetchingPresignedUrl && <p>Uploading image metadata</p>}
        {this.state.uploadState === UploadState.UploadingFile && <p>Uploading file</p>}
        <Button
          loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
        >
          Upload
        </Button>
      </div>
    )
  }
  renderTmp() {

    return (
      <div>
        <h1> {this.state.notes} </h1>
      </div>
    )
  }
}
