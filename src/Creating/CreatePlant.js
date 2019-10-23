import React,{Component} from 'react';
import PlantForm from './PlantForm';
import './createplant.css';
import {TextField, Typography, Button} from "@material-ui/core";
import {Redirect} from "react-router";

class CreatePlant extends Component{

    constructor(props) {
        super(props);
        this.state = {
            blockname : [],
            totalrows : [],
            zone : [],
            inverter : [],
            smb : [],
            _40mrows : [],
            _20mrows : [],
            wp : [],
            totalmodules : [],
            textfields : [],
            plant : '',
            redirect : false,
        };
        this.setStateSynchronous = this.setStateSynchronous.bind(this);
        this.addAnotherRow = this.addAnotherRow.bind(this);
        this.plantname = this.plantname.bind(this);
        this.onSubmitClicked = this.onSubmitClicked.bind(this);
        this.doneAdding = this.doneAdding.bind(this);
    }
    i=1;

    setStateSynchronous(stateUpdate) {
        return new Promise(resolve => {
            this.setState(stateUpdate, () => resolve());
        });
    }

    addAnotherRow(values){
        const { blockname,totalrows,zone,inverter,smb,_40mrows,_20mrows,wp } = values;
        const a = this.state.blockname;
        const b = this.state.totalrows;
        const c = this.state.zone;
        const d = this.state.inverter;
        const f = this.state.smb;
        const g = this.state._40mrows;
        const h = this.state._20mrows;
        const i = this.state.wp;
        const j = this.state.totalmodules;
        let totalMods = _40mrows*40 + _20mrows*20;

        a.push(blockname);
        b.push(totalrows);
        c.push(zone);
        d.push(inverter);
        f.push(smb);
        g.push(_40mrows);
        h.push(_20mrows);
        i.push(wp);
        j.push(totalMods);

        this.setStateSynchronous({
            blockname : a,
            totalrows : b,
            zone : c,
            inverter : d,
            smb : f,
            _40mrows : g,
            _20mrows : h,
            wp : i,
            totalmodules : j,
        }).then(lotte => {
            this.i += 1;
            let p = this.state.textfields;
            p.push(<PlantForm
                key={this.i}
                AddHandler={this.addAnotherRow}
                done={this.doneAdding}
            />);
            this.setStateSynchronous({
                textfields : p,
            });
        });
    }

    doneAdding(values) {
        const {blockname, totalrows, zone, inverter, smb, _40mrows, _20mrows, wp} = values;
        const a = this.state.blockname;
        const b = this.state.totalrows;
        const c = this.state.zone;
        const d = this.state.inverter;
        const f = this.state.smb;
        const g = this.state._40mrows;
        const h = this.state._20mrows;
        const i = this.state.wp;
        const j = this.state.totalmodules;
        let totalMods = _40mrows * 40 + _20mrows * 20;

        a.push(blockname);
        b.push(totalrows);
        c.push(zone);
        d.push(inverter);
        f.push(smb);
        g.push(_40mrows);
        h.push(_20mrows);
        i.push(wp);
        j.push(totalMods);

        this.setStateSynchronous({
            blockname: a,
            totalrows: b,
            zone: c,
            inverter: d,
            smb: f,
            _40mrows: g,
            _20mrows: h,
            wp: i,
            totalmodules: j,
        });
    }

    render() {
        if(this.state.redirect)
        {
            return <Redirect to='/plantstats'/>
        }
        return (
            <div id='hello123'>
                <div>
                    <Typography variant="h5">Enter the Plant Name: (Plant Name should not contain any spaces use '_' instead)</Typography>
                    <TextField
                    required
                    id="outlined-required"
                    label="Plant Name"
                    margin="normal"
                    variant="outlined"
                    onChange={this.plantname}
                    />
                <Typography id="PlantDetails" variant="h6" >Enter the Plant Details</Typography>
                <PlantForm key={1} AddHandler={this.addAnotherRow} done={this.doneAdding}/>
                </div>
                {this.state.textfields.map((hel,i)=>{
                    return hel
                })}
                <div id='submit'>
                    <Button variant='contained' color='secondary' onClick={this.onSubmitClicked}>Create Plant</Button>
                </div>
            </div>
        );
    }

    plantname(e) {
        this.setStateSynchronous({
            plant : e.target.value,
        })
    }

    onSubmitClicked(e)
    {
        e.preventDefault();
        fetch('http://localhost:3000/createplant',{
            method : 'post',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                blocks : this.state.blockname,
                totalrows : this.state.totalrows,
                zone : this.state.zone,
                inverter : this.state.inverter,
                smb : this.state.inverter,
                _40mrows : this.state._40mrows,
                _20mrows : this.state._20mrows,
                wp : this.state.wp,
                totalmodules : this.state.totalmodules,
                plant : this.state.plant,
            }),
        })
            .then(res=>res.json())
            .then(stark=> {
                alert("The Plant is created");
                this.setState({
                    redirect: true,
                });
            });

    }
}

export default CreatePlant;