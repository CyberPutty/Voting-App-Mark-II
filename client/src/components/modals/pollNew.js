import React from 'react';
import Entry from './entry.js';
import ModalWrapper from './modalWrapper.jsx';

class PollNew extends React.Component{
    componentDidMount(){
        this.props.resetForm();
    }

    newPoll= (event)=>{ 
     event.preventDefault(); 
        const field=[];
     Array.from(event.target.field).map(function(data){
         field.push(data.value);
     });
    
    const body={
        title: event.target.title.value,
        field: field
    }
    console.log(body);
     this.props.newPoll(body);
     
    }

render(){


    return(
        <div className="">
        
<ModalWrapper {...this.props} showOk={false} width={400}>
<form  onSubmit={this.newPoll}>
           <div><label>Title: </label><input name="title" required/></div>
             <Entry index={0} required/>
            {this.props.entries.map(function(entry,index){
                console.log(entry);    
                return <Entry index={index+1}  />;
            })}
            
            
            <button onClick={this.props.addSelection}>new option</button>
            <button type="submit">create Poll</button>
            <button onClick={this.props.removeSelection}>remove</button>
        </form>
</ModalWrapper>
        </div>


    );
}



}
export default PollNew;