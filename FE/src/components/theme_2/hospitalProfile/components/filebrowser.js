import React from 'react';
import { connect } from 'react-redux';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import $ from "jquery";

class FileBrowser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            file: false,
            prefix: '_'
        }
    }

    componentWillMount = () => {
        this.setState({file: this.props.file});
    }
    
    componentWillReceiveProps = (newProps) => {
        this.setState({file: newProps.file});
    }

    dragover_handler = (e) => {
        e.preventDefault();
        $(e.target).addClass('active');
        $('#' + this.state.prefix + 'dragText').text('Release to Upload File');
    }

    dragleave_handler = (e) => {
        $(e.target).removeClass('active');
        $('#' + this.state.prefix + 'dragText').text('Drag & Drop to Upload File');
    }

    drop_handler = (e) => {
        this.fileHandler(e.dataTransfer.files[0]);
    }

    fchange_handler = (e) => {
        this.fileHandler(e.target.files[0]);
    }

    fileHandler = (file) => {
        if(file)
            this.image_validate(file);
        else {
            this.setState({file: false});
            this.props.setFile(false);
            $('#' + this.state.prefix + 'dropArea').removeClass('active');
            this.props.setDelFile(false);
        }
    }

    clickInput = () => {
        $('#' + this.state.prefix + 'input').click();
    }

    delete_file = () => {
        $('#' + this.state.prefix + 'input').val(null);
        this.setState({file: false});
        this.props.setFile(false);
        this.props.setDelFile(false);
    }

    image_validate = (file) => {
        let fileType = file.type; //getting selected file type
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
        if(validExtensions.includes(fileType)){ //if user selected file is an image file
            
            if(file.size >= 2097152 )
                this.props.showFileErr("File size is bigger than 2MB. Please choose another one.");
            else
                this.props.hideFileErr();

          let fileReader = new FileReader(); //creating new FileReader object
          fileReader.onload = ()=>{
            let fileURL = fileReader.result;
            this.props.setImgUrl(fileURL);
          }
          fileReader.readAsDataURL(file);  
            this.setState({file: file});
            this.props.setFile(file);
            $('#' + this.state.prefix + 'dropArea').addClass('active'); 
            this.props.setDelFile(true);          
        } else {         
            this.props.showFileErr(); 
            this.setState({file: false});
            this.props.setFile(false);
            $('#' + this.state.prefix + 'dropArea').remove('active');
            this.props.setDelFile(false);
        }
      }

  render() {
    return (
        <div>
            <div id={this.state.prefix + "dropArea"} className="drag-area" onDragOver={this.dragover_handler} onDragLeave={this.dragleave_handler} onDrop={this.drop_handler}>
                <header id={this.state.prefix + "dragText"}>Drag and Drop</header>
                <p>OR</p>
                <p style={{fontSize: '16px', color: '#009CDE', display: (this.state.file || this.props.fname)? 'block':'none'}}>
                    Selected file : {this.state.file?this.state.file.name:null}
                    <span style={{marginLeft: '18px'}} onClick={this.delete_file}>
                        <DeleteIcon style={{color: '#009CDE'}}/>
                    </span>
                </p>
                <div className='row'>
                    <button id={this.state.prefix + "button"} onClick={this.clickInput}><span><CloudUploadIcon style={{marginRight: '12px'}}/></span>UPLOAD YOUR {this.props.title}</button>
                </div>
                <p>(Maximum image size - 2MB)</p>
                <input id={this.state.prefix + "input"} type="file" hidden onChange={this.fchange_handler} name="file"/>
            </div>
        </div>
    );
  }
}

export default connect()(FileBrowser);
