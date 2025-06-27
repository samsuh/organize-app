import CommentShow from './comment-show'

interface CommentListProps {}

//get comments from db
export default function CommentList({}: CommentListProps) {
  const topLevelComments = comment.filter((comment) => comment.prentId === null)

  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    )
  })

  return (
    <div>
      <h1>All {comments.length} comments</h1>
      {renderedComments}
    </div>
  )
}
