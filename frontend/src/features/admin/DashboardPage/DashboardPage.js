import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { adminActions } from '../../../actions';
import { common } from "../../../helpers";

class DashboardPage extends React.Component{

 constructor(props) {
    
        super(props);
         this.paidcandidates=[],
         this.paidemployers=[],
         this.unpaidcandidates=[],
         this.unpaidemployers=[],
         this.paidemployers_one=[],
         this.paidemployers_two=[],
         this.paidemployers_three=[],
         this.reviewscount=0,
         this.state = {
        };
        
    }
 componentWillMount() {
   console.log("test====");
   this.props.dispatch(adminActions.getAlldashboardData());

             
 }
 countpaidcandidates(){
   this.reviewscount=0;
    this.paidcandidates= this.props.dashboard.data.userData && this.props.dashboard.data.userData.filter(item=>{
      if(item.roles== "candidate" && item.paidOn == true){ 
        return  item;
      }
    });
       console.log("paidcandidates===",this.paidcandidates);
 
    this.unpaidcandidates= this.props.dashboard.data.userData && this.props.dashboard.data.userData.filter(item=>{ 
      if (item.roles== "candidate" && item.paidOn == false){
        return item;
      }
    });
    this.unpaidemployers= this.props.dashboard.data.userData && this.props.dashboard.data.userData.filter(item=>{ 
     
      if (item.roles== "hr" && item.hrpaidOn === undefined){
        console.log("item",item);
        return item;
      }
    });
    this.paidemployers= this.props.dashboard.data.userData && this.props.dashboard.data.userData.filter(item=>{ 
      if (item.roles== "hr" && item.hrpaidOn == true){

        return item;
      }
    });
    var paidemployersone= this.props.dashboard.data.employeedata && this.props.dashboard.data.employeedata.filter(item=>{ 
      var paiddata= this.props.dashboard.data.saveddocumentData && this.props.dashboard.data.saveddocumentData.filter(itemdata=>{ 
         /*console.log("itemdata.user_id.toString()====",itemdata.user_id.toString());
          console.log("iitem.id====",item.id.toString());
          console.log("item.experienceYear====",item.experienceYear);
          console.log("common.experince[0].value====",common.experince[0].value);
        */if(typeof item.experienceYear=='undefined'){
          item.experienceYear=0;
        } 
        if (item && itemdata.user_id.toString() == item.id.toString() && (common.experince[0].value >= item.experienceYear)  ){
          return itemdata;
        }
      });
      console.log("paiddata====",paiddata);
      if(paiddata && paiddata.length > 0){
       return this.paidemployers_one=paiddata;
      }
    });
    var paidemployerstwo= this.props.dashboard.data.employeedata && this.props.dashboard.data.employeedata.filter(item=>{ 
         
      var paiddata= this.props.dashboard.data.saveddocumentData && this.props.dashboard.data.saveddocumentData.filter(itemdata=>{ 
        if (itemdata.user_id.toString() == item.id.toString() && common.experince[1].value >= item && item.experienceYear ){
            return itemdata;
          
        }
      });
      if(paiddata && paiddata.length > 0){
       return this.paidemployers_two=paiddata;
      }
    });
   
    var paidemployersthree = this.props.dashboard.data.employeedata && this.props.dashboard.data.employeedata.filter(item=>{ 
      
      var paiddata = this.props.dashboard.data.saveddocumentData && this.props.dashboard.data.saveddocumentData.filter(itemdata=>{ 
        if (itemdata.user_id.toString() === item.id.toString() && common.experince[2].value >= item.experienceYear){
          return itemdata;
        }
      });
      if(paiddata && paiddata.length > 0){
       return this.paidemployers_three=paiddata;
      }
     });


    var data = this.props.dashboard.data.employeedata && this.props.dashboard.data.employeedata.filter(item=>{
     if(item.postreviews.length>0){
      item.postreviews.filter(result=>{ 
        this.reviewscount = parseFloat(result.overall) + this.reviewscount;
        })
       } 
    });

  }    

 render() {
        if(this.props.dashboard){
            {this.countpaidcandidates()}
        } 

        return (
            <main className="col-xs-12 col-sm-8 col-lg-9 col-xl-10 pt-3 pl-4 ml-auto">
            <h3 className="admin-title">   Dashboard</h3>
            <section className="row">
                    <div className="col-sm-12">
                        <section className="row">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="jumbotron"> 
                                          <Link to = "/CandidatePage?paidOn=false">
                                            <span className="dashbrd-icons"><i className="fa fa-fw fa-users"></i></span>
                                            <h3>{this.unpaidcandidates.length}</h3>                                          
                                            <h6>Free Candidates</h6> 
                                            </Link>                                                
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="jumbotron"> 
                                        <Link to = "/CandidatePage?paidOn=true">
                                            <span className="dashbrd-icons"><i className="fa fa-fw fa-users"></i></span>
                                            <h3>{this.paidcandidates.length}</h3>                                  
                                            <h6>Paid Candidates</h6> 
                                            </Link>                                                 
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="jumbotron"> 
                                            <span className="dashbrd-icons"><i className="fa fa-fw fa-list-alt"></i></span> <h3>{this.reviewscount}</h3>                          
                                            <h6>Total Posted Reviews</h6>                                                
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                <div className="col-lg-4">
                              
                                        <div className="jumbotron">                         
                                            <span className="dashbrd-icons"><i className="fa fa-fw fa-users"></i></span>
                                            <h3>{this.unpaidemployers.length}</h3>                        
                                            <h6>Free Employers</h6>          
                                        </div>
                                        
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="jumbotron"> 
                                            <span className="dashbrd-icons"><i className="fa fa-fw fa-users"></i></span><h3>{this.paidemployers && this.paidemployers.length}</h3>  
                                            <h6><span className="paid-plans-count">0-5 years - {this.paidemployers_one && this.paidemployers_one.length}</span> |
                                            <span className="paid-plans-count">5-15 years - {this.paidemployers_two && this.paidemployers_two.length}</span> |
                                            <span className="paid-plans-count">15+ years - {this.paidemployers_three.length}</span> |
                                            Paid Employers
                                            </h6>
                                        </div>
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
  console.log("stae11====",state);
  const { authentication, admins} = state;
  const { user } = authentication;
  const { dashboard } = admins; 
  return {
    user,
    dashboard
  };
}


const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);
export { connectedDashboardPage as DashboardPage };