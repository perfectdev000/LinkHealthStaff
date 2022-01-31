import React from 'react';
import { connect } from 'react-redux';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import './fileBrowser.css';
import $ from "jquery";

class FileBrowser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file: false,
        }
    }

    componentWillMount = () => {
        this.setState({file: this.props.file});
    }
    
    componentWillReceiveProps = (newProps) => {
        // if(!newProps.delFile)
            this.setState({file: newProps.file}, ()=>console.log(this.state.file.name));

    }

    dragOverHandler = (e) => {
        e.preventDefault();
        $(e.target).addClass('active');
        $('#' + this.props.prefix + 'dragText').text('Release to Upload File');
    }

    dragLeaveHandler = (e) => {
        $(e.target).removeClass('active');
        $('#' + this.props.prefix + 'dragText').text('Drag & Drop to Upload File');
    }

    dropHandler = (e) => {
        this.fileHandler(e.dataTransfer.files[0]);
    }

    fChangeHandler = (e) => {
        this.fileHandler(e.target.files[0]);          
    }

    fileHandler = (file) => {        
        if(this.props.validateImage){
            if(file)
                this.validateImage(file);
            else {
                this.setState({file: false});
                this.props.setFile(false);
                $('#' + this.props.prefix + 'dropArea').removeClass('active');
                this.props.setDelFile(false);
            }
        } else {
            if(file){               
                this.validateDoc(file);
            }else {
                this.setState({file: false});
                this.props.setFile(false);
                $('#' + this.props.prefix + 'dropArea').removeClass('active');
                this.props.setDelFile(false);
            }
        }
    }

    clickInput = () => {
        $('#' + this.props.prefix + 'input').click();
    }

    deleteFile = () => {
        $('#' + this.props.prefix + 'dropArea').removeClass('active');
        $('#' + this.props.prefix + 'input').val(null);
        this.setState({file: false});
        this.props.setFile(false);
        this.props.setDelFile(false);
    }

    uploadFile = () => {
        $('#' + this.props.prefix + 'dropArea').removeClass('active');
        $('#' + this.props.prefix + 'input').val(null);
        this.setState({file: false});
        this.props.uploadFile();
    }

    validateImage = (file) => {
        let fileType = file.type; //getting selected file type
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
        if(validExtensions.includes(fileType)){ //if user selected file is an image file
          let fileReader = new FileReader(); //creating new FileReader object
          fileReader.onload = ()=>{
            let fileURL = fileReader.result;
            this.props.setImgUrl(fileURL);
          }
          fileReader.readAsDataURL(file);
            this.props.hideFileErr();   
            this.setState({file: file});
            this.props.setFile(file);
            $('#' + this.props.prefix + 'dropArea').addClass('active'); 
            this.props.setDelFile(true);          
        } else {         
            this.props.showFileErr(); 
            this.setState({file: false});
            this.props.setFile(false);
            $('#' + this.props.prefix + 'dropArea').remove('active');
            this.props.setDelFile(false);
        }
      }

      validateDoc = (file) => {
        let fileType = file.type; //getting selected file type
        let validExtensions = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/pdf"]; //adding some valid image extensions in array
        if(validExtensions.includes(fileType)){ //if user selected file is an image file
        //   let fileReader = new FileReader(); //creating new FileReader object
        //   fileReader.onload = ()=>{
        //     let fileURL = fileReader.result;
        //     this.props.setImgUrl(fileURL);
        //   }
        //   fileReader.readAsDataURL(file);
            this.props.hideFileErr();   
            this.setState({file: file});
            this.props.setFile(file);
            $('#' + this.props.prefix + 'dropArea').addClass('active'); 
            this.props.setDelFile(true);          
        } else {         
            this.props.showFileErr(); 
            this.setState({file: false});
            this.props.setFile(false);
            $('#' + this.props.prefix + 'dropArea').remove('active');
            this.props.setDelFile(false);
        }
      }

  render() {
    return (
        <div>
            <div id={this.props.prefix + "dropArea"} className="drag-area" onDragOver={this.dragOverHandler} onDragLeave={this.dragLeaveHandler} onDrop={this.dropHandler}>
                <header id={this.props.prefix + "dragText"}>Drag and Drop<span style={{display: this.props.uploadFile?'none':'inline'}}> to Upload File</span></header>
                <p>OR</p>
                <p style={{fontSize: '16px', color: '#009CDE', display: ((this.state.file || this.props.fname) && !this.props.uploadFile)? 'block':'none'}}>
                    Selected file : {this.state.file?this.state.file.name:(this.props.fname?this.props.fname:null)}
                    <span style={{marginLeft: '18px', cursor: 'pointer'}} onClick={this.deleteFile}>
                        <DeleteIcon style={{color: '#009CDE'}}/>
                    </span>
                </p>
                <div className='row'>
                    <button id={this.props.prefix + "button"} style={{maxWidth: '300px'}} onClick={this.clickInput}><span><CloudUploadIcon style={{marginRight: '12px'}}/></span>UPLOAD YOUR {this.props.title}</button>
                </div>
                <input id={this.props.prefix + "input"} type="file" value={!this.state.val ? "" : this.state.val} hidden onChange={this.fChangeHandler} name="file"/>
            </div>
        </div>
    );
  }
}

export default connect()(FileBrowser);
