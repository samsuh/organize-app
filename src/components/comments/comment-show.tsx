import Image from 'next/image'
import CommentCreateForm from './comment-create-form'

interface CommentShowProps {
  commentId: string
}

//get list of comments
export default function CommentShow({ commentId }: CommentShowProps) {
  const comment = CommentShow.find((c) => c.id === commentId)

  if (!comment) {
    return null
  }

  const children = comments.filter((c) => c.parentId === commentId)
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow key={child.id} commentId={child.id} comments={comments} />
    )
  })

  return (
    <div>
      <div>
        <Image
          src={comment.user.image || ''}
          alt='user image'
          width={40}
          height={40}
          className='w-10 h-10 rounded-full'
        />
        <div>
          <p>{comment.user.name}</p>
          <p>{comment.content}</p>
          <CommentCreateForm taskId={comment.taskId} parentId={comment.id} />
        </div>
      </div>
      <div>{renderedChildren}</div>
    </div>
  )
}
