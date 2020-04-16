import { PartnerQueue } from '../utils/PartnerQueue';
import request from 'superagent';

export class Xometry extends PartnerQueue {
	private form_url: string;
	private name: string;

	startWorker() {
		this.start(function(job, done) {
			request.post(this.form_url)
				.send(job.data)
				.set('accept', 'json')
				.end(done);
		});
	}

	init() {
		this.name = 'xometry_hubspot';
		this.form_url = 'https://api.hsforms.com/submissions/v3/integration/submit/portalId/c69b4a42-11f7-462d-99f3-db1a54e680c0';
	}
}