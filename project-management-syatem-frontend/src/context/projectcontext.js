import React, { createContext, Component} from 'react';
export const ProjectContext = createContext();

class ProjectContextProvider extends Component{
    state = {
            projects:[
                {title:"project1",isapproved:true,comment:"",id:1},
                {title:"project2",isapproved:false,comment:"",id:2},
                {title:"project3",isapproved:false,comment:"",id:3},
                {title:"project4",isapproved:false,comment:"",id:4},
                {title:"project5",isapproved:true,comment:"",id:5}
            ]
    }
    Approve = (id) => {
        let projects = [...this.state.projects];
        for(var i=0;i<this.state.projects.length;i++){
            if(this.state.projects[i].id===id){
                let project = {...projects[i]};
                if(this.state.projects[i].isapproved===true){
                    alert("Already Approved");
                }else{
                    project.isapproved = !project.isapproved;
                    projects[i]=project;
                    this.setState({projects});
                }
                //console.log(this.state.projects[i]);
            }
        }
        console.log(this.state);
    }
    addComment = (id,comment) => {
        let projects = [...this.state.projects];
        
        for(var i=0;i<this.state.projects.length;i++){
            if(this.state.projects[i].id===id){
                let project = {...projects[i]};
                if(this.state.projects[i].isapproved===true){
                    alert("Already Approved");
                }else{
                    project.comment = comment;
                    projects[i]=project;
                    this.setState({projects});
                }
                //console.log(this.state.projects[i]);
            }
        }
    }

    render(){
        return ( 
            <ProjectContext.Provider value={{...this.state,Approve: this.Approve,addComment: this.addComment}}>
                {this.props.children}
            </ProjectContext.Provider>
        );
    }
}
 
export default ProjectContextProvider;