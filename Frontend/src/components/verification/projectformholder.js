import React from 'react';
import ProjectContextProvider from '../../context/projectcontext';
import ProjectForm from './projectform';

const ProjectFormHolder = (props) => {
    return(
        <ProjectContextProvider>
            {/* {console.log(props.location.aboutProps.project.project)} */}
            <ProjectForm project={props.location.aboutProps.project.project}/>
        </ProjectContextProvider>
    );



}



export default ProjectFormHolder;


//     const {Approve,addcomment} = useContext(ProjectContext);
//     const comment_click=(e) => {
//         e.preventDefault();
//     }
//         addComment(comments);
//         const ShowComment = () => {ShowComment()};
//         setComment('');
//     }
//     const approve_click = (e) => {
//         e.preventDefault();
    
//         Approve();
//     return ( 
//         <div>
//             <div>
//                 <label>Title : {props.location.aboutProps.project.title}</label>
//                 <label> ID : {props.location.aboutProps.project.id}</label>
//             </div>
//             <form>
//                 <div>
//                     <input type="text" placeholder="COMMENTS" required />
//                     <button onClick={comment_click}>ADD COMMENT</button>
//                 </div>
//                 <button onClick={approve_click}>APPROVE</button>
//             </form>
//         </div>
//     );
    
//     return(
//             {console.log(props.location.aboutProps.project)}
//     );
