import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Editor from '../Editor'

const EditPost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState('')
    const [cover, setCover] = useState('')
    const [redirect, setRedirect] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/post/` + id).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title)
                setContent(postInfo.content)
                setSummary(postInfo.summary)
            })
        })
    }, [])

    const UpdatePost = async (ev) => {
        ev.preventDefault()

        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('id', id)
        if (files?.[0]) {
            data.set('file', files?.[0])
        }

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/post`, {
            method: 'PUT',
            body: data,
            credentials: 'include',
        })
        if (response.ok) {
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }
    return (
        <div>
            <form onSubmit={UpdatePost}>
                <input type="title" placeholder='Title' value={title} onChange={ev => setTitle(ev.target.value)} />
                <input type="summary" placeholder='Summary' value={summary} onChange={ev => setSummary(ev.target.value)} />
                <input type='file' onChange={ev => setFiles(ev.target.files)} />

                <Editor onChange={setContent} value={content} />
                <button style={{ marginTop: '10px' }}>Update Post</button>
            </form>
        </div>
    )
}

export default EditPost
