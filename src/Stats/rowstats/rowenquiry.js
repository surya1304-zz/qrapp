import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './textfields.css';
import './plantstats.css';
import FinalNav from "../../Navigation/FinalNav";
import {Redirect, withRouter} from "react-router";
import {TextField, Button, Divider} from '@material-ui/core';
import {CloudDownload} from '@material-ui/icons';
import RowStats from './rowstats';
import ImageGrid from "../../Card/CleanImages";

class RowEnquiry extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                number: 1,
                zone: 1,
                row: 1,
                block: 'A1',
                inverter: '1.1',
                SMB: "1.1.3",
                redirect: false,
                plant: sessionStorage.getItem('plant') !== null ? sessionStorage.getItem('plant') : sessionStorage.getItem('plants').split('&')[0].toLowerCase(),
                startdate: '',
                endDate: '',
                year: 0,
                cleanedStatus: [],
                forty: [],
                updateDate: [],
                updateTime: [],
                cycls: [],
                cardData: [],
                cycle: 1,
            };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onBlockChange = this.onBlockChange.bind(this);
        this.onInverterChange = this.onInverterChange.bind(this);
        this.onSMBChange = this.onSMBChange.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.handler2 = this.handler2.bind(this);
        this.handler3 = this.handler3.bind(this);
        this.setPlant = this.setPlant.bind(this);
        this.setStateSynchronous = this.setStateSynchronous.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.onButtonClicked1 = this.onButtonClicked1.bind(this);
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
                    number: currentCycle,
                    year: contractyear,
                });
            })
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
                        number: currentCycle,
                        year: contractyear,
                    });
                })
        }
    }

    handler3() {
        if (document.getElementById('hello').style.display !== 'none') {
            let body = document.getElementById('hello');
            body.classList.toggle('fill');
        } else if (document.getElementById('jel').style.display !== 'none') {
            let body = document.getElementById('jel');
            body.classList.toggle('fill');
        }
        let body = document.getElementById('images');
        body.classList.toggle('fill');
    }

    setPlant(plant) {
        this.setStateSynchronous({
            plant: plant,
        })
            .then(res => {
                sessionStorage.setItem('plant', this.state.plant);
            });
    }

    handler2(number) {
        this.setState({
            number: number,
        });
    }

    render() {
        if (this.state.redirect) {
            alert("SignIn to Access the Info");
            return <Redirect to='/signin'/>
        }

        return (
            <div>
                <FinalNav fname={sessionStorage.getItem('fname')}
                          role={sessionStorage.getItem('role')}
                          plants={sessionStorage.getItem('plants')}
                          number={this.state.number}
                          pr={this.pr}
                          handler1={this.handler2}
                          plantstats={false}
                          handle={this.handler3}
                          setplant={this.setPlant}
                />
                <form id='hello' className='hello fill'>
                    <div className="bellll">
                        <TextField
                            required
                            id="outlined-zone"
                            label="Zone"
                            defaultValue="1"
                            margin="normal"
                            variant="outlined"
                            onChange={this.onEmailChange}
                        />
                        <TextField
                            required
                            id="outlined-row"
                            label="Row"
                            defaultValue="1"
                            margin="normal"
                            variant="outlined"
                            onChange={this.onPasswordChange}
                        />
                        <TextField
                            required
                            id="outlined-block"
                            label="Block Name"
                            defaultValue="A1"
                            margin="normal"
                            variant="outlined"
                            onChange={this.onBlockChange}
                        />
                        <TextField
                            required
                            id="outlined-inverter"
                            label="Inverter ID"
                            defaultValue="1.1"
                            margin="normal"
                            variant="outlined"
                            onChange={this.onInverterChange}
                        />
                        <TextField
                            required
                            className="outlined-smb"
                            label="SMB ID"
                            defaultValue="1.1.3"
                            margin="normal"
                            variant="outlined"
                            onChange={this.onSMBChange}
                        />
                        <Button onClick={this.onButtonClicked} variant="contained" className="outlined-button"
                                color="primary">
                            Get Data
                            <CloudDownload/>
                        </Button>
                    </div>
                </form>
                <div id='jel' className='fill'>
                    <div className='key'>
                        <div className='zone'>
                            Zone : {this.state.zone}
                        </div>
                        <div className='block'>
                            Block Name : {this.state.block}
                        </div>
                        <div className='inverter'>
                            Inverter : {this.state.inverter}
                        </div>
                        <div className='smb'>
                            SMB : {this.state.SMB}
                        </div>
                        <div className='rowtype'>
                            {
                                // eslint-disable-next-line eqeqeq
                                (this.state.forty == 1) ? <h6>Row Type : 40 Module Row</h6> :
                                    <h6>Row Type : 20 Module Row</h6>
                            }
                        </div>
                    </div>
                    <Divider/>
                    <div className='grid11'>
                        {this.state.cards}

                    </div>
                    <Button onClick={this.CSV.bind(this)} variant='outlined' className='outlined-button'
                            color='secondary'>Download Data as CSV</Button><br/>
                    <Button onClick={RowEnquiry.onButtonClicked2} variant="contained" className="outlined-button"
                            color="primary">
                        Get Data For another Row
                    </Button>
                </div>
                <div id='images' className='fill'>
                    <ImageGrid
                        tileData={this.state.cardData}
                        cyc={this.state.cycle}
                        oncl={this.onButtonClicked1}
                    />
                </div>
            </div>
        );
    }

    onEmailChange(event) {
        this.setState(
            {zone: Number(event.target.value)},
        );
    }

    onPasswordChange(event) {
        this.setState(
            {row: Number(event.target.value)},
        );
    }

    onBlockChange(event) {
        this.setState(
            {block: event.target.value.toString()},
        );
    }

    onInverterChange(event) {
        this.setState(
            {inverter: event.target.value.toString()},
        );
    }

    onSMBChange(event) {
        this.setState(
            {SMB: event.target.value.toString()},
        );
    }

    CSV() {
        fetch('http://localhost:3000/rowstatsdetailed', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plant: this.state.plant,
                year: this.state.year,
                zone: this.state.zone,
                row: this.state.row,
                block: this.state.block,
                inverter: this.state.inverter,
                SMB: this.state.SMB,
                cycle: this.state.number
            })
        }).then(res => res.json())
            .then(hello => {
                if (hello.Status === 'Success')
                    RowEnquiry.JSONToCSVConvertor(hello['body'], `cycleDataforRow${this.state.row.toString()}`, true);
                else
                    alert(hello['Status']);
            })
    }

    static JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var CSV = '';
        CSV += ReportTitle + '\r\n\n';
        if (ShowLabel) {
            let row = "";
            for (let index in arrData[0]) {
                row += index + ',';
            }
            row = row.slice(0, -1);
            CSV += row + '\r\n';
        }
        for (var i = 0; i < arrData.length; i++) {
            // eslint-disable-next-line no-redeclare
            var row = "";
            // eslint-disable-next-line no-redeclare
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }
            row.slice(0, row.length - 1);
            CSV += row + '\r\n';
        }
        // eslint-disable-next-line eqeqeq
        if (CSV == '') {
            alert("Invalid data");
            return;
        }
        var fileName = "MyReport_";
        fileName += ReportTitle.replace(/ /g, "_");
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        var link = document.createElement("a");
        link.href = uri;
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    onButtonClicked(e) {
        e.preventDefault();
        fetch('http://localhost:3000/rowstats', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plant: this.state.plant,
                year: this.state.year,
                zone: this.state.zone,
                row: this.state.row,
                block: this.state.block,
                inverter: this.state.inverter,
                SMB: this.state.SMB,
                cycle: this.state.number
            })
        }).then(res => res.json())
            .then(kill => {
                if (kill.status === 'Error')
                    alert(kill.body);
                else {
                    let q = [];
                    let w = [];
                    let e = [];
                    let r = [];
                    let cycs = [];
                    // eslint-disable-next-line array-callback-return
                    kill.body.map((killa, i) => {
                        cycs.push(killa['cycle'])
                        q.push(killa['_cleanstatus']);
                        w.push(killa['_40mod']);
                        e.push(killa['updateDate']);
                        r.push(killa['updateTime']);
                    });
                    this.setStateSynchronous({
                        cycls: cycs,
                        cleanedStatus: q,
                        forty: w[0],
                        updateDate: e,
                        updateTime: r,
                    }).then(letr => {
                        let dark = [];
                        for (let i = 0; i < this.state.cleanedStatus.length; i++) {
                            dark.push(<RowStats
                                cycle={this.state.cycls[i]}
                                plant={this.state.plant}
                                date={this.state.startdate}
                                zone={this.state.zone}
                                row={this.state.row}
                                block={this.state.block}
                                inverter={this.state.inverter}
                                smb={this.state.SMB}
                                cleanStatus={this.state.cleanedStatus[i]}
                                updateDate={this.state.updateDate[i]}
                                updateTime={this.state.updateTime[i]}
                                getinfo={this.getInfo}
                            />);
                        }
                        this.setStateSynchronous({
                            cards: dark,
                        });
                    })
                        .then(happy => {
                            document.getElementById('hello').style.display = 'none';
                            document.getElementById('jel').style.display = 'grid';
                            document.getElementById('images').style.display = 'none';
                        });
                }
            });
    }

    onButtonClicked1() {
        this.setStateSynchronous({
            cardData: [],
        });
        document.getElementById('hello').style.display = 'none';
        document.getElementById('jel').style.display = 'grid';
        document.getElementById('images').style.display = 'none';
    }

    static onButtonClicked2() {
        document.getElementById('hello').style.display = 'flex';
        document.getElementById('jel').style.display = 'none';
        document.getElementById('images').style.display = 'none';
    }

    getInfo(cyc) {
        let dat = [];
        fetch('http://localhost:3000/getimages', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plant: this.state.plant,
                cycle: cyc,
                zone: this.state.zone,
                row: this.state.row,
                block: this.state.block,
                inverter: this.state.inverter,
                smb: this.state.SMB,
                year: this.state.year,
            })
        })
            .then(res => res.json())
            .then(hello => {
                dat.push({
                    img: hello.precleaned,
                    title: 'Pre Cleaned Image',
                });
                dat.push({
                    img: hello.postcleaned,
                    title: 'Post Cleaned Image',
                });
                this.setStateSynchronous({
                    cardData: dat,
                    cycle: cyc
                })
                    .then(naan => {
                        document.getElementById('hello').style.display = 'none';
                        document.getElementById('jel').style.display = 'none';
                        document.getElementById('images').style.display = 'flex';
                    });
            });
    }

}

export default withRouter(RowEnquiry);