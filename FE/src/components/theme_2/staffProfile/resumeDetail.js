import React from 'react';
import { connect } from 'react-redux';
import FileBrowser from './components/fileBrowser';
import ErrorState from '../../theme_1/staffSignUp/components/errorState';
import DeleteIcon from '@material-ui/icons/Delete';
import Pending from '../../modals/pending';
import { SET_SP_PROFILE, SET_AUTH, SET_TEMP_FILE } from '../../../constants/actionTypes';
import { callApi, setSession } from '../../../action';

const mapStateToProps = state => {
    return {
        _id: state.staffProfile._id,
        resume: state.staffProfile.resume,
        tempFile: state.staffProfile.tempFile
    }
};

const mapDispatchToProps = dispatch => ({
    setStaffProfile: (data) => dispatch({ type: SET_SP_PROFILE, data }),
    setAuth: (data) => dispatch({ type: SET_AUTH, data }),
    setTempFile: (data) => dispatch({ type: SET_TEMP_FILE, data })
});

class ResumeDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resume: '',
            lastUpdated: '',
            file: false,
            delFile: false,
            fileErr: 'none',
            showPending: 'none',
            title: 'Uploading Your Resume'
        }
    }
    componentWillReceiveProps = (newProps) => {
        this.initState(newProps);
    }

    componentWillMount = async () => {
        this.props.setCurPos("resumeDetail");
        this.initState(this.props);
    }

    initState = (props) => {
        var resume = props.resume.link.split('/')[3];
        var date = new Date(props.resume.lastUpdated);//new Date(props.contacts.updated_at);
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        var hr = date.getHours();
        var min = date.getMinutes();
        d = d < 10 ? '0' + d : d;
        m = m < 10 ? '0' + m : m;
        hr = hr < 10 ? '0' + hr : hr;
        min = min < 10 ? '0' + min : min;
        var AP = hr >= 12 ? 'PM' : 'AM';
        date = hr + ':' + min + ' ' + AP + ' ' + m + '/' + d + '/' + y;
        this.setState({ resume: resume, lastUpdated: date, file: props.tempFile });
    }

    componentDidMount = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setDelFile = (del) => {
        this.setState({ delFile: del });
        if (del && this.state.fileErr === 'block')
            this.hideFileErr();
    }

    setFile = (file) => {
        this.setState({ file: file });
        this.props.setTempFile({ tempFile: file });
    }

    showFileErr = () => {
        this.setState({ fileErr: 'block' });
    }

    hideFileErr = () => {
        this.setState({ fileErr: 'none' });
    }

    updateDB = async (data) => {
        var token = "staff_kackey_" + localStorage.getItem('token');
        var _id = this.props._id;
        var res = await callApi("POST", "/v1/LHS/staff/update/" + _id, token, data);
        setSession(res.token, res.data._id, 'staff');
        this.props.setStaffProfile(res.data);
        data = {
            name: res.data.name,
            type: 'staff',
            avatar: res.data.avatar,
            badge: res.data.badge
        }
        this.props.setAuth(data);
        this.setState({ showPending: 'none' });
    }

    uploadFile = async () => {
        // this.props.setTempFile({tempFile: false});
        this.setState({ showPending: 'block', title: 'Deleting Your Resume' });
        await callApi('POST', '/v1/LHS/file/delete', null, { link: this.props.resume.link });
        this.setState({ showPending: 'block', title: 'Uploading Your Resume' });
        var res = await callApi('POST', '/v1/LHS/file/upload', null, { file: this.state.file }, true);
        var data = {
            resume: {
                link: res.upload.upload.link + "",
                lastUpdated: new Date()
            }
        }
        this.updateDB(data);
    }

    deleteFile = async () => {
        // this.props.setTempFile({tempFile: false});
        this.setState({ showPending: 'block', title: 'Deleting Your Resume' });
        var res = await callApi('POST', '/v1/LHS/file/delete', null, { link: this.props.resume.link });
        console.log(res);
        var data = {
            resume: {
                link: "",
                lastUpdated: new Date()
            }
        }
        this.updateDB(data);
    }


    render() {
        return (
            <div className="t2_sp_work">
                <div className="t2_sp_work_title">
                    Resume Details
                </div>
                <div className="row t2_sp_work_container">
                    <div className="col-md-9 col-sm-6" style={{ padding: 0, paddingLeft: 15 }}>
                        <h6>Resume name</h6>
                        <hr className="t2_sp_hr" style={{ marginTop: 15, marginBottom: 15 }} />
                        <h6 style={{ color: '#009CDE' }}><a style={{ textDecoration: 'none' }} href={this.props.resume.link} download target="new">{this.state.resume}</a></h6>
                    </div>
                    <div className="col-md-3 col-sm-6" style={{ padding: 0, paddingRight: 15 }}>
                        <h6>Last Update</h6>
                        <hr className="t2_sp_hr" style={{ marginTop: 15, marginBottom: 15 }} />
                        <h6 style={{ display: this.props.resume.link === "" ? "none" : "inline" }}>
                            {this.state.lastUpdated}
                            <span style={{ marginLeft: '18px', cursor: 'pointer', float: 'right ' }} onClick={this.deleteFile}>
                                <DeleteIcon />
                            </span>
                        </h6>
                    </div>
                    <FileBrowser setFile={this.setFile} validateImage={false} showFileErr={this.showFileErr} title="RESUME" uploadFile={this.uploadFile}
                        hideFileErr={this.hideFileErr} setImgUrl={this.setImgUrl} file={this.state.file} setDelFile={this.setDelFile} />
                    <ErrorState show={this.state.fileErr} name="The PDF, DOC, DOCX file is required." />
                </div>
                <Pending display={this.state.showPending} title={this.state.title} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeDetail);
