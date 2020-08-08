import React,{useState, useContext, useRef} from 'react';
import { ProjectContext } from '../../context/projectcontext';


const ProjectForm = ({project}) => {
    const prevCommentRef = useRef();
    const {Approve,addComment} = useContext(ProjectContext);
    const [comment,setComment] = useState('');
    const approve_click = (e) => {
        e.preventDefault();
        Approve(project.id);
    }
    const comment_click = (e) => {
        e.preventDefault();
        setComment(e.target.value);
        if(project.isapproved!==true){
            addComment(project.id,comment);
            prevCommentRef.current = comment;

            console.log(project.id,comment);
            setComment('');
        }else{
            setComment('');
        }
    }
    const prevComment = prevCommentRef.current;

    
    

    return ( 
        <div>
            <div>
                <label>Title : {project.title}</label>
                <label> ID : {project.id}</label>
            </div>
            <div>
                <form>
                    {/* <label>Comment : {project.id.comment}</label> */}
                    <input type="text" placeholder="COMMENTS" value={comment} onChange={(e)=>setComment(e.target.value)} required />
                    <button onClick={comment_click}>ADD COMMENT</button><br />
                </form>
                <p>COMMENT : {prevComment}</p>
                <button onClick={approve_click}>APPROVE</button>
            </div>
        </div>
     );
}
 
export default ProjectForm;