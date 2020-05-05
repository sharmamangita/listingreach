import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { adminActions } from '../../../actions';
import { Alert } from 'reactstrap';
import config from 'config';
class PricePage extends React.Component{

    constructor(props) {
        super(props);
          this.state = {
            visible : false,
            plan: {
                plan: '',
                experience_one : {},
                experience_two: {},
                experience_three: {}
            },
            experience_one: Object.assign({
              price: '',
              exp: ''
            },this.props.plan && this.props.plan.experience_one  ? this.props.plan.experience_one[0] : ''),
            experience_two: Object.assign({
              price2: '',
              exp2: ''
            },this.props.plan && this.props.plan.experience_two  ? this.props.plan.experience_two[0] : ''),
            experience_three: Object.assign({
              price3: '',
              exp3: ''
            },this.props.plan && this.props.plan.experience_three  ? this.props.plan.experience_three[0] : ''),
        
            submitted: false,
        };
        const { dispatch } = this.props;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onShowAlert = this.onShowAlert.bind(this);
        this.closebtn = this.closebtn.bind(this);
    
    }

	componentDidMount() {
		this.props.dispatch(adminActions.getPlan()); 
    
     this.setState({visible:true},()=>{
      window.setTimeout(()=>{
        this.setState({visible:false})
      },2000)
    });
  }
  handleChange(event) {
      const { name, value } = event.target;
       const { plan , experience_one,experience_two,experience_three} = this.state;
      if(event.target.name=='plan'){
        let selectedplan = event.target.value;
        this.setState({
          plan:{
            ...plan,
            plan: selectedplan
          }
        });
      }
      this.setState({
          
          experience_one:{
              ...experience_one,
              [name]: value
          },
          experience_two:{
            ...experience_two,
            [name]: value
          },
          experience_three:{
            ...experience_three,
            [name]: value
          },
      });
  }
    
  closebtn(){
    this.setState({visible:false})
  }
    

  handleSubmit(event) {
    event.preventDefault();
      this.setState({ submitted: true });
      const { plan } = this.state;
      const { dispatch } = this.props;
      plan.experience_one={"exp" :'9',"price" :this.state.experience_one.price};
      plan.experience_two={"exp2" :'19',"price2" :this.state.experience_two.price2}; 
      plan.experience_three={"exp3" :'30',"price3" :this.state.experience_three.price3}; 
      if (plan.plan && plan.experience_one && plan.experience_two && plan.experience_three) {
        dispatch(adminActions.PlanRegister({user: plan}));
      }
  }
  onShowAlert(){
     this.setState({visible:true},()=>{
      window.setTimeout(()=>{
        this.setState({visible:false})
      },2000)
    });
  }
  
  render() {
      const { plan,experience_one,experience_two,experience_three, submitted,disabled } = this.state; 
      if(this.props.plan && this.props.plan!='' && plan.plan==''){
       
        this.setState({plan:this.props.plan})
        this.setState({
          experience_one: Object.assign({
            price: '',
            exp: ''
          },this.props.plan && this.props.plan.experience_one  ? this.props.plan.experience_one[0] : ''),
          experience_two: Object.assign({
            price2: '',
            exp2: ''
          },this.props.plan && this.props.plan.experience_two  ? this.props.plan.experience_two[0] : ''),
          experience_three: Object.assign({
            price3: '',
            exp3: ''
          },this.props.plan && this.props.plan.experience_three  ? this.props.plan.experience_three[0] : ''),
        })

      }
      
      const { alert } = this.props;
      return (
      <main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
        <h3 className="admin-title">   Pricing</h3>
		   <section className="row">
        <div className="col-sm-12">
          <section className="row">

            <div className="col-12">
            <div className="text-center mb-5 section-heading">
                { alert.message &&
                <Alert className={`alert ${alert.type}`} isOpen={this.state.visible} > <button type="button" onClick={this.closebtn} className="close">
					        <span aria-hidden="true">&times;</span>
						      </button>{alert.message}</Alert>
                }
            </div>
            <div className="card mb-4">
              <div className="card-block">                    
                <form onSubmit={this.handleSubmit} className="form">
                  <div className="form-group row">
                    <label className="col-md-3 col-form-label"><b>Candidate Price</b></label>
                    <div className={'col-md-4 price' + (submitted && !plan.plan ? ' has-error' : '')}>
                      <span className="mt-2 mr-1">$</span> <span>
                        <input className="form-control" type="text" name="plan" value={plan.plan} onChange={this.handleChange} placeholder="Price"/>
                        {submitted && !plan.plan &&
                            <div className="help-block red">Plan is required</div>
                        }</span> <span className="mt-2 ml-1">/ month</span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 col-form-label"><b>Employers Price</b></label>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 col-form-label">Experience 0-5 years</label>
                    <div className={'col-md-4 price' + (submitted && !experience_one.price ? ' has-error' : '')}>
                      <span className="mt-2 mr-1">$</span> <span>
                      <input className="form-control" type="text" name="price" value={experience_one ? experience_one.price :''} onChange={this.handleChange} placeholder="Price"/>
                       {submitted && !experience_one.price &&
                            <div className="help-block red">Experience is required</div>
                        }</span> <span className="mt-2 ml-1">/ search</span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 col-form-label">Experience 5-15 years</label>
                    <div className={'col-md-4 price' + (submitted && !experience_two.price2 ? ' has-error' : '')}>
                      <span className="mt-2 mr-1">$</span> <span><input className="form-control" type="text" name="price2" value={experience_two ? experience_two.price2:''} onChange={this.handleChange} placeholder="Price"/>
                       {submitted && !experience_two.price2 &&
                            <div className="help-block red">Experience is required</div>
                        }</span> <span className="mt-2 ml-1">/ search</span>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 col-form-label">Experience 15 years and beyond</label>
                    <div className={'col-md-4 price' + (submitted && !experience_three.price3 ? ' has-error' : '')}>
                      <span className="mt-2 mr-1">$</span> <span><input className="form-control" type="text" name="price3" value={experience_three ? experience_three.price3:''} onChange={this.handleChange} placeholder="Price"/>
                       {submitted && !experience_three.price3 &&
                            <div className="help-block red">Experience is required</div>
                        }</span><span className="mt-2 ml-1">/ search</span>
                    </div>
                  </div>
                  
                  <div className="form-group row">
                  <div className="col-md-4">
                  </div>
                  <div className="col-md-8">                      
                  <div className="sign-btn">
                  <input type="submit" value="Update" onClick={()=>{this.onShowAlert()}} className="btn btn-primary pill px-4 py-2" />
                
                  </div>
                  </div>
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
  const { authentication, users,admins} = state;
  console.log("this=======",state);
  const { user } = authentication;
  const { alert } = state;
  const { plan } = admins;
  return {
    user,
    alert,
    plan
  };
}



const connectedPricePage = connect(mapStateToProps)(PricePage);
export { connectedPricePage as PricePage };

