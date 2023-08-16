import { formatISO9075 } from 'date-fns'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

const PostPage = () => {
    const { id } = useParams()
    const [postInfo, setPostInfo] = useState(null)
    const { userInfo } = useContext(UserContext)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            })
        })
    }, [])

    if (!postInfo) return '';

    return (
        <div className='post-page'>
            <h1>{postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div className="edit-row">
                    <Link to={`/edit/${postInfo._id}`} className="edit-btn">Edit this Post</Link>
                </div>
            )}
            <div className="image">
                <img src={`${process.env.REACT_APP_BASE_URL}/${postInfo.cover}`} alt="image" />
            </div>

            <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    )
}

export default PostPage
