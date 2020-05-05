import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminActions } from '../../../actions';
import { EditorState, convertToRaw,ContentState,convertFromHTML  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Select from 'react-select';
import { Alert } from 'reactstrap';

const options = [
  { value: 'About Us', label: 'About Us' },
  { value: 'Privacy', label: 'Privacy' },
  { value: 'Disclaimer', label: 'Disclaimer' },
  { value: 'Legal', label: 'Legal' },
];

class ContentPage extends React.Component{

  constructor(props) {
  super(props);
  this.state = {
    selectedOption: null,
    editorState: EditorState.createEmpty(),
    page:'',
    content:'',
    visible : false,
    submitted: false
  };

  this.onEditorStateChange = this.onEditorStateChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.closebtn = this.closebtn.bind(this);
  this.props.dispatch(adminActions.getContent());
   }

 componentDidMount() {


 }

  closebtn(){
   this.setState({visible:false})
  }
  onEditorStateChange(editorState){ 
    var edior = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    const Entities = require('html-entities').XmlEntities;
    const entities = new Entities();
    this.setState({content:entities.encode(edior)});
    this.setState({
      editorState,
    });
  }
  handleChange(selectedOption){
    const { dispatch } = this.props;
    this.setState({selectedOption});
    this.setState({page:selectedOption.value});
    if(this.props.pageData){
      const Entities = require('html-entities').XmlEntities;
      const entities = new Entities();
      var filteredpages = this.props.pageData.filter(item => {
        if(item.page==selectedOption.value){
          const contentpage = item.content;
          this.setState({editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(
            convertFromHTML(entities.decode(contentpage))
            )
            )
          });
        }
      });
    }
  }
  
  handleSubmit(e) { 
    e.preventDefault();
    this.setState({ submitted: true });  
    const {page,content} = this.state; 
    const { dispatch } = this.props;
    if(page && content){
      dispatch(adminActions.updatecontent(page,content)); 
      this.setState({visible:true},()=>{
        window.setTimeout(()=>{
          this.setState({visible:false})
        },5000)
      });
    }
  }

  render() {
  const {editorState,selectedOption,contentState} = this.state;
  const {alert} = this.props;
    return (
    <main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
      <h3 className="admin-title">   Content</h3>
      <section className="row">
        <div className="col-sm-12">
        <section className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-block">
              { alert.message &&
                <Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close">
                <span aria-hidden="true">&times;</span>
                </button>{alert.message}</Alert>
              }                                        
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-group row selectpage">
                  <label className="col-md-3 col-form-label">Select Page</label>
                  <div className="col-md-4">
                    <Select value={selectedOption} onChange={this.handleChange} options={options} />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-md-3 col-form-label">Edit Content</label>
                    <div className="col-md-9">
                      <Editor
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      editorState={editorState}
                      onEditorStateChange={this.onEditorStateChange}
                      />
                    </div>
                </div> 
                <div className="sign-btn text-center">
                  <button className="btn btn-success" type="submit">Update</button>
                </div>
              </form>
            </div>
            </div>
          </div>
          </section>
        </div>
      </section> 
      </main>   
    );
    } 
  }

function mapStateToProps(state) {
  const { authentication,admins,alert} = state;
  const { user } = authentication;
  console.log("state====",state);
  const { pageData } = admins;
  return {
    user,
    alert,
    pageData
  };
}
const connectedContentPage = connect(mapStateToProps)(ContentPage);
export { connectedContentPage as ContentPage };
