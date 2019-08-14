import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../components/Title';
import '../styles/History.css'

class History extends Component {
    constructor(props) {
        super(props);
        this.pk = props.match.params.pk;
        this.state = {
            histories: []
        };
    }


    async componentDidMount() {
        try {
            console.log("i am in history");
            // const res = await fetch('http://127.0.0.1:8000/user/'+ this.pk + '/logs/', {

            const res = await fetch('http://127.0.0.1:8000/user/1/logs/', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.csrftoken
                }
            });
            const histories = await res.json();
            console.log(histories);
            this.setState({
                histories
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Title>History</Title>
                <Table size="small">
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
                        {this.state.histories.map(history => (
                            <TableRow className="tablehead">
                                <TableCell className="tablecell">{history.date}</TableCell>
                                <TableCell className="tablecell">{history.operation}</TableCell>
                                <TableCell className="tablecell">{history.operand}</TableCell>
                                <TableCell className="tablecell">{history.fields}</TableCell>
                                <TableCell className="tablecell" align="right">{history.operand_object}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>

            </React.Fragment>
        );
    }
}

export default History;