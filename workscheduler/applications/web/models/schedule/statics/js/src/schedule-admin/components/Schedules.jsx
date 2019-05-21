import React from 'react';

import requestAgent from 'superagent';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import DayHeaderCell from '../../schedule/components/DayHeaderCell';
import Cell from '../../schedule/components/Cell';
import SelectableCell from './SelectableCell';
import TotalCell from '../../schedule/components/TotalCell';
import DayHeaderColumns from '../../schedule/components/DayHeaderColumns';
import Rows from '../../schedule/components/Rows';

class schedules extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            workCategories: []
        }
        requestAgent
            .get(`/api/scheduler?affiliation-id=${props.affiliation.id}`)
            .set('X-CSRFToken', csrfToken)
            .then(res => {
                const scheduler = JSON.parse(res.text)
                this.setState({workCategories: scheduler.workCategories})
            })
    }

    componentDidMount() {
        const { affiliation, scheduleOf } = this.props;
        this.props.onLoad(affiliation, scheduleOf);
    }

    render () {
        const { daySettings, schedules, totals } = this.props;

        if (schedules.length == 0) {
            return (
                <div>Sorry this month is not create yet</div>
            )
        }

        let css_ = {
            position: 'sticky',
            background: 'white',
            zIndex: 99,
        }
        const _cssByIndex = i => ({...css_, left: 7+(5*i)+'rem'})
        const headers = [{day: ''}, {day: ' '}].map((x, i) => <DayHeaderCell key={x.day} {...x} css_={_cssByIndex(i)} />)
            .concat(daySettings.map(x => ({name: x.dayName, ...x})).map(x => <DayHeaderCell key={x.day} {...x} />))
        const zip = (array1, array2) => array1.map((_, i) => [array1[i], array2[i]]);
        const categories = daySettings.map(x => [""].concat(x.details.map(y => y.workCategory.title)).concat(["-"])
            .concat(x.fixedSchedules.map(y => y.title)));
        const operatorRows = zip(schedules, daySettings).map(([x, y]) => {
            const totals = x.totals.map(z => ({key: z.workCategory.id, val: z.total}))
            const schedules = x.schedule.map(z => ({key: z.day, val: z.name}))
            const cells = totals.map((z, i) => <Cell key={z.key} {...z} css_={_cssByIndex(i)} />)
                .concat(zip(schedules, categories).map(([y, z]) => <SelectableCell key={y.key} {...y} categories={z} />))
            return {
                key: x.operator.user.id,
                header: x.operator.user.name,
                cells: cells
            }})
        const totalRows = totals.map((x, i) => {
            const cells = [{val: '', key: ''}, {val: ' ', key: ' '}].concat(x.totals.map((y, l) => ({key: l, val: y.count, ...y})))
            return {
                key: i,
                header: x.workCategory.title,
                cells: cells.map(y => <TotalCell key={y.key} {...y} />)
            }})
        return (
            <React.Fragment>
                <Table css={css`
                        overflow: auto;
                        height: 64vh;
                        width: 95vw;
                        display: block;
                        border-collapse: initial;
                    `}>
                    <DayHeaderColumns headers={headers} />
                    <TableBody>
                        <Rows rows={operatorRows} />
                        <Rows rows={totalRows} />
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }
}

export default schedules;