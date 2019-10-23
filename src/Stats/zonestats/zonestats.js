import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'tachyons';
import FinalNav from "../../Navigation/FinalNav";
import {Redirect, withRouter} from "react-router";
import MaterialCard from '../../Card/Material_Card';
import './plantstats.css';
import ZoneDetails from '../../Card/ZoneDetailCard';
import {Button} from "@material-ui/core";
import BlockStats from "../../Card/Row_details";

class ZoneStats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zone: [],
            zoneIndividual : 0,
            cycle: 0,
            current: 1,
            row: 0,
            year : 0,
            inverter : '',
            totalrows: [],
            redirect: false,
            plant : sessionStorage.getItem('plant') !== null ? sessionStorage.getItem('plant') : sessionStorage.getItem('plants').split('&')[0].toLowerCase(),
            accap: [],
            dccap: [],
            totalzones: 0,
            startdate: '',
            details: [],
            data : [],
            progress : [],
        };

        this.onNumberFixed = this.onNumberFixed.bind(this);
        this.onCycleFixed = this.onCycleFixed.bind(this);
        this.onRowFixed = this.onRowFixed.bind(this);
        this.handler2 = this.handler2.bind(this);
        this.setPlant = this.setPlant.bind(this);
        this.onCardClicked = this.onCardClicked.bind(this);
        this.setStateSynchronous = this.setStateSynchronous.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    setStateSynchronous(stateUpdate) {
        return new Promise(resolve => {
            this.setState(stateUpdate, () => resolve());
        });
    }

    pr = {
        cycle: "",
        select: "",
        startdate: "",
    };

    componentDidMount() {
        if (!sessionStorage.getItem('token')) {
            this.setState({
                redirect: true,
            });
        }

        fetch("http://localhost:3000/get-cycle-data", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plant: this.state.plant,
            }),
        })
            .then(res => res.json())
            .then(result => {
                this.setStateSynchronous({
                    startdate: result.startdate,
                    cycle: result.currentCycle,
                    year : result.contractyear,
                });
            });
        fetch('http://localhost:3000/zonedata', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plant: this.state.plant,
            })
        }).then(resp => resp.json())
            .then(hello => {
                if(hello['status'] !== 'Success')
                {
                    alert(hello['status']);
                }
                else {
                    const p = hello['body'];
                    let zones = [];
                    let dccaps = [];
                    let acacps = [];
                    let tots = [];
                    // eslint-disable-next-line array-callback-return
                    p.map((zo, i) => {
                        zones.push(zo['zone']);
                        acacps.push(zo['accapacity']);
                        dccaps.push(zo['dccapacity']);
                        tots.push(zo['totalrows'])
                    });
                    this.setStateSynchronous({
                        zone: zones,
                        accap: acacps,
                        dccap: dccaps,
                        totalrows: tots,
                        totalzones: p.length,
                    }).then(hela => fetch('http://localhost:3000/zoneprogress',{
                        method : 'post',
                        headers : {
                            'Content-Type' : 'application/json',
                        },
                        body : JSON.stringify({
                            plant : this.state.plant,
                            year : this.state.year,
                            cycle : this.state.cycle,
                            zonenum : zones.length
                        })
                    }).then(res => res.json())
                        .then(thor => {

                            let g = [];
                            // eslint-disable-next-line array-callback-return
                            thor.map((loki, i) => {
                                g.push(loki.progress);
                            });
                            this.setStateSynchronous({
                                progress : g,
                            });
                        }))
                }
                });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.plant !== this.state.plant)
        {
            fetch("http://localhost:3000/get-cycle-data", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plant: this.state.plant,
                }),
            })
                .then(res => res.json())
                .then(result => {
                    this.setStateSynchronous({
                        startdate: result.startdate,
                        cycle: result.currentCycle,
                        year : result.contractyear
                    });
                });
            fetch('http://localhost:3000/zonedata', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plant: this.state.plant,
                })
            }).then(resp => resp.json())
                .then(hello => {
                    if(hello['status'] !== 'Success')
                    {
                        alert(hello['status']);
                    }
                    else {
                        const p = hello['body'];
                        let zones = [];
                        let dccaps = [];
                        let acacps = [];
                        let tots = [];
                        // eslint-disable-next-line array-callback-return
                        p.map((zo, i) => {
                            zones.push(zo['zone']);
                            acacps.push(zo['accapacity']);
                            dccaps.push(zo['dccapacity']);
                            tots.push(zo['totalrows'])
                        });
                        this.setStateSynchronous({
                            zone: zones,
                            accap: acacps,
                            dccap: dccaps,
                            totalrows: tots,
                            totalzones: p.length,
                        }).then(hela => fetch('http://localhost:3000/zoneprogress',{
                            method : 'post',
                            headers : {
                                'Content-Type' : 'application/json',
                            },
                            body : JSON.stringify({
                                plant : this.state.plant,
                                year : this.state.year,
                                cycle : this.state.cycle,
                                zonenum : zones.length
                            })
                        }).then(res => res.json())
                            .then(thor => {

                                let g = [];
                                // eslint-disable-next-line array-callback-return
                                thor.map((loki, i) => {
                                    g.push(loki.progress);
                                });
                                this.setStateSynchronous({
                                    progress : g,
                                });
                            }))
                    }
                });
        }
    }

    handler2(number) {
        this.setState({
            number: number,
        });
    }

    setPlant(plant){
        this.setStateSynchronous({
            plant : plant,
        })
            .then(res => {
                sessionStorage.setItem('plant',this.state.plant);
            });
    }

    handler3() {
        let body = document.getElementById('least');
        body.classList.toggle('fill');
        let body1 = document.getElementById('keast');
        body1.classList.toggle('fill');
        let body2 = document.getElementById('beast');
        body2.classList.toggle('fill');
    }

    render() {
        if (this.state.redirect) {
            alert("SignIn to Access the Info");
            return <Redirect to='/signin'/>
        }

        let today = new Date();
        let date = ('0' + today.getDate()).slice(-2) + '/' + ('0' + (today.getMonth() + 1)).slice(-2) + '/' + today.getFullYear();
        let cards = [];
        for (let i = 0; i < this.state.totalzones; i++) {
            cards.push(<MaterialCard key={i}
                                     zone={this.state.zone[i]}
                                      rows={this.state.totalrows[i]}
                                      today={date}
                                      accap={this.state.accap[i]}
                                      dccap={this.state.dccap[i]}
                                      progress={this.state.progress[i]}
                                      onCardClicked={this.onCardClicked}
            />);
        }

        return (
            <div>
                <FinalNav fname={sessionStorage.getItem('fname')}
                          role={sessionStorage.getItem('role')}
                          plants={sessionStorage.getItem('plants')}
                          pr={this.pr}
                          handler1={this.handler2}
                          number={this.state.zone}
                          plantstats={false}
                          handle={this.handler3}
                          setplant={this.setPlant}
                />
                <div id='least' className='fill least'>
                    {cards}
                </div>
                <div id='keast' className='fill surya least'>
                    {this.state.details}
                    <Button onClick={this.onButtonClicked1} variant="contained" className="outlined-button" color="primary">
                        Get Data For another Zone
                    </Button>
                </div>
                <div id='beast' className='fill surya least'>
                    {this.state.data}
                    <Button onClick={this.onButtonClicked2} variant="contained" className="outlined-button" color="primary">
                        Get Data For another Block
                    </Button>
                </div>
            </div>
        );
    }

    onNumberFixed(event) {
        this.setState({
            zone: Number(event.target.value),
        });
    }

    onCycleFixed(event) {
        this.setState({
            current: Number(event.target.value),
        });
    }

    onRowFixed(event) {
        this.setState({
            row: Number(event.target.value),
        });
    }

    onButtonClicked1(e){
        e.preventDefault();
        document.getElementById('least').style.display = 'grid';
        document.getElementById('keast').style.display = 'none';
        document.getElementById('beast').style.display = 'none';
    }

    onButtonClicked2(e){
        e.preventDefault();
        document.getElementById('least').style.display = 'none';
        document.getElementById('keast').style.display = 'grid';
        document.getElementById('beast').style.display = 'none';
    }

    onButtonClicked(e, block, inverter, smb){
        e.preventDefault();
        fetch("http://localhost:3000/getblockdata",{
            method : 'post',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                plant : this.state.plant,
                zone : this.state.zoneIndividual,
                block : block,
                cycle : this.state.cycle,
                year : this.state.year,
                inverter : inverter,
                smb : smb,
            })
        }).then(res=>res.json())
            .then(delta => {
                let del = [];
                // eslint-disable-next-line array-callback-return
                delta.map((delt, i) => {
                    let b = <BlockStats
                                key={i}
                                row={i+1}
                                fmod={delt["fmod"]}
                                cleanStatus={delt["cleanstatus"]}
                                updateDate={delt["updateDate"]}
                                updateTime={delt["updateTime"]}
                                comments={delt["comments"]}
                            />;
                    del.push(b);
                });
                this.setStateSynchronous({
                    data: del,
                });
            });
        document.getElementById('least').style.display = 'none';
        document.getElementById('keast').style.display = 'none';
        document.getElementById('beast').style.display = 'grid';
    }

    onCardClicked(int) {
        let blocks = [];
        let totalrows = [];
        let totalmod = [];
        let inverters = [];
        let smb = [];
        let fmod = [];
        let tmod = [];
        let wp = [];
        this.setState({
            zoneIndividual : int,
        });
        fetch('http://localhost:3000/blockdata',{
            method : 'post',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                "plant" : this.state.plant,
                "zone" : int
            })
        })
        .then(res => res.json())
            .then(hell => {
                if(hell['status']!== 'Success')
                {
                    alert(hell['status']);
                }
                else{
                    // eslint-disable-next-line array-callback-return
                    hell.body.map((hel, i) => {
                        blocks.push(hel["blockname"]);
                        totalrows.push(hel["totalrows"]);
                        totalmod.push(hel["totalmodules"]);
                        inverters.push(hel["inverter"]);
                        smb.push(hel["smb"]);
                        fmod.push(hel["_40mrows"]);
                        tmod.push(hel["_20mrows"]);
                        wp.push(hel["wp"]);
                    });
                    let deta = [];
                    for (let i = 0; i < blocks.length; i++) {
                        deta.push(<ZoneDetails
                            key={i}
                            block={blocks[i]}
                            totalrows={totalrows[i]}
                            totalmod={totalmod[i]}
                            inv={inverters[i]}
                            smb={smb[i]}
                            fmod={fmod[i]}
                            tmod={tmod[i]}
                            wp={wp[i]}
                            zone={int}
                            onButton={this.onButtonClicked}
                        />)
                    }
                    this.setStateSynchronous({
                        details: deta,
                    }).then(deter => {
                        document.getElementById('least').style.display = 'none';
                        document.getElementById('beast').style.display = 'none';
                        document.getElementById('keast').style.display = 'grid';
                    });
                }
            })

    }
}

export default withRouter(ZoneStats);