import { supabase } from "../client";

const Comment = ({id, content, setAllComments}) => {

  const handleDelete = async (event) => {
    event.preventDefault();

    await supabase
      .from("Comments")
      .delete()
      .eq("id", id);

    setAllComments((prev) => prev.filter(comment => comment.id != id));
  }

  return (
    <div className="single-comment">
      <span>
        - {content}
      </span>
      <i className="fa fa-times-circle-o fa-lg" onClick={handleDelete}/>
    </div>
  )
};

export default Comment;