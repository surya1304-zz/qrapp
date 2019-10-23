import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Link} from 'react-router-dom';
import './FinalNav.css';
import 'hamburgers/dist/hamburgers.css';
import 'hamburgers/index';
import 'font-awesome/css/font-awesome.css';
import {Button} from "@material-ui/core";

class FinalNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plant: sessionStorage.getItem('plant') !== null ? sessionStorage.getItem('plant') : sessionStorage.getItem('plants').split('&')[0].toLowerCase(),
            html1: "",
            html2: "",
            html3: "",
            current: 0,
            startdate: '16/10/2019',
            endDate: '1/11/2019',
            year: 0,
        };
        this.OnPlantChange = this.OnPlantChange.bind(this);
        this.SelectCycle = this.SelectCycle.bind(this);
        this.Selectstartdate = this.Selectstartdate.bind(this);
        this.SelectEndDate = this.SelectEndDate.bind(this);
        this.Hello = this.Hello.bind(this);
        this.setStateSynchronous = this.setStateSynchronous.bind(this);
    }

    setStateSynchronous(stateUpdate) {
        return new Promise(resolve => {
            this.setState(stateUpdate, () => resolve());
        });
    }

    Hello() {
        document.getElementById('sidebar').classList.toggle('active');
        this.props.handle();
    }

    SelectCycle() {
        let html = this.props.pr.cycle;
        let html1 = html.replace('undefined', this.props.number);
        this.setState({
            html1: html1,
        });
    }

    Selectstartdate() {
        let html = this.props.pr.startdate;
        let html1 = html.replace('undefined', this.state.startdate);
        this.setState({
            html2: html1,
        });
    }

    SelectEndDate() {
        let html = this.props.pr.endDate;
        let html1 = html.replace('undefined', this.state.endDate);
        this.setState({
            html3: html1,
        });
    }

    componentDidMount() {
        setInterval(this.SelectCycle, 500);
        if (this.props.plantstats) {
            setInterval(this.Selectstartdate, 500);
            setInterval(this.SelectEndDate, 500);
        }
        fetch('http://localhost:3000/get-cycle-data', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plant: this.state.plant,
            })
        })
            .then(res => res.json())
            .then(data => {
                let {status,startdate, endDate, currentCycle, contractyear} = data;
                if(status!=='Success')
                {
                    alert(status);
                }
                else{
                    this.setState({
                        startdate: startdate,
                        endDate: endDate,
                        current: currentCycle,
                        year: contractyear,
                    });
                }
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.plant !== this.state.plant) {

            fetch('http://localhost:3000/get-cycle-data', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plant: this.state.plant,
                })
            })
                .then(res => res.json())
                .then(data => {
                    let {startdate, endDate, currentCycle, contractyear} = data;
                    this.setState({
                        startdate: startdate,
                        endDate: endDate,
                        current: currentCycle,
                        year: contractyear,
                    });
                });
        }
    }

    render() {
        let plant_array = this.props.plants.split('&');
        let items5 = [];
        for (let i = 0; i < plant_array.length - 1; i++) {
            (plant_array[i] !== sessionStorage.getItem('plant')) ? items5.push(<option key={plant_array[i]}
                                                                                          value={plant_array[i]}>{plant_array[i]}</option>) :
            items5.push(<option key={plant_array[i]} selected value={plant_array[i]}>{plant_array[i]}</option>);
        }
        return (
            <div className="wrapper">
                <nav id="sidebar">
                    <ul className="list-unstyled components">
                        <li className="nav-item active">
                            <strong className="nav-link">Current Plant:<span
                                className="sr-only">(current)</span></strong>
                        </li>
                        <li id="bellow" className="nav-item active">
                            <strong className="nav-link">{this.state.plant.toUpperCase()}<span
                                className="sr-only">(current)</span></strong>
                        </li>
                        <li className="active">
                            <label id="bello" htmlFor="sel1">Select Plant:</label>
                            <select onChange={this.OnPlantChange} className="form-control" id="sel1">
                                {items5}
                            </select>
                        </li>
                        <li>
                            <Link to='/plantstats'>Plant Stats</Link>
                        </li>
                        <li>
                            <Link to='/rowstats'>Row Stats</Link>
                        </li>
                        <li>
                            <Link to='/zonestats'>Zone Stats</Link>
                        </li>
                        {
                            this.props.role === 'admin' ? <li><Link to='/plant'>Create a Plant</Link></li> : ''
                        }
                        <li>
                            <Link to='/qrcode'>Generate QR for Single Row</Link>
                        </li>
                        <li>
                            <Link to='/qrcode_block'>Generate QR By Block</Link>
                        </li>
                    </ul>
                    <ul className="list-unstyled LTS" id='kelo'>
                        <li>
                            <i id='profile' className="fa fa-user fa-2x"></i>
                        </li>
                        <li>
                            <h5>{this.props.fname}</h5>
                        </li>
                        <li>
                            <h5>{this.props.role}</h5>
                        </li>
                        <li>
                            <h5 id='compa'>SSAEL</h5>
                        </li>
                    </ul>
                </nav>
                <nav id="hell" className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div>
                        <button className="btn btn-light"
                                type="button"
                                id="sidebarCollapse"
                                onClick={this.Hello}>
                            <i className="fa fa-align-justify"/>
                        </button>
                        <strong className='navbar-brand'>QR App</strong>
                    </div>
                    <button className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse"
                         id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <strong className="nav-link"
                                        dangerouslySetInnerHTML={{__html: this.state.html1}}>
                                </strong>
                            </li>
                            <li className="nav-item active">
                                <strong className="nav-link"
                                        dangerouslySetInnerHTML={{__html: this.state.html2}}>
                                </strong>
                            </li>
                            <li className="nav-item active">
                                <strong className="nav-link"
                                        dangerouslySetInnerHTML={{__html: this.state.html3}}>
                                </strong>
                            </li>
                            <li>
                                <Button href='/signin' size='small' color='secondary' variant='contained'
                                        onClick={FinalNav.onLogoutClicked} id='button'>Logout</Button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }

    OnPlantChange(event) {
        this.setStateSynchronous({
            plant: event.target.value.toLowerCase(),
        })
            .then(letto => {
                this.props.setplant(this.state.plant);
            });

    }

    static onLogoutClicked() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('fname');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('plants');
        sessionStorage.removeItem('plant');
    }
}

export default FinalNav;
