import React from 'react';
import './QR.css';
import * as jsPDF from 'jspdf';
import FinalNav from "../Navigation/FinalNav";
import {Redirect} from "react-router";
const QRious = require('qrious');

const styles = {
    root: {
        fontFamily: 'sans-serif',
    },
    h1: {
        textAlign: 'center',
    },
    qrcode1: {
        textAlign: 'center',
    },
};

export default class QRCodeBlock extends React.Component {

    pdf = new jsPDF();
    constructor(props) {
        super(props);
        this.state =
            {
                zone: 0,
                block: '',
                inverter: 0.0,
                SMB: '',
                redirect :false,
                row : 10,
                plant : sessionStorage.getItem('plant') !== null ? sessionStorage.getItem('plant') : sessionStorage.getItem('plants').split('&')[0].toLowerCase(),
            };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onBlockChange = this.onBlockChange.bind(this);
        this.onInverterChange = this.onInverterChange.bind(this);
        this.onSMBChange = this.onSMBChange.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.validate = this.validate.bind(this);
        this.func = this.func.bind(this);
        this.setStateSynchronous = this.setStateSynchronous.bind(this);
        this.setPlant = this.setPlant.bind(this);
    }

    setStateSynchronous(stateUpdate) {
        return new Promise(resolve => {
            this.setState(stateUpdate, () => resolve());
        });
    }

    pr = {
        cycle : ``,
        select : ``,
        startdate : "",
        endDate : "",
    };

    componentDidMount() {
        if (!sessionStorage.getItem('token')) {
            this.setState({
                redirect: true,
            });
        }
    }

    handler3(){
        if(document.getElementById('bel').style.display !== 'none'){
            let body = document.getElementById('bel');
            body.classList.toggle('fill');
        }
        let body = document.getElementById('jel');
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

    render() {

        if(this.state.redirect){
            alert("SignIn to Access the Info");
            return <Redirect to='/signin'/>
        }

        return (
            <div>
                <FinalNav fname={sessionStorage.getItem('fname')}
                          role={sessionStorage.getItem('role')}
                          plants={sessionStorage.getItem('plants')}
                          pr={this.pr}
                          handler = {this.props.handler}
                          plantstats={false}
                          handle={this.handler3}
                          setplant={this.setPlant}
                />
                <div id='bel' className='fill'>
                    <form className='hello'>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Zone Number</label> <br/>
                            <input type="number"
                                   name="zone"
                                   className="form-control"
                                   id="exampleInputEmail1"
                                   aria-describedby="emailHelp"
                                   placeholder="Enter Zone Number"
                                   onChange={this.onEmailChange}
                            />
                            <br/>
                            <label htmlFor="exampleInputPassword1">Block Number</label><br/>
                            <input type="text"
                                   name="block"
                                   className="form-control"
                                   id="exampleInputPassword1"
                                   placeholder="Enter Block Number"
                                   onChange={this.onBlockChange}
                            />
                            <br/>
                            <label htmlFor="exampleInputPassword1">Inverter ID</label><br/>
                            <input type="number"
                                   name="inverter"
                                   className="form-control"
                                   id="exampleInputPassword1"
                                   placeholder="Enter Inverter ID"
                                   onChange={this.onInverterChange}
                            />
                            <br/>
                            <label htmlFor="exampleInputPassword1">SMB ID</label><br/>
                            <input type="text"
                                   name="SMB"
                                   className="form-control"
                                   id="exampleInputPassword1"
                                   placeholder="Enter SMB ID"
                                   onChange={this.onSMBChange}
                            />
                            <br/>
                            <button onClick={this.onButtonClicked} className="btn btn-success button" id="rowstats">
                                Get the list of QR codes
                            </button>
                        </div>
                    </form>
                </div>
                <div id='jel' className='fill' style={styles.root}>
                    <canvas id='hellll' style={styles.qrcode1}/>
                    <div id='but'>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a id='download' download='hello.png' className='btn btn-success' onClick={this.func}>Download as PDF</a>
                        <button className='btn btn-dark' onClick={this.onButtonClicked1}>Get QR for Another Block</button>
                    </div>
                </div>
            </div>
        );
    }

    onButtonClicked(e) {
        e.preventDefault();
        fetch('http://localhost:3000/getnumrows',{
            method : 'post',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                plant : this.state.plant,
                block : this.state.block,
                smb : this.state.SMB,
                zone : this.state.zone,
                inverter : this.state.inverter,
            })
        }).then(resp=>resp.json())
            .then(res => {
                this.setStateSynchronous({
                    row : res.rows,
                })
                    .then(the => {
                        for(let i=0;i<this.state.row;i++)
                        {
                            let canvas = document.querySelector('canvas');
                            // eslint-disable-next-line no-unused-vars
                            let qr = new QRious({
                                background: 'white',
                                backgroundAlpha: 0.94,
                                foreground: 'black',
                                foregroundAlpha: 1,
                                level: 'H',
                                padding: 25,
                                size: 300,
                                value: JSON.stringify({
                                    zone : this.state.zone,
                                    row_num : i+1,
                                    blockname : this.state.block,
                                    inverter : this.state.inverter,
                                    smb : this.state.SMB,
                                }),
                                element: canvas,
                            });
                            let name = `Zone: ${this.state.zone.toString()} Row:${(i+1).toString()} Blockname: ${this.state.block} Inverter: ${this.state.inverter.toString()} SMB: ${this.state.SMB}`;
                            console.log(name);
                            const canv = document.getElementById('hellll');
                            const imgData = canv.toDataURL("image/jpeg", 1.0);
                            this.pdf.addImage(imgData, 'JPEG', 65, (2*(i%2)*50+40));
                            this.pdf.text(name, 35, (2*(i%2)*50+130));
                            if(i%2===1)
                                this.pdf.addPage();
                        }
                        if (!this.validate()) {
                            document.getElementById('bel').style.display = 'none';
                            document.getElementById('jel').style.display = 'grid';
                        } else {
                            alert('All the fields are required.');
                        }
                    }).catch(err => alert("Something went wrong"));
            });

    }

    validate() {
        return this.state.zone === 0 && this.state.block === '' && this.state.inverter === 0.0 && this.state.SMB === '';
    }

    onEmailChange(event) {
        this.setState(
            {zone: Number(event.target.value)},
        );
    }

    onBlockChange(event) {
        this.setState(
            {block: event.target.value.toString()},
        );
    }

    onInverterChange(event) {
        this.setState(
            {inverter: Number(event.target.value)},
        );
    }

    onSMBChange(event) {
        this.setState(
            {SMB: event.target.value.toString()},
        );
    }

    func(){
        let name = `Zone: ${this.state.zone.toString()} Blockname: ${this.state.block} Inverter: ${this.state.inverter.toString()} SMB: ${this.state.SMB}`;
        this.pdf.save(name+".pdf");
    }

    onButtonClicked1(e)
    {
        e.preventDefault();
        document.getElementById('bel').style.display = 'grid';
        document.getElementById('jel').style.display = 'none';
    }

}