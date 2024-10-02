
interface CommentProps{
  setCommentOpen: (open: boolean) => void; 
  commentOpen: boolean;
  statusComment: ()=> void;
}


const Comment: React.FC<CommentProps> = ({ statusComment }) => {
  return <p className="commentaire" onClick={statusComment}>ici bientôt les commentaire</p>
}

export default Comment;