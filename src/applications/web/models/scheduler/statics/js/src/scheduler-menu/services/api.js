import requestAgent from 'superagent';

export const launchScheduler = (payload) => {
    const { team, month, year } = payload;
    return requestAgent
		.post('/api/launch-scheduler')
		.send({'teamId': team.id})
		.send({'month': month})
		.send({'year': this.state.year})
		.set('X-CSRFToken', csrfToken)
		.then(() => {
			showSnackbar('Finish to make schedule.');
		})
		.catch((err) => {
			showSnackbar('Sorry... we have some trouble with launching scheduler.');
		});
};