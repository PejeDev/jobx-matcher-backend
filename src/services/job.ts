import { TorreService as api, TorreService } from './index';

class JobService {
	// TODO: Migrate logic from Controller to service
	private apiClient: typeof TorreService;

	constructor() {
		this.apiClient = api;
	}
}

export default new JobService();
