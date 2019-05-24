import React from 'react';

import requestAgent from 'superagent';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import LinearProgress from '@material-ui/core/LinearProgress';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import DayHeaderCell from '../../schedule/components/DayHeaderCell';
import DayHeaderRow from '../../schedule/components/DayHeaderRow';
import SelectableRow from './SelectableRow';
import TotalRows from '../../schedule/components/TotalRows';

import { zip } from 'array-util'

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
        const { daySettings, schedules, totals, isLoading, onCategoryChange } = this.props;
        if (isLoading) {
            return (
                <LinearProgress variant="query" css={css`margin: 10rem`} />
            )
        }

        if (schedules.length == 0) {
            return (
                <div>Sorry this month is not create yet</div>
            )
        }

        const css_ = {
            position: 'sticky',
            background: 'white',
            zIndex: 99,
        }
        const _cssByIndex = i => ({...css_, left: 7+(5*i)+'rem'})

        const categories = daySettings.map(x => [""].concat(x.details.map(y => y.workCategory.title)).concat(["-"])
            .concat(x.fixedSchedules.map(y => y.title)));
        const headers = this.state.workCategories.map(x => ({key: x.id, day: x.title}))
            .concat([{key: '-', day: '-'}, {key: '', day: ''}])
            .map((x, i) => <DayHeaderCell key={x.key} {...x} css_={_cssByIndex(i)} />)
            .concat(daySettings.map(x => ({name: x.dayName, ...x})).map(x => <DayHeaderCell key={x.day} {...x} />));
        const operatorRows = schedules.map(x => ({
                headers: [x.operator.user.name].concat(x.totals.map(y => y.total)),
                cells: zip(x.schedule, categories, daySettings),
                onCategoryChange: onCategoryChange(this.state.workCategories, x.operator)
            }));
        const totalRows = totals.map((x, i) => {
            return {
                headers: [x.workCategory.title].concat(this.state.workCategories.map(x => '').concat(['', ''])),
                cells: zip(x.totals, daySettings).map(([a, b]) => ({category: x.workCategory, daySetting: b, ...a}))
            }});
        return (
            <Table css={css`
                    overflow: auto;
                    height: 64vh;
                    width: 95vw;
                    display: block;
                    border-collapse: initial;
                `}>
                <DayHeaderRow headers={headers} />
                <TableBody>
                    {operatorRows.map((x, i) => <SelectableRow key={i} {...x} />)}
                </TableBody>
                <TotalRows rows={totalRows} />
            </Table>
        )
    }
}

export default schedules;