import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './plantstats.css'
import FinalNav from "../../Navigation/FinalNav";
import {Redirect, withRouter} from "react-router";
import {LineChart, Line, Label , Brush, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {Typography} from "@material-ui/core";
import LinearStatic from '../../Card/Progress/progress';

import SimpleCard from '../../Card/card.component';


class PlantStats extends Component{

    constructor(props) {
        super(props);
        this.state = {
            number : 14,
            current: 0,
            startdate: '16/10/2019',
            endDate: '1/11/2019',
            year : 0,
            redirect : false,
            ended : false,
            plant : sessionStorage.getItem('plant') !== null ? sessionStorage.getItem('plant') : sessionStorage.getItem('plants').split('&')[0].toLowerCase(),
            totalmodules : 0,
            data : [
                {
                    "name": "Page A",
                    "uv": 4000,
                    "pv": 2400,
                    "amt": 2400
                },
                {
                    "name": "Page B",
                    "uv": 3000,
                    "pv": 1398,
                    "amt": 2210
                },
                {
                    "name": "Page C",
                    "uv": 2000,
                    "pv": 9800,
                    "amt": 2290
                },
                {
                    "name": "Page D",
                    "uv": 2780,
                    "pv": 3908,
                    "amt": 2000
                },
                {
                    "name": "Page E",
                    "uv": 1890,
                    "pv": 4800,
                    "amt": 2181
                },
                {
                    "name": "Page F",
                    "uv": 2390,
                    "pv": 3800,
                    "amt": 2500
                },
                {
                    "name": "Page G",
                    "uv": 3490,
                    "pv": 4300,
                    "amt": 2100
                }
            ],
            data1 : [],
            totalcleaned : 0,
            duration : 15,
        };
        this.onCycleFixed = this.onCycleFixed.bind(this);
        this.setStateSynchronous = this.setStateSynchronous.bind(this);
        this.handler3 = this.handler3.bind(this);
        this.setPlant = this.setPlant.bind(this);
        this.setEnded = this.setEnded.bind(this);
    }

    setStateSynchronous(stateUpdate) {
        return new Promise(resolve => {
            this.setState(stateUpdate, () => resolve());
        });
    }

    pr = {
        cycle : `<div><span>Current Cycle - </span><strong>${this.props.number}</strong></div>`,
        select : ``,
        startdate : "<div><span>startdate - </span><strong>"+this.props.startdate+"</strong></div>",
        endDate : "<div><span>ExpectedEndDate - </span><strong>"+this.props.endDate+"</strong></div>",
    };

    componentDidMount() {
        if (!sessionStorage.getItem('token')) {
            this.setState({
                redirect: true,
            });
        }

        fetch("http://localhost:3000/check-cycle",{
            method : 'post',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                plant : this.state.plant,
            })
        })
            .then(resp=> resp.json())
            .then( hell =>
            {
                let year = hell.contractyear;
                console.log(year);
                this.setStateSynchronous({
                    year : year,
                });
            });
        if(this.props.role === 'admin')
        {
            fetch("http://localhost:3000/check-cycle",{
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    plant : this.state.plant,
                })
            })
                .then(resp=> resp.json())
                .then( hell =>
                {
                    let year = hell.contractyear;
                    this.setStateSynchronous({
                        year : year,
                    });
                    let endDate = new Date(hell.endDate);
                    let today = new Date();
                    if(hell['body'] === 1 || endDate <= today ){
                        this.setStateSynchronous({
                            ended : true,
                        });
                    }
                });
        }
        fetch('http://localhost:3000/get-cycle-data',{
            method : 'post',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                plant : this.state.plant,
            })
        })
            .then(res=>res.json())
            .then(data=>{
                let { startdate,endDate,currentCycle,duration } = data;
                this.setStateSynchronous({
                    startdate: startdate,
                    endDate: endDate,
                    number: currentCycle,
                    current : currentCycle,
                    duration : duration,
                }).then(bek =>{
                    const date = new Date();
                    let date12;
                    let today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                    date12 = this.state.endDate > today ? today : this.state.endDate;
                    fetch('http://localhost:3000/getplant',{
                        method : 'post',
                        headers : {
                            'Content-Type' : 'application/json',
                        },
                        body : JSON.stringify({
                            plant : this.state.plant,
                            startdate : this.state.startdate,
                            presentDate : date12,
                            cycle : this.state.number,
                            year : this.state.year,
                        })
                    })
                        .then(hel => hel.json())
                        .then(lol=>{
                            function compare(a, b){
                                if (a.date > b.date) return 1;
                                if (b.date > a.date) return -1;
                                return 0;
                            }
                            lol['data'].sort(compare);
                            this.setStateSynchronous({
                                data : lol['data'],
                                totalmodules : lol['totalmodules'],
                            }).then(jelly =>{
                                let beo = [];
                                this.state.data.map((hello, i) => {
                                    return beo.push({
                                        'date' : hello['date'],
                                        'today_cleaned' : Math.floor(this.state.totalmodules/this.state.duration),
                                    });
                                });
                                function compare(a, b){
                                    if (a.date > b.date) return 1;
                                    if (b.date > a.date) return -1;
                                    return 0;
                                }
                                beo.sort(compare);
                                this.setStateSynchronous({
                                    data1 : beo,
                                });
                            });
                        }).then(help =>{
                        let cleaned_till_date = 0;
                        for(let i=0;i<this.state.data.length;i++)
                        {
                            cleaned_till_date += this.state.data[i].today_cleaned;
                        }
                        this.setStateSynchronous({
                            totalcleaned : cleaned_till_date,
                        });
                        });
                });
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.plant !== this.state.plant)
        {
            if(this.props.role === 'admin')
            {
                fetch("http://localhost:3000/check-cycle",{
                    method : 'post',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body : JSON.stringify({
                        plant : this.state.plant,
                    })
                })
                    .then(resp=> resp.json())
                    .then( hell =>
                    {
                        let year = hell.contractyear;
                        let endDate = new Date(hell.endDate);
                        let today = new Date();
                        if(hell['body'] === 1 || endDate <= today){
                            this.setStateSynchronous({
                                ended : true,
                                year : year,
                            });
                        }
                    })
                    .catch(err=>console.log(err));
            }
            fetch('http://localhost:3000/get-cycle-data',{
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    plant : this.state.plant,
                })
            })
                .then(res=>res.json())
                .then(data=>{
                    let { startdate,endDate,currentCycle,duration,contractyear } = data;
                    this.setStateSynchronous({
                        startdate: startdate,
                        endDate: endDate,
                        number: currentCycle,
                        duration : duration,
                        year: contractyear,
                    })
                        .then(bek =>{
                        const date = new Date();
                        let date12;
                        let today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                        date12 = this.state.endDate > today ? today : this.state.endDate;
                        fetch('http://localhost:3000/getplant',{
                            method : 'post',
                            headers : {
                                'Content-Type' : 'application/json',
                            },
                            body : JSON.stringify({
                                plant : this.state.plant,
                                startdate : this.state.startdate,
                                presentDate : date12,
                                cycle : this.state.number,
                            })
                        })
                            .then(hel => hel.json())
                            .then(lol=>{
                                function compare(a, b){
                                    if (a.date > b.date) return 1;
                                    if (b.date > a.date) return -1;
                                    return 0;
                                }
                                lol['data'].sort(compare);
                                this.setStateSynchronous({
                                    data : lol['data'],
                                    totalmodules : lol['totalmodules'],
                                }).then(jelly =>{
                                    let beo = [];
                                    this.state.data.map((hello, i) => {
                                        return beo.push({
                                            'date' : hello['date'],
                                            'today_cleaned' : Math.floor(this.state.totalmodules/this.state.duration),
                                        });
                                    });
                                    function compare(a, b){
                                        if (a.date > b.date) return 1;
                                        if (b.date > a.date) return -1;
                                        return 0;
                                    }
                                    beo.sort(compare);
                                    this.setStateSynchronous({
                                        data1 : beo,
                                    });
                                });
                            }).then(help =>{
                            let cleaned_till_date = 0;
                            for(let i=0;i<this.state.data.length;i++)
                            {
                                cleaned_till_date += this.state.data[i].today_cleaned;
                            }
                            this.setStateSynchronous({
                                totalcleaned : cleaned_till_date,
                            }).then(lollo => console.log(this.state));
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                    alert(`Can't find the data for the plant ${this.state.plant}`);
                });
        }

    }

    handler3(){
        let body = document.getElementById('hello1');
        body.classList.toggle('fill');
    }

    setPlant(plant){
        this.setStateSynchronous({
            plant : plant,
        })
            .then(res => {
                sessionStorage.setItem('plant',this.state.plant);
            });
    }

    setEnded(){
        this.setStateSynchronous({
            ended : false,
        }).then(gel => {
            this.setState();
        })
    }

    render() {
        let items = [];
        for (let i = 1; i < this.state.number; i++) {
            items.push(<option key={i} value={i}>{i}</option>);
        }
        items.push(<option key={this.state.number} selected={true} value={this.state.number}>{this.state.number}</option>);
        if (this.state.redirect) {
            alert("SignIn to Access the Info");
            return <Redirect to='/signin'/>;
        }

        return (
            <div>
                <FinalNav fname={sessionStorage.getItem('fname')}
                          role={sessionStorage.getItem('role')}
                          plants={sessionStorage.getItem('plants')}
                          pr={this.pr}
                          handler={this.props.handler}
                          number={this.state.number}
                          startdate={this.state.startdate}
                          endDate={this.state.endDate}
                          plantstats={true}
                          handle={this.handler3}
                          setplant={this.setPlant}
                />
                <div id="hello1" className='fill'>
                    <div id='cycleCard'>
                    {
                        this.state.ended ? <SimpleCard cycle1={this.state.current} plant={this.state.plant} set={this.setEnded}/> : ''
                    }
                    </div>
                    <div><span><strong>Select cycle</strong></span><select className="form-control" name='cycleNumber'
                                                                           onChange={this.onCycleFixed}> {items}</select>
                    </div>
                    <br/>
                    <h5>Actual Cleaned vs Date</h5> <br/>
                    <LineChart width={730} height={250} data={this.state.data}
                               margin={{top: 5, right: 30, left: 20, bottom: 30}} syncId='hell'>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date">
                            <Label value="Date" offset={-10} position="insideBottom"/>
                        </XAxis>
                        <YAxis label={{
                            value: 'Total Modules Cleaned',
                            offset: 0,
                            angle: -90,
                            position: 'insideBottomLeft'
                        }}/>
                        <Tooltip/>
                        <Line type="linear" dataKey="today_cleaned" stroke="#003157"/>
                    </LineChart>
                    <br/>
                    <h5>Expected Cleaned vs Date</h5> <br/>
                    <LineChart width={730} height={250} data={this.state.data1}
                               margin={{top: 5, right: 30, left: 20, bottom: 5}} syncId='hell'>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip/>
                        <Line type="linear" dataKey="today_cleaned" stroke="#000000"/>
                        <Brush height={20}/>
                    </LineChart>
                    <br/>
                    <Typography variant='body2'>Total Modules Cleaned Till Date : {this.state.totalcleaned} Out
                        of {this.state.totalmodules}</Typography>
                    <LinearStatic
                        progress={Math.floor((this.state.totalcleaned / this.state.totalmodules) * 100)}
                    />
                </div>
            </div>
        );
    }

    onCycleFixed(e) {
        e.preventDefault();
        this.setStateSynchronous(({current: Number(e.target.value)})).then( bro => {
            let date = new Date();
            let today = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
                    let start, end;
                    fetch('http://localhost:3000/getdataofparticularcycle',{
                        method : 'post',
                        headers : {
                            'Content-Type' : 'application/json',
                        },
                        body : JSON.stringify({
                            plant : sessionStorage.getItem('plant'),
                            cycle : this.state.current,
                        })
                    }).then(res=> res.json())
                        .then(data => {
                            let date12;
                            start = data.startdate;
                            end = data.endDate;
                            date12 = end > today ? today : end;
                            fetch('http://localhost:3000/getplant',{
                                method : 'post',
                                headers : {
                                    'Content-Type' : 'application/json',
                                },
                                body : JSON.stringify({
                                    plant : this.state.plant,
                                    startdate : start,
                                    presentDate : date12,
                                    cycle : this.state.current,
                                    year : this.state.year,
                                })
                            })
                                .then(hel => hel.json())
                                .then(lol=>{
                                    console.log(lol);
                                    function compare(a, b){
                                        if (a.date > b.date) return 1;
                                        if (b.date > a.date) return -1;
                                        return 0;
                                    }
                                    if(lol['status'] !== 'Success')
                                    {
                                        alert(lol['status']);
                                    }
                                    else
                                    {
                                        lol['data'].sort(compare);
                                        this.setStateSynchronous({
                                            data : lol['data'],
                                            totalmodules : lol['totalmodules'],
                                        }).then(jelly =>{
                                            let beo = [];
                                            this.state.data.map((hello, i) => {
                                                return beo.push({
                                                    'date' : hello['date'],
                                                    'today_cleaned' : Math.floor(this.state.totalmodules/this.state.duration),
                                                });
                                            });
                                            function compare(a, b){
                                                if (a.date > b.date) return 1;
                                                if (b.date > a.date) return -1;
                                                return 0;
                                            }
                                            beo.sort(compare);
                                            this.setStateSynchronous({
                                                data1 : beo,
                                            });
                                        });
                                    }
                                });
                        });
                });
        }
}

export default withRouter(PlantStats);


