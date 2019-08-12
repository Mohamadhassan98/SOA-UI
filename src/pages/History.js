import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../components/Title';
import {CssBaseline} from "@material-ui/core";
import Profile from "../components/ProfileNavBar";
import Container from "@material-ui/core/Container";
import axios from "axios";

class History extends Component {

    icons = {
        //TODO("Add corresponding icons from material icons")
        '+': '',
        '-': '',
        '*': ''
    };

    constructor(props) {
        super(props);
        this.state = {
            histories: []
        };
    }

    componentDidMount() {
        const url = '';
        axios.get('')
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Profile/>
                <Container component='main' maxWidth='md'>
                    <Title>History</Title>
                    <Table size="small">
                        <CssBaseline/>
                        <TableHead>
                            <TableRow className="tablehead">
                                <TableCell className="tablecell">Date</TableCell>
                                <TableCell className="tablecell">Operation</TableCell>
                                <TableCell className="tablecell">Operand</TableCell>
                                <TableCell className="tablecell">Details</TableCell>
                                <TableCell className="tablecell" align="right">Object</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.histories.map(log =>
                                <TableRow className="tablehead">
                                    <TableCell className="tablecell">{log.date}</TableCell>
                                    <TableCell className="tablecell">{this.icons[log.operation]}</TableCell>
                                    <TableCell className="tablecell">{log.operand}</TableCell>
                                    <TableCell className="tablecell">{log.details}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Container>
            </React.Fragment>

        );
    }
}

export default History;
