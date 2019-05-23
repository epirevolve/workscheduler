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
import DayHeaderRow from '../../schedule/components/DayHeaderRow';
import Rows from '../../schedule/components/Rows';
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
        const { daySettings, schedules, totals, onCategoryChange } = this.props;

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
            .concat(daySettings.map(x => ({name: x.dayName, ...x})).map(x => <DayHeaderCell key={x.day} {...x} />))

        const onCategoryChange_ = onCategoryChange(this.state.workCategories)
        const operatorRows = schedules.map(x => {
            const totals = x.totals.map(z => ({key: z.workCategory.id, val: z.total}))
                .map((z, i) => <Cell key={i} {...z} css_={_cssByIndex(i)} />)
            const schedules = x.schedule.map(z => ({key: z.day, val: z.name}))
            const onCategoryChange__ = onCategoryChange_(x.operator)
            const cells = zip(schedules, categories, daySettings).map(([a, b, c]) => <SelectableCell key={a.key} {...a}
                categories={b} onCategoryChange={onCategoryChange__(a.key, c)} />)
            return {
                key: x.operator.id,
                header: x.operator.user.name,
                cells: totals.concat(cells)
            }})
        const totalRows = totals.map((x, i) => {
            const cells = this.state.workCategories.map(y => ({key: y.id, val: ''})).concat([{key: '-'}, {key: ''}])
                .map((y, i) => <Cell key={y.key} {...y} css_={_cssByIndex(i)} />)
                .concat(zip(x.totals, daySettings).map(([y, l]) => ({key: l.day, category: x.workCategory, daySetting: l, ...y}))
                .map(y => <TotalCell key={y.key} {...y} />))
            return {
                key: i,
                header: x.workCategory.title,
                cells: cells
            }})
        return (
            <>
                <Table css={css`
                        overflow: auto;
                        height: 64vh;
                        width: 95vw;
                        display: block;
                        border-collapse: initial;
                    `}>
                    <DayHeaderRow headers={headers} />
                    <TableBody>
                        <Rows rows={operatorRows} />
                    </TableBody>
                    <TotalRows rows={totalRows} />
                </Table>
            </>
        )
    }
}

export default schedules;