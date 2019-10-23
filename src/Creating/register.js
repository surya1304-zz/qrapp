import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './textfields.css';
import {Redirect} from "react-router-dom";
import { withRouter } from 'react-router-dom';

class Register extends Component{
    constructor(props) {
        super(props);
        this.state =
            {
                FullNameChange : "",
                RoleChange : "",
                EmailChange : "",
                UserNameChange : "",
                PasswordChange : "",
                PlantsChange : "",
                redirect : false,
                plants : [],
            };
        this.onFullChange = this.onFullChange.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPlantsChecked = this.onPlantsChecked.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmitClicked = this.onSubmitClicked.bind(this);
        this.onCancelClicked = this.onCancelClicked.bind(this);
    }

    componentDidMount() {
        let h = [];
        fetch('http://localhost:3000/getplants').then(res=>res.json())
            .then(result => {
                // eslint-disable-next-line array-callback-return
                result.map((plant,index) => {
                    h.push(<div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <input type="checkbox" value={plant.plant_name} name="plant"/>
                                    </div>
                                    <em className="form-control">{plant.plant_name}</em>
                                </div>
                    </div>);
                })
            }).then(red =>{
                this.setState({
                    plants : h,
                });
        })
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/signin'/>;
        }
        return (
            <div>
                <form className='hello'>
                    <div className="form-group">
                        <label htmlFor="exampleInputFullName1">Full Name:</label>
                        <input type="text"
                               name="fname"
                               className="form-control"
                               id="exampleInputFullName1"
                               aria-describedby="emailHelp"
                               placeholder="Full Name"
                               onChange={this.onFullChange}
                               required
                        />
                        <label htmlFor="exampleInputRole1">Role:</label>
                        <input type="text"
                               name="role"
                               className="form-control"
                               id="exampleInputRole1"
                               placeholder="Role"
                               onChange={this.onRoleChange}
                               required
                        />
                        <label htmlFor="exampleInputEmail1">Email:</label>
                        <input type="email"
                               name="email"
                               className="form-control"
                               id="exampleInputEmail1"
                               placeholder="Email"
                               onChange={this.onEmailChange}
                               required
                        />
                        <label htmlFor="exampleInputUserName">User Name:</label>
                        <input type="text"
                               name="uid"
                               className="form-control"
                               id="exampleInputUserName"
                               placeholder="User Name"
                               onChange={this.onUserNameChange}
                               required
                        /><br/>
                        <div>
                            <h4>Select the Plants:</h4>
                            {this.state.plants}
                        </div>
                        <label htmlFor="exampleInputPassword">Password</label>
                        <input type="password"
                               name="password"
                               className="form-control"
                               id="exampleInputPassword"
                               placeholder="Password"
                               onChange={this.onPasswordChange}
                               required
                        />
                        <br/>
                        <input type='submit' onClick={this.onSubmitClicked} value="Register" className='btn btn-success' />
                        <input type='button' onClick={this.onCancelClicked} value='Cancel' className='btn btn-danger' />
                    </div>
                </form>
            </div>
        );
    }

    onFullChange(event) {
        this.setState(
            {FullNameChange : event.target.value},
        );
    }

    onRoleChange(event) {
        this.setState(
            {RoleChange : event.target.value},
        );
    }

    onEmailChange(event) {
        this.setState(
            {EmailChange : event.target.value},
        );
    }

    onUserNameChange(event) {
        this.setState(
            {UserNameChange : event.target.value},
        );
    }

    onPasswordChange(event) {
        this.setState(
            {PasswordChange : event.target.value},
        );
        this.onPlantsChecked();
        console.log(this.state);
    }

    onPlantsChecked() {
        const checkboxes = document.getElementsByName('plant');
        let val = "";
        for (let i=0;i<checkboxes.length;i++)
        {
            if (checkboxes[i].checked)
            {
                val += checkboxes[i].value+"&";
            }
        }
        this.setState({
            PlantsChange : val,
        })
    }

    onSubmitClicked = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/register-user',
            {
                method: "post",
                headers :{
                    "Content-Type" : 'application/json',
                },
                body: JSON.stringify({
                    fname : this.state.FullNameChange,
                    role : this.state.RoleChange,
                    email : this.state.EmailChange,
                    uid : this.state.UserNameChange,
                    plants : this.state.PlantsChange,
                    password : this.state.PasswordChange
                })
            })
            .then(resp => resp.json())
            .then(data => {
                if(data['status'] === 'success')
                {
                    this.setState({
                        redirect : true,
                    })
                }
                else{
                    alert("try Again");
                }
            });

    };

    onCancelClicked(){
        this.props.history.goBack();
    }
}

export default withRouter(Register);


// fname, role, email, uid, plants, password